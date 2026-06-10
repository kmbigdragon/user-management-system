import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL is missing. Please check your environment variables.');
    }
    const adapter = new PrismaPg({ connectionString: dbUrl });
    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    const log = new Logger('PrismaDatabase');
    log.log('Prisma connected to the Database');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
