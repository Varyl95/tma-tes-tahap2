import { setSession } from 'lib/session'; 
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  const { access_token, refresh_token, user } = body;

  if (!access_token || !refresh_token) {
    return NextResponse.json({ message: 'Missing tokens' }, { status: 400 });
  }

  await setSession({
    access_token,
    refresh_token,
    user
  });

  return NextResponse.json({ message: 'Session set' });
}
