import { ApiProperty } from '@nestjs/swagger';
import type { ConversationType } from './schema';
import {
  UsersType,
  ConversationsType,
  ConversationMembersType,
  MessagesType,
  AttachmentsType,
} from './schema';

// User Types
export interface User extends UsersType {
  id: string;
}

export class CreateUserDto implements Omit<
  UsersType,
  'id' | 'created_at' | 'updated_at'
> {
  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password hash',
    example: 'hashed_password',
  })
  password_hash: string;
}

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    description: 'Username',
    example: 'john_doe',
  })
  username?: string;

  @ApiProperty({
    required: false,
    description: 'Email address',
    example: 'john@example.com',
  })
  email?: string;

  @ApiProperty({
    required: false,
    description: 'Password hash',
    example: 'hashed_password',
  })
  password_hash?: string;

  @ApiProperty({
    required: false,
    description: 'User active status',
    example: true,
  })
  is_active?: boolean;
}

// Conversation Types
export interface Conversation extends ConversationsType {
  id: string;
}

export class CreateConversationDto implements Omit<
  ConversationsType,
  'id' | 'created_at' | 'updated_at'
> {
  @ApiProperty({
    required: false,
    description: 'Conversation title',
    example: 'Project Discussion',
  })
  title?: string;

  @ApiProperty({
    description: 'Conversation type',
    enum: ['private', 'group'],
    example: 'private',
  })
  type?: ConversationType;

  @ApiProperty({
    description: 'User ID of creator',
    example: 'uuid-string',
  })
  created_by: string;
}

export class UpdateConversationDto {
  @ApiProperty({
    required: false,
    description: 'Conversation title',
    example: 'Project Discussion',
  })
  title?: string;

  @ApiProperty({
    required: false,
    description: 'Conversation type',
    enum: ['private', 'group'],
    example: 'private',
  })
  type?: ConversationType;
}

// Conversation Member Types
export interface ConversationMember extends ConversationMembersType {
  id: string;
}

export class CreateConversationMemberDto implements Omit<
  ConversationMembersType,
  'id' | 'joined_at'
> {
  @ApiProperty({
    description: 'Conversation ID',
    example: 'uuid-string',
  })
  conversation_id: string;

  @ApiProperty({
    description: 'User ID',
    example: 'uuid-string',
  })
  user_id: string;
}

// Message Types
export interface Message extends MessagesType {
  id: string;
}

export class CreateMessageDto implements Omit<
  MessagesType,
  'id' | 'created_at'
> {
  @ApiProperty({
    description: 'Conversation ID',
    example: 'uuid-string',
  })
  conversation_id: string;

  @ApiProperty({
    description: 'Sender User ID',
    example: 'uuid-string',
  })
  sender_id: string;

  @ApiProperty({
    description: 'Message content',
    example: 'Hello, how are you?',
  })
  content: string;
}

// Attachment Types
export interface Attachment extends AttachmentsType {
  id: string;
}

export class CreateAttachmentDto implements Omit<
  AttachmentsType,
  'id' | 'created_at'
> {
  @ApiProperty({
    description: 'Message ID',
    example: 'uuid-string',
  })
  message_id: string;

  @ApiProperty({
    description: 'File URL',
    example: 'https://example.com/files/image.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'File name',
    example: 'image.jpg',
  })
  file_name: string;

  @ApiProperty({
    description: 'MIME type',
    example: 'image/jpeg',
  })
  mime_type: string;

  @ApiProperty({
    description: 'File size in bytes',
    example: 102400,
  })
  file_size: number;
}
