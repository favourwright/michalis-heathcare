import { Identifier, RegistrationChallengeVerifiicationDTO } from '@/types/auth';
import { AuthenticationResponseJSON } from '@simplewebauthn/types';
import { useMutation } from '@tanstack/react-query';

export const fetchChallenge = async (email: string): Promise<any> => {
  const identifier: Identifier = {
    type: 'email',
    value: email
  }
  const response = await fetch('/api/auth/passkey/authenticate', {
    method: 'POST',
    body: JSON.stringify({ identifier }),
  });
  if(!response?.ok) throw response
  return response.json();
};

export function useChallenge() {
  return useMutation({
    mutationFn: (email: string) => fetchChallenge(email)
  });
}

export const verifyChallenge = async (
  {email, response}:
  {email: string, response: any}
) => {
  const payload:RegistrationChallengeVerifiicationDTO = {
    identifier: {
      value: email,
      type: 'email',
    },
    response
  }
  const res = await fetch('/api/auth/passkey/authenticate', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if(!res?.ok) throw res
  return res.json();
}

export function useVerifyChallenge() {
  return useMutation({
    mutationFn: ({email, response}: {email: string, response: AuthenticationResponseJSON}) => verifyChallenge({email, response})
  });
}