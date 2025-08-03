import { removeSession } from 'lib/session'
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  await removeSession();
  
  return NextResponse.json({ message: 'Session removed' });
}
