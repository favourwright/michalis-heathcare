import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.JAMENDO_CLIENT_ID}&tags=calm&limit=10`);
  if (!response.ok) throw new Error('Error fetching music');
  const data = await response.json();
  return NextResponse.json(data);
}