import { randomBytes, pbkdf2Sync } from 'crypto';

export async function hashPassword(
  password: string,
  providedSalt?: string
): Promise<string> {
  // Use provided salt if available, otherwise generate a new one
  const salt = providedSalt || randomBytes(16).toString('hex');
  // Hash the password with the salt
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  // Return the salt and hash in a concatenated string
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  storedHash: string,
  passwordAttempt: string
): Promise<boolean> {
  const [salt, originalHash] = storedHash.split(':');
  const attemptHash = (await hashPassword(passwordAttempt, salt)).split(':')[1];
  return attemptHash === originalHash;
}
