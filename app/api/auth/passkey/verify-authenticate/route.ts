import { fetchUserDetails } from "@/actions/firestore/auth";
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
    verification = await verifyAuthenticationResponse({
      response,
      expectedOrigin: expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: false,
      expectedChallenge: currentOptionsObj.challenge,
      supportedAlgorithmIDs: [-7, -257],
      authenticator: {
        credentialPublicKey: new Uint8Array(passkey.publicKey.buffer),
      },
      credential: {
        id: passkey.id,
        publicKey: passkey.publicKey,
        counter: passkey.counter,
        transports: passkey.transports,
      },
    } as VerifyAuthenticationResponseOpts & {
      supportedAlgorithmIDs: number[],
      authenticator: {
        credentialPublicKey: Uint8Array,
      }
    });
  } catch (error) {
    console.error({ verifyAuthenticationResponseError: error });
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }
  
  const { verified } = verification;
  const { authenticationInfo } = verification;
  const { newCounter } = authenticationInfo;

  return NextResponse.json({
    message: 'Success',
    verified,
    newCounter,
    passkey
  }, { status: 200 })

  // await updatePasskeyCounter(identifier.value, {newCounter, passkeyID: passkey.id});
  // // remove the options cookie
  // (await cookies()).delete('options')

  // return NextResponse.json({
  //   message: 'Success',
  // })
}