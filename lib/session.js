import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function decrypt(token) {
  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
  return payload;
}

export async function setSession(sessionData) {
  const token = await encrypt(sessionData);
  cookies().set('session', token, { httpOnly: true });
}

export async function getSession() {
  const cookie = cookies().get('session')?.value;
  if (!cookie) return null;
  return await decrypt(cookie);
}


export async function removeSession() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function verify(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}