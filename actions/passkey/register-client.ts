import { startRegistration } from '@simplewebauthn/browser';
import { fetchUserPasskeyDetails } from '@/actions/firestore/passkey';
import { UseMutateFunction } from '@tanstack/react-query';
import { RegistrationChallengeVerifiicationDTO } from '@/types/auth';
import { fetchUserDetails, fbSignup, fbLogin, fbLogout } from "@/actions/firestore/auth";

export const signChallenge = async (optionsJSON: any) => {
  try {
    const res = await startRegistration({ optionsJSON });
    return res
  } catch (error: any) {
    console.log({challengeSignupError: error})
    throw error;
  }
}

export const signupWithPasskey = async (
  {identifier, challengeFn, verifyFn}:
  {
    identifier: string
    challengeFn: UseMutateFunction<any, Error, string, unknown>
    verifyFn: UseMutateFunction<any, Error, Omit<RegistrationChallengeVerifiicationDTO, 'identifier'> & { identifier: string }, unknown>
  }
) => {
  try {
    // fetch firebase current user and check if user is verified
    const passkeyDetails = await fetchUserPasskeyDetails(identifier);
    if(passkeyDetails?.emailVerified) {
      throw new Error('User already exists')
    }

    challengeFn(identifier, {
      onSuccess: async (response) => {
        console.log('Challenge fetched:', response);
        const signedResponse = await signChallenge(response?.data?.options);

        // Proceed to verify the challenge
        verifyFn(
          {
            identifier,
            response: signedResponse,
            // else if they exist, replace their passkey, overridePasskeys is set to true
            // else if they don't exist, overridePasskeys is set to false
            overridePasskeys: !!passkeyDetails
          },
          {
            onSuccess: (verifyData) => {
              console.log('Challenge verified successfully:', verifyData);

              // TODO, fix this call. there are other preferred conditions that can
              // be satisfied here but not ideal
              // proceed to creating firebase user account
              // if overridePasskeys is false that means user is signing up afresh
              fbSignup(identifier)
            },
            onError: (verifyError) => {
              console.error('Verification failed:', verifyError);
            },
          }
        );
      },
      onError: (fetchError) => {
        console.error('Failed to fetch challenge:', fetchError);
      },
    });
  } catch (error) {
    console.error({ userRegistrationError: error});
    throw error
  }
}