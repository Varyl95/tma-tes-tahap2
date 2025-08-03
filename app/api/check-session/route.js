import { getSession } from 'lib/session'
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(req, res) {
  const check = await getSession();

  if (!check){
    return NextResponse.json({ message: 'Missing tokens' }, { status: 400 });
  }
  return NextResponse.json({ message: 'OK' }, { status: 200 });
}
