import { NextRequest, NextResponse } from 'next/server';
import {
  VerifiedRegistrationResponse,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import { fetchUserDetailsByEmail, addNewPasskey, updateAuthNOptions } from '@/actions/firestore/auth';
import { Passkey } from '@/types/auth';

export async function POST(request: NextRequest) {
  const data = await request.json() as { email: string, response: any };
  const rpID = process.env.AUTHN_RP_ID!;
  const expectedOrigin = process.env.AUTHN_ORIGIN!;
  const email = data.email;
  const response = data.response;
  const userData = (await fetchUserDetailsByEmail(email));

  const opts: VerifyRegistrationResponseOpts = {
    response,
    expectedOrigin,
    expectedRPID: rpID,
    requireUserVerification: false, // Enforce user verification by the authenticator
    expectedChallenge: userData?.options?.challenge!,
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
    user: email,
    // Created by `generateRegistrationOptions()` in Step 1
    webauthnUserID: userData?.options?.user.id!,
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

  await addNewPasskey(email, newPasskey);
  await updateAuthNOptions(email, null);

  return NextResponse.json({
    message: 'Success',
    data: newPasskey,
  })
}