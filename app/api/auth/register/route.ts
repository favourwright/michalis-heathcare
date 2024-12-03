import { NextRequest, NextResponse } from 'next/server';
import {
  generateRegistrationOptions,
  GenerateRegistrationOptionsOpts,
} from '@simplewebauthn/server';
import { fetchUserDetails } from '@/actions/firestore/auth';
import { cookies } from 'next/headers';
import { ChallengeGenerationDTO } from '@/types/auth';

export async function POST(request: NextRequest) {
  const data = await request.json() as {identifier: ChallengeGenerationDTO}
  const rpID = process.env.AUTHN_RP_ID!;
  const rpName = process.env.APP_NAME!;
  const identifier = data.identifier;
  const cookies_ = await cookies();

  const userPasskeys = (await fetchUserDetails(identifier?.value))?.passKeys || [];
  const payload:GenerateRegistrationOptionsOpts = {
    rpID,
    rpName,
    userName: identifier.value,
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

  return NextResponse.json(
    { data: {options, identifier: identifier.value}, message: 'Success' },
    { status: 200 }
  );
}