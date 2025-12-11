import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto, UpdateUserDto } from '../types';

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

  async create(data: CreateUserDto) {
    const db = this.dbService.getDb();
    return db.insert(users).values(data).returning();
  }

  async update(id: string, data: UpdateUserDto) {
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
