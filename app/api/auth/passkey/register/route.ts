import { NextRequest, NextResponse } from 'next/server';
import {
  generateRegistrationOptions,
  GenerateRegistrationOptionsOpts,
  VerifiedRegistrationResponse,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import { addNewPasskey, fetchUserDetails } from '@/actions/firestore/auth';
import { cookies } from 'next/headers';
import { Identifier, Passkey } from '@/types/auth';
import { RegistrationResponseJSON } from '@simplewebauthn/types';

const rpID = process.env.AUTHN_RP_ID!;
const rpName = process.env.APP_NAME!;
const expectedOrigin = process.env.AUTHN_ORIGIN!;

const handleChallengeGeneration = async (identifier: string) => {
  try {
    const cookies_ = await cookies();
    const userPasskeys = (await fetchUserDetails(identifier))?.passKeys || [];
    const payload:GenerateRegistrationOptionsOpts = {
      rpID,
      rpName,
      userName: identifier,
      attestationType: "none",
      supportedAlgorithmIDs: [-7, -257],
      authenticatorSelection: {
        residentKey: "discouraged",
      },
      excludeCredentials: userPasskeys.map(passkey => ({
        id: passkey.id,
      })),
    };
    const options:PublicKeyCredentialCreationOptionsJSON = await generateRegistrationOptions(payload);
    cookies_.set('options', JSON.stringify(options), {
      httpOnly: true,
    })
    return options
  } catch (error) {
    throw error
  }
}

const handleChallengeVerification = async (identifier: string, response: RegistrationResponseJSON) => {
  const cookie_ = await cookies();
  const optionsCookie = cookie_.get('options')

  try {
    const parsedOptionsObj = JSON.parse(optionsCookie?.value!) as PublicKeyCredentialCreationOptionsJSON
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
  
    await addNewPasskey(identifier, newPasskey);
    // remove the options cookie
    (await cookies()).delete('options')
  } catch (error) {
    console.log({ passkeyVerificationError: error});
    throw error
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json() as {identifier: Identifier, response: RegistrationResponseJSON}
  const {identifier, response} = body;

  try {
    if(response) {
      // verify challenge
      await handleChallengeVerification(identifier.value, response)
      return NextResponse.json(
        { message: 'Passkey registered' },
        { status: 200 }
      )
    }

    // generate challenge
    const options = await handleChallengeGeneration(identifier.value)
    return NextResponse.json(
      { data: {options, identifier: identifier.value}, message: 'Challenge generated' },
      { status: 200 }
    );
  } catch (error) {
    console.error({ passkeyRegistrationError: error});
    return NextResponse.json(
      { error: error, message: 'passkey registration error' },
      { status: 400 }
    );
  }
}