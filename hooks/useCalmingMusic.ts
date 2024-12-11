import { useQuery } from '@tanstack/react-query';

interface Track {
  id: number;
  name: string;
  artist_name: string;
  audio: string;
}

interface JamendoResponse {
  results: Track[];
}

const fetchCalmingMusic = async (): Promise<JamendoResponse> => {
  const response = await fetch('/api/fetch-calming-music');
  if (!response.ok) throw new Error('Error fetching music');
  return response.json();
};

export default function useCalmingMusic() {
  return useQuery({
    queryKey: ['calming-music'],
    queryFn: fetchCalmingMusic,
    staleTime: 1000 * 60 * 60,
  });
}