import { ApiProperty } from '@nestjs/swagger';

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
    description: 'Plain text password (will be hashed)',
    example: 'password123',
  })
  password_hash?: string;

  @ApiProperty({
    required: false,
    description: 'User active status',
    example: true,
  })
  is_active?: boolean;
}
