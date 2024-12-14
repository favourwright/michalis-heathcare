import { fbSignup } from '@/actions/firestore/auth';
import { Identifier, RegistrationChallengeVerifiicationDTO } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const fetchChallenge = async (email: string): Promise<any> => {
  const identifier: Identifier = {
    type: 'email',
    value: email
  }
  const response = await fetch('/api/auth/passkey/register', {
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
  {email, response, overridePasskeys}:
  {email: string, response: any, overridePasskeys?: boolean}
) => {
  const payload:RegistrationChallengeVerifiicationDTO = {
    identifier: {
      value: email,
      type: 'email',
    },
    response,
    overridePasskeys
  }
  const res = await fetch('/api/auth/passkey/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if(!res?.ok) throw res
  return res.json();
}

export function useVerifyChallenge() {
  return useMutation({
    mutationFn: (
      {identifier, response, overridePasskeys}: Omit<RegistrationChallengeVerifiicationDTO, 'identifier'> & { identifier: string }
    ) => verifyChallenge({email:identifier, response, overridePasskeys})
  });
}