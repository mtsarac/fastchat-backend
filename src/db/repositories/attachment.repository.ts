import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { attachments } from '../schema';
import { eq } from 'drizzle-orm';
import { CreateAttachmentDto } from '../types';

@Injectable()
export class AttachmentRepository {
  constructor(private dbService: DbService) {}

  async findAll() {
    const db = this.dbService.getDb();
    return db.select().from(attachments);
  }

  async findById(id: string) {
    const db = this.dbService.getDb();
    return db.select().from(attachments).where(eq(attachments.id, id));
  }

  async findByMessageId(messageId: string) {
    const db = this.dbService.getDb();
    return db
      .select()
      .from(attachments)
      .where(eq(attachments.message_id, messageId));
  }

  async create(data: CreateAttachmentDto) {
    const db = this.dbService.getDb();
    return db.insert(attachments).values(data).returning();
  }

  async delete(id: string) {
    const db = this.dbService.getDb();
    return db.delete(attachments).where(eq(attachments.id, id)).returning();
  }
}
