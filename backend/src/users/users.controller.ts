import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserWithoutPassword, LoginUser } from './schemas/user.schema';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions/all-exceptions.filter';

@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  async findOne(@Body() user: LoginUser): Promise<UserWithoutPassword> {
    return this.usersService.findOne(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.usersService.delete(id);
  }
}
