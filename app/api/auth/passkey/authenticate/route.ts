import { fetchUserDetails, updatePasskeyCounter } from "@/actions/firestore/auth";
import { Identifier } from "@/types/auth";
import { generateAuthenticationOptions, verifyAuthenticationResponse } from "@simplewebauthn/server";
import { AuthenticationResponseJSON, WebAuthnCredential } from "@simplewebauthn/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const rpID = process.env.AUTHN_RP_ID!;
const expectedOrigin = process.env.AUTHN_ORIGIN!;

const handleChallengeGeneration = async (identifier: string) => {
  try {
    const cookies_ = await cookies();
    // registered authenticators
    const userPasskeys = (await fetchUserDetails(identifier))?.passKeys || [];
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

const handleChallengeVerification = async (identifier: string, response: AuthenticationResponseJSON) => {
  try {
    const cookies_ = await cookies();
    const optionsCookie = cookies_.get('options')
    const currentOptionsObj = JSON.parse(optionsCookie?.value!)
    if (!currentOptionsObj) throw new Error('Error parsing options')
  
    const userPasskeys = (await fetchUserDetails(identifier))?.passKeys || [];
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

export async function POST(request: NextRequest) {
  const body = await request.json() as {identifier: Identifier, response: AuthenticationResponseJSON}
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
    console.error({ passkeyAuthenticationError: error});
    return NextResponse.json(
      { error: error, message: 'passkey authentication error' },
      { status: 400 }
    );
  }
}