import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../db/repositories';
import { CreateUserDto, UpdateUserDto, User } from '../db/types';

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
    const result = await this.userRepository.create(createUserDto);
    return result[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);
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
