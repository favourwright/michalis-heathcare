import { NextRequest, NextResponse } from 'next/server';
import { RegistrationResponseJSON } from '@simplewebauthn/server';
import { Identifier } from '@/types/auth';
import { handleChallengeGeneration, handleChallengeVerification } from '@/actions/passkey/register-server';

export async function POST(request: NextRequest) {
  const body = await request.json() as {
    identifier: Identifier,
    /* @param overridePasskeys: boolean
      used when user signs up afresh with the same email
      without verifying the previous signup through email verification
    */
    overridePasskeys?: boolean,
    response: RegistrationResponseJSON
  }
  const {identifier, overridePasskeys, response} = body;

  try {
    if(response) {
      // verify challenge
      await handleChallengeVerification(identifier.value, response, overridePasskeys)
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
    console.error({ passkeyRegistrationError: error});
    return NextResponse.json(
      { error: error, message: 'passkey registration error' },
      { status: 400 }
    );
  }
}