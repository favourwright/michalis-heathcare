import {
  generateRegistrationOptions,
  GenerateRegistrationOptionsOpts,
  RegistrationResponseJSON,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts,
  WebAuthnCredential,
} from '@simplewebauthn/server';
import { addNewPasskey, fetchUserPasskeyDetails } from '@/actions/firestore/passkey';
import { cookies } from 'next/headers';
import { Passkey } from '@/types/auth';

const rpID = process.env.AUTHN_RP_ID!;
const rpName = process.env.APP_NAME!;
const expectedOrigin = process.env.AUTHN_ORIGIN!;

export const handleChallengeGeneration = async (identifier: string) => {
  try {
    const cookies_ = await cookies();
    // const userPasskeys = ((await fetchUserPasskeyDetails(identifier))?.passKeys || []) as WebAuthnCredential[]
    const payload:GenerateRegistrationOptionsOpts = {
      rpID,
      rpName,
      userName: identifier,
      attestationType: "none",
      supportedAlgorithmIDs: [-7, -257],
      authenticatorSelection: {
        residentKey: "discouraged",
      },
      // temporarily commenting this out so users can re-register if they've not
      // been verified
      // excludeCredentials: userPasskeys.map(passkey => ({
      //   id: passkey.id,
      // })),
    };
    const options = await generateRegistrationOptions(payload);
    cookies_.set('options', JSON.stringify(options), {
      httpOnly: true,
    })
    return options
  } catch (error) {
    throw error
  }
}

export const handleChallengeVerification = async (
  identifier: string,
  response: RegistrationResponseJSON,
  overridePasskeys?: boolean
) => {
  
  try {
    const cookie_ = await cookies();
    const optionsCookie = cookie_.get('options')
    const parsedOptionsObj = JSON.parse(optionsCookie?.value!)
    if (!parsedOptionsObj) throw new Error('Error parsing options')
  
    const opts: VerifyRegistrationResponseOpts = {
      response,
      expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: false, // Enforce user verification by the authenticator
      expectedChallenge: parsedOptionsObj?.challenge!,
    };
    const verification = await verifyRegistrationResponse(opts);
    const { verified, registrationInfo } = verification;
    if (!verified || !registrationInfo) {
      throw new Error('Error verifying registration');
    }
  
    const {
      credential,
      credentialDeviceType,
      credentialBackedUp,
    } = registrationInfo;
  
    const newPasskey: Passkey = {
      user: identifier,
      webauthnUserID: parsedOptionsObj?.user.id!,
      id: credential.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      transports: credential.transports,
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
    };
  
    await addNewPasskey({identifier, passKey:newPasskey, override:overridePasskeys});
    // remove the options cookie
    (await cookies()).delete('options')
  } catch (error) {
    console.log({ passkeyVerificationError: error});
    throw error
  }
}