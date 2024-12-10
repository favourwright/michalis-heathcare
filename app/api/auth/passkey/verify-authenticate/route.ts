import { fetchUserDetails, updatePasskeyCounter } from "@/actions/firestore/auth";
import { AuthenticationChallengeVerifiicationDTO } from "@/types/auth";
import { verifyAuthenticationResponse, VerifyAuthenticationResponseOpts } from "@simplewebauthn/server";
import { WebAuthnCredential } from "@simplewebauthn/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json() as AuthenticationChallengeVerifiicationDTO
  const rpID = process.env.AUTHN_RP_ID!;
  const expectedOrigin = process.env.AUTHN_ORIGIN!;
  const identifier = data.identifier;
  const response = data.response;
  const cookies_ = await cookies();

  const optionsCookie = request.cookies.get('options')
  let currentOptionsObj:PublicKeyCredentialRequestOptionsJSON
  try {
    currentOptionsObj = JSON.parse(optionsCookie?.value!) as PublicKeyCredentialRequestOptionsJSON
    if (!currentOptionsObj) throw new Error('Error parsing options')
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }

  const userPasskeys = (await fetchUserDetails(identifier?.value))?.passKeys || [];
  // find passkey user signed challenge with
  const passkey = userPasskeys.find(passkey => passkey.id === response.id) as WebAuthnCredential
  if (!passkey) {
    return NextResponse.json(
      { message: 'Error verifying authentication' },
      { status: 400 }
    );
  }

  let verification;
  // const opts = {
  //   response: body,
  //   expectedOrigin,
  //   expectedRPID: rpID,
  //   authenticator: passKey,
  //   requireUserVerification: false,
  //   expectedChallenge: options.challenge,
  // };
  try {

    // // Extract the values from the object
    const values = Object.values(passkey.publicKey);
    const publicKeyUint8 = new Uint8Array(values as any);
    verification = await verifyAuthenticationResponse({
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
  } catch (error) {
    console.error({ verifyAuthenticationResponseError: error });
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }
  
  const { verified } = verification;
  if (!verified) {
    return NextResponse.json(
      { message: 'Error verifying authentication' },
      { status: 400 }
    );
  }
  const { authenticationInfo } = verification;
  const { newCounter } = authenticationInfo;

  await updatePasskeyCounter({identifier: identifier.value, newCounter, passkeyID: passkey.id});
  // remove the options cookie
  (await cookies()).delete('options')

  return NextResponse.json({
    message: 'Success',
  })
}