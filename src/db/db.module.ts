// src/database/drizzle.module.ts
import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export const DRIZZLE_CLIENT = 'DRIZZLE_CLIENT';

@Module({
  providers: [
    {
      provide: DRIZZLE_CLIENT,
      useFactory: () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });

        const db = drizzle(pool, { schema });
        return db;
      },
    },
  ],
  exports: [DRIZZLE_CLIENT],
})
export class DrizzleModule {}
