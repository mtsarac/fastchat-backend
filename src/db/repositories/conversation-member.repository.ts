import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { conversation_members } from '../schema';
import { eq, and } from 'drizzle-orm';
import { CreateConversationMemberDto } from '../types';

@Injectable()
export class ConversationMemberRepository {
  constructor(private dbService: DbService) {}

  async findAll() {
    const db = this.dbService.getDb();
    return db.select().from(conversation_members);
  }

  async findByConversationId(conversationId: string) {
    const db = this.dbService.getDb();
    return db
      .select()
      .from(conversation_members)
      .where(eq(conversation_members.conversation_id, conversationId));
  }

  async findByUserId(userId: string) {
    const db = this.dbService.getDb();
    return db
      .select()
      .from(conversation_members)
      .where(eq(conversation_members.user_id, userId));
  }

  async findByConversationAndUser(conversationId: string, userId: string) {
    const db = this.dbService.getDb();
    return db
      .select()
      .from(conversation_members)
      .where(
        and(
          eq(conversation_members.conversation_id, conversationId),
          eq(conversation_members.user_id, userId),
        ),
      );
  }

  async create(data: CreateConversationMemberDto) {
    const db = this.dbService.getDb();
    return db.insert(conversation_members).values(data).returning();
  }

  async delete(id: string) {
    const db = this.dbService.getDb();
    return db
      .delete(conversation_members)
      .where(eq(conversation_members.id, id))
      .returning();
  }
}
