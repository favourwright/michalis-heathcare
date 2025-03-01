import { fetchUserPasskeyDetails } from '@/actions/firestore/passkey';
import { UseMutateFunction } from '@tanstack/react-query';
import { AuthenticationChallengeVerifiicationDTO } from '@/types/auth';
import { fetchUserDetails, fbLogin } from "@/actions/firestore/auth";
import { AuthenticationResponseJSON, startAuthentication } from "@simplewebauthn/browser";

export const signChallenge = async (optionsJSON: any):Promise<AuthenticationResponseJSON> => {
  try {
    const res = await startAuthentication({ optionsJSON });
    return res
  } catch (error: any) {
    console.log({challengeSignupError: error})
    throw error;
  }
}

export const loginWithPasskey = async (
  {identifier, challengeFn, verifyFn, onSuccess, onError, onComplete}:
  {
    identifier: string
    challengeFn: UseMutateFunction<any, Error, string, unknown>
    verifyFn: UseMutateFunction<any, Error, Omit<AuthenticationChallengeVerifiicationDTO, 'identifier'> & { identifier: string }, unknown>
    onSuccess?: (message: string) => void
    onError?: (error: Error) => void
    onComplete?: () => void
  }
) => {
  try {
    challengeFn(identifier, {
      onSuccess: async (response) => {
        // console.log('Challenge fetched:', response);
        const signedResponse = await signChallenge(response?.data?.options);

        // Proceed to verify the challenge
        verifyFn(
          {
            identifier,
            response: signedResponse,
          },
          {
            onSuccess: async (verifyData) => {
              console.log('Challenge verified successfully:', verifyData);
              // fetch firebase current user and check if user is verified
              const passkeyDetails = await fetchUserPasskeyDetails(identifier);
              const password = passkeyDetails?.client!; // this is the client password that was generated at signup for the user
              
              try {
                // proceed to login user
                fbLogin({
                  email: identifier,
                  password,
                  onSuccess: async () => {
                    onSuccess?.('User logged in successfully');
                    const userDetails = await fetchUserDetails(identifier);
                    console.log({ userDetails });
                  }
                })
              } catch (error) {
                console.error({ loginError: error });
                onError?.(error as Error);
              }
            },
            onError: (verifyError) => {
              console.error('Verification failed:', verifyError);
              onError?.(verifyError)
            },
          }
        );
      },
      onError: (error) => {
        console.error('Failed to fetch challenge:', error);
        onError?.(error as Error);
      },
    });
  } catch (error) {
    console.error({ passkeyAuthenticationError: error});
    onError?.(error as Error);
  } finally {
    onComplete?.();
  }
}