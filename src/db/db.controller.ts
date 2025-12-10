import { Controller } from '@nestjs/common';
import { DbService } from './db.service';

@Controller()
export class DbController {
  constructor(private dbService: DbService) {
    // You can use the dbService here
  }
}
