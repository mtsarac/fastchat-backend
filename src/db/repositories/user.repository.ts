import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { users } from '../schema';
import { eq } from 'drizzle-orm';

export interface CreateUserInput {
  username: string;
  email: string;
  password_hash: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  password_hash?: string;
  is_active?: boolean;
}

@Injectable()
export class UserRepository {
  constructor(private dbService: DbService) {}

  async findAll() {
    const db = this.dbService.getDb();
    return db.select().from(users);
  }

  async findById(id: string) {
    const db = this.dbService.getDb();
    return db.select().from(users).where(eq(users.id, id));
  }

  async findByUsername(username: string) {
    const db = this.dbService.getDb();
    return db.select().from(users).where(eq(users.username, username));
  }

  async findByEmail(email: string) {
    const db = this.dbService.getDb();
    return db.select().from(users).where(eq(users.email, email));
  }

  async create(data: CreateUserInput) {
    const db = this.dbService.getDb();
    return db.insert(users).values(data).returning();
  }

  async update(id: string, data: UpdateUserInput) {
    const db = this.dbService.getDb();
    return db
      .update(users)
      .set({ ...data, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();
  }

  async delete(id: string) {
    const db = this.dbService.getDb();
    return db.delete(users).where(eq(users.id, id)).returning();
  }
}
