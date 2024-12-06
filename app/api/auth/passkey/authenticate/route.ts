import { fetchUserDetails } from "@/actions/firestore/auth";
import { ChallengeDTO } from "@/types/auth";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json() as {identifier: ChallengeDTO}
  const rpID = process.env.AUTHN_RP_ID!;
  const identifier = data.identifier;
  const cookies_ = await cookies();
  // registered authenticators
  const userPasskeys = (await fetchUserDetails(identifier?.value))?.passKeys || [];

  const options: PublicKeyCredentialRequestOptionsJSON = await generateAuthenticationOptions({
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

  return NextResponse.json(
    { data: {options, identifier: identifier.value}, message: 'Success' },
    { status: 200 }
  );
}