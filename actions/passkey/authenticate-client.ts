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