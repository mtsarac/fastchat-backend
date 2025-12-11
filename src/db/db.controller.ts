import { Controller, Get } from '@nestjs/common';
import { DbService } from './db.service';

@Controller('db')
export class DbController {
  constructor(private dbService: DbService) {}

  @Get()
  findAll(): string {
    try {
      this.dbService.getDb();
      return 'Database connection is working';
    } catch {
      return 'Database connection failed';
    }
  }

  @Get('health')
  health(): { status: string } {
    try {
      this.dbService.getDb();
      return { status: 'ok' };
    } catch {
      return { status: 'error' };
    }
  }
}
