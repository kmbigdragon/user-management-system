import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.usersService.create(createUserDto);
    const output = new ReadUserDto(user.uid, user.name, user.email, user.dob.toISOString(), user.phone);
    return output;
  }

  @Get()
  findAll(): ReadUserDto[] {
    return this.usersService
      .findAll()
      .map((user) => new ReadUserDto(user.uid, user.name, user.email, user.dob.toISOString(), user.phone));
  }

  @Get(':id')
  findOneById(@Param('id') id: string): ReadUserDto {
    const user = this.usersService.findOne(id);
    return new ReadUserDto(user.uid, user.name, user.email, user.dob.toISOString(), user.phone);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): ReadUserDto {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): string {
  //   return this.usersService.remove(+id);
  // }
}
