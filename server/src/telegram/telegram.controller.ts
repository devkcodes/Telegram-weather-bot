import { Controller, Delete, Get, Param } from '@nestjs/common';
import { FirestoredbService } from '../firestoredb/firestoredb.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly fs: FirestoredbService) {}

  @Get('users')
  async getAllUsers() {
    const users = await this.fs.getUsers();
    return users;
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string) {
    const result = await this.fs.deleteUser(userId);
    if (result) {
      return { message: 'User deleted successfully' };
    } else {
      return { message: 'Error deleting user' };
    }
  }
}
