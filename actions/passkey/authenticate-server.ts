import { fetchUserPasskeyDetails, updatePasskeyCounter } from "@/actions/firestore/passkey";
import {
  AuthenticationResponseJSON,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  WebAuthnCredential
} from "@simplewebauthn/server";
import { cookies } from "next/headers";
const rpID = process.env.AUTHN_RP_ID!;
const expectedOrigin = process.env.AUTHN_ORIGIN!;

export const handleChallengeGeneration = async (identifier: string) => {
  try {
    const cookies_ = await cookies();
    // registered authenticators
    const userPasskeys = ((await fetchUserPasskeyDetails(identifier))?.passKeys || []) as WebAuthnCredential[]
    const options = await generateAuthenticationOptions({
      rpID,
      // Require users to use a previously-registered authenticator
      allowCredentials: userPasskeys.map(passkey => ({
        id: passkey.id,
        transports: passkey.transports,
      })),
    });
    // Remember this challenge for this user
    cookies_.set('options', JSON.stringify(options), {
      httpOnly: true,
    })
    return options
  } catch (error) {
    console.error({ passkeyAuthenticationChallengeError: error});
    throw error
  }
}

export const handleChallengeVerification = async (identifier: string, response: AuthenticationResponseJSON) => {
  try {
    const cookies_ = await cookies();
    const optionsCookie = cookies_.get('options')
    const currentOptionsObj = JSON.parse(optionsCookie?.value!)
    if (!currentOptionsObj) throw new Error('Error parsing options')
  
    const userPasskeys = ((await fetchUserPasskeyDetails(identifier))?.passKeys || []) as WebAuthnCredential[]
    // find passkey user signed challenge with
    const passkey = userPasskeys.find(passkey => passkey.id === response.id) as WebAuthnCredential
    if (!passkey) {
      throw new Error('passkey not found')
    }
  
    // // Extract the values from the object
    const values = Object.values(passkey.publicKey);
    const publicKeyUint8 = new Uint8Array(values as any);
    const verification = await verifyAuthenticationResponse({
      response,
      expectedOrigin: expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: false,
      expectedChallenge: currentOptionsObj.challenge,
      credential: {
        id: passkey.id,
        publicKey: publicKeyUint8,
        counter: passkey.counter,
        transports: passkey.transports,
      },
    });
    const { verified } = verification;
    if (!verified) {
      throw new Error('Error verifying authentication');
    }
    const { authenticationInfo } = verification;
    const { newCounter } = authenticationInfo;
  
    await updatePasskeyCounter({identifier: identifier, newCounter, passkeyID: passkey.id});
    // remove the options cookie
    (await cookies()).delete('options')
    return
  } catch (error) {
    console.error({ passkeyAuthenticationVerificationError: error});
    throw error
  }
}