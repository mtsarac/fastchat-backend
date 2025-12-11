import { UsersType } from '../db/schema';

export class User implements UsersType {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}
