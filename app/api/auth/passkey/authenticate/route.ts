import { handleChallengeGeneration, handleChallengeVerification } from "@/actions/passkey/authenticate-server";
import { Identifier } from "@/types/auth";
import { AuthenticationResponseJSON } from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";

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