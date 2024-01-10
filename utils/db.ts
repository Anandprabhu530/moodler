import { PrismaClient } from "@prisma/client";

const globalprisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalprisma.prisma ?? new PrismaClient({
    log: ['query'],
})

if (process.env.NODE_ENV !== 'production') globalprisma.prisma = prisma