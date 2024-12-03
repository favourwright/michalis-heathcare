import { ChallengeGenerationDTO, ChallengeVerifiicationDTO } from '@/types/auth';
import { RegistrationResponseJSON } from '@simplewebauthn/types';
import { useMutation } from '@tanstack/react-query';

export const fetchChallenge = async (email: string): Promise<any> => {
  const identifier: ChallengeGenerationDTO = {
    type: 'email',
    value: email
  }
  const response = await fetch('/api/auth/register', {
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
  const payload:ChallengeVerifiicationDTO = {
    identifier: {
      value: email,
      type: 'email',
    },
    response
  }
  const res = await fetch('/api/auth/verify-registration', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if(!res?.ok) throw res
  return res.json();
}

export function useVerifyChallenge() {
  return useMutation({
    mutationFn: ({email, response}: {email: string, response: RegistrationResponseJSON}) => verifyChallenge({email, response})
  });
}