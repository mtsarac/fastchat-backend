import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { messages } from '../schema';
import { eq } from 'drizzle-orm';
import { CreateMessageDto } from '../types';

@Injectable()
export class MessageRepository {
  constructor(private dbService: DbService) {}

  async findAll() {
    const db = this.dbService.getDb();
    return db.select().from(messages);
  }

  async findById(id: string) {
    const db = this.dbService.getDb();
    return db.select().from(messages).where(eq(messages.id, id));
  }

  async findByConversationId(conversationId: string) {
    const db = this.dbService.getDb();
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversation_id, conversationId));
  }

  async findBySenderId(senderId: string) {
    const db = this.dbService.getDb();
    return db.select().from(messages).where(eq(messages.sender_id, senderId));
  }

  async create(data: CreateMessageDto) {
    const db = this.dbService.getDb();
    return db.insert(messages).values(data).returning();
  }

  async delete(id: string) {
    const db = this.dbService.getDb();
    return db.delete(messages).where(eq(messages.id, id)).returning();
  }
}
