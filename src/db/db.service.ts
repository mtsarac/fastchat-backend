import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

@Injectable()
export class DbService {
  // Database service methods go here
  initializeConnection() {
    // Logic to initialize database connection

    const db = drizzle(process.env.DATABASE_URL!);

    return db;
  }
}
