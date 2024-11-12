// lib/token-utils.ts
import { randomBytes } from 'crypto';

export function generateResetToken() {
    return randomBytes(32).toString('hex');
}
