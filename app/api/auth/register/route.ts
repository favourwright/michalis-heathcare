import { NextRequest, NextResponse } from 'next/server';
import {
  generateRegistrationOptions,
  GenerateRegistrationOptionsOpts,
} from '@simplewebauthn/server';
import { fetchUserDetailsByEmail, updateAuthNOptions } from '@/actions/firestore/auth';

export async function POST(request: NextRequest) {
  const data = await request.json() as { email: string };
  const rpID = process.env.AUTHN_RP_ID!;
  const rpName = process.env.APP_NAME!;
  const email = data.email;

  const userPasskeys = (await fetchUserDetailsByEmail(email))?.passKeys;
  if(userPasskeys?.length) return NextResponse.json(
    { message: 'User already exists' },
    { status: 400 }
  );

  const payload:GenerateRegistrationOptionsOpts = {
    rpID,
    rpName,
    userName: email,
    attestationType: "none",
    supportedAlgorithmIDs: [-7, -257],
    authenticatorSelection: {
      residentKey: "discouraged",
    },
    excludeCredentials: [],
  };
  const options:PublicKeyCredentialCreationOptionsJSON = await generateRegistrationOptions(payload);
  await updateAuthNOptions(email, options);

  return NextResponse.json(
    { data: {options, email}, message: 'Success' },
    { status: 200 }
  );
}