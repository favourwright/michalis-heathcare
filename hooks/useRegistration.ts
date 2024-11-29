import { useMutation } from '@tanstack/react-query';

export const fetchChallenge = async (email: string): Promise<any> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email }),
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
): Promise<any> => {
  const res = await fetch('/api/auth/verify-registration', {
    method: 'POST',
    body: JSON.stringify({ email, response }),
  })
  if(!res?.ok) throw res
  return res.json();
}

export function useVerifyChallenge() {
  return useMutation({
    mutationFn: ({email, response}: {email: string, response: any}) => verifyChallenge({email, response})
  });
}