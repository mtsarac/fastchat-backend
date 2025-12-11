import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { conversations } from '../schema';
import { eq } from 'drizzle-orm';
import { CreateConversationDto, UpdateConversationDto } from '../types';

@Injectable()
export class ConversationRepository {
  constructor(private dbService: DbService) {}

  async findAll() {
    const db = this.dbService.getDb();
    return db.select().from(conversations);
  }

  async findById(id: string) {
    const db = this.dbService.getDb();
    return db.select().from(conversations).where(eq(conversations.id, id));
  }

  async findByCreatedBy(userId: string) {
    const db = this.dbService.getDb();
    return db
      .select()
      .from(conversations)
      .where(eq(conversations.created_by, userId));
  }

  async create(data: CreateConversationDto) {
    const db = this.dbService.getDb();
    return db.insert(conversations).values(data).returning();
  }

  async update(id: string, data: UpdateConversationDto) {
    const db = this.dbService.getDb();
    return db
      .update(conversations)
      .set({ ...data, updated_at: new Date() })
      .where(eq(conversations.id, id))
      .returning();
  }

  async delete(id: string) {
    const db = this.dbService.getDb();
    return db.delete(conversations).where(eq(conversations.id, id)).returning();
  }
}
