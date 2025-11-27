import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only create PrismaClient if DATABASE_URL is available
// This prevents errors during build time
const createPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    // Return a mock client during build if DATABASE_URL is not set
    // This allows the build to complete
    return {} as PrismaClient;
  }
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma;
}

