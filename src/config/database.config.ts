import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT || 5432,
}));
