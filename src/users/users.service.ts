import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../db/repositories';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const users = await this.userRepository.findById(id);
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return users[0];
  }

  async findByUsername(username: string): Promise<User> {
    const users = await this.userRepository.findByUsername(username);
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return users[0];
  }

  async findByEmail(email: string): Promise<User> {
    const users = await this.userRepository.findByEmail(email);
    if (!users || users.length === 0) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return users[0];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Şifreyi hash'le
      const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 10);

      const createUserWithHashedPassword = {
        ...createUserDto,
        password_hash: hashedPassword,
      };

      const result = await this.userRepository.create(
        createUserWithHashedPassword,
      );
      return result[0];
    } catch {
      throw new BadRequestException('Failed to create user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Eğer şifre güncelleniyorsa, hash'le
    const updateData = { ...updateUserDto };
    if (updateData.password_hash) {
      updateData.password_hash = await bcrypt.hash(
        updateData.password_hash,
        10,
      );
    }

    const result = await this.userRepository.update(id, updateData);
    if (!result || result.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return result[0];
  }

  async delete(id: string): Promise<User> {
    const result = await this.userRepository.delete(id);
    if (!result || result.length === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return result[0];
  }
}
