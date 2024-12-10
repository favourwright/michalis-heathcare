'use client';
import { useState } from 'react';
import {
  useChallenge,
  useVerifyChallenge,
} from '@/hooks/usePasskeyRegistration';
import { startRegistration } from '@simplewebauthn/browser';
import { RegistrationResponseJSON } from '@simplewebauthn/types';

export const signChallenge = async (optionsJSON: any):Promise<RegistrationResponseJSON> => {
  try {
    const res = await startRegistration({ optionsJSON });
    return res
  } catch (error: any) {
    console.log({challengeSignupError: error})
    throw error;
  }
}

export default function Home() {
  const [email, setEmail] = useState('');

  const { mutate: fetchChallenge, isPending: isFetching } = useChallenge();
  const { mutate: verifyChallenge, isPending: isVerifying } = useVerifyChallenge();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchChallenge(email, {
      onSuccess: async (response) => {
        console.log('Challenge fetched:', response);
        const signedResponse = await signChallenge(response?.data?.options);

        // Proceed to verify the challenge
        verifyChallenge(
          { email: response?.data?.identifier, response: signedResponse },
          {
            onSuccess: (verifyData) => {
              console.log('Challenge verified successfully:', verifyData);
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
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          className="border border-black"
        />
        <button type="submit" disabled={isFetching || isVerifying}>
          {isFetching
            ? 'Fetching Challenge...'
            : isVerifying
            ? 'Verifying...'
            : 'Register'}
        </button>
      </form>
    </section>
  );
}