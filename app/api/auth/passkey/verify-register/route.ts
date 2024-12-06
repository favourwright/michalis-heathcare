import { NextRequest, NextResponse } from 'next/server';
import {
  VerifiedRegistrationResponse,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import { addNewPasskey } from '@/actions/firestore/auth';
import { RegistrationChallengeVerifiicationDTO, Passkey } from '@/types/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const data = await request.json() as RegistrationChallengeVerifiicationDTO
  const rpID = process.env.AUTHN_RP_ID!;
  const expectedOrigin = process.env.AUTHN_ORIGIN!;
  const identifier = data.identifier;
  const response = data.response;
  const optionsCookie = request.cookies.get('options')

  let parsedOptionsObj:PublicKeyCredentialCreationOptionsJSON
  try {
    parsedOptionsObj = JSON.parse(optionsCookie?.value!) as PublicKeyCredentialCreationOptionsJSON
    if (!parsedOptionsObj) throw new Error('Error parsing options')
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 400 }
    );
  }

  const opts: VerifyRegistrationResponseOpts = {
    response,
    expectedOrigin,
    expectedRPID: rpID,
    requireUserVerification: false, // Enforce user verification by the authenticator
    expectedChallenge: parsedOptionsObj?.challenge!,
  };

  let verification: VerifiedRegistrationResponse;
  try {
    verification = await verifyRegistrationResponse(opts);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error)?.message || 'Error verifying registration' },
      { status: 400 }
    );
  }

  const { verified, registrationInfo } = verification;
  if (!verified || !registrationInfo) {
    return NextResponse.json(
      { message: 'Error verifying registration' },
      { status: 400 }
    );
  }

  const {
    credential,
    credentialDeviceType,
    credentialBackedUp,
  } = registrationInfo;

  const newPasskey: Passkey = {
    // `user` here is from Step 2
    user: identifier.value,
    // Created by `generateRegistrationOptions()` in Step 1
    webauthnUserID: parsedOptionsObj?.user.id!,
    // A unique identifier for the credential
    id: credential.id,
    // The public key bytes, used for subsequent authentication signature verification
    publicKey: credential.publicKey,
    // The number of times the authenticator has been used on this site so far
    counter: credential.counter,
    // How the browser can talk with this credential's authenticator
    transports: credential.transports,
    // Whether the passkey is single-device or multi-device
    deviceType: credentialDeviceType,
    // Whether the passkey has been backed up in some way
    backedUp: credentialBackedUp,
  };

  await addNewPasskey(identifier.value, newPasskey);
  // remove the options cookie
  (await cookies()).delete('options')

  return NextResponse.json({
    message: 'Success',
    data: newPasskey,
  })
}