import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  role: string;
  username: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function authenticateAdmin(username: string, password: string) {
  try {
    // Check if Prisma is available (database connected)
    if (!prisma || typeof prisma.adminUser === 'undefined') {
      console.error('Prisma client not available - DATABASE_URL may be missing');
      return null;
    }

    const admin = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!admin || !admin.isActive) {
      return null;
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return null;
    }

    const token = generateToken({
      userId: admin.id,
      role: admin.role,
      username: admin.username,
    });

    return {
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      token,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

