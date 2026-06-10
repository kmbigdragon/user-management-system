import { Controller, Get, Post, Put, Delete, Body, Param, Query, Version, ParseUUIDPipe } from '@nestjs/common';
import { PaginationData } from '@/interceptors/transform/transform.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { PaginationDto } from '../pagination/dto/pagination.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Version('1')
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.usersService.create(createUserDto);
    const output = new ReadUserDto(
      user.uid,
      user.name,
      user.email,
      user.dob.toISOString(),
      user.phone,
      user.status,
      user.role,
    );
    return output;
  }

  @Version('1')
  @Get()
  async findAll(@Query() query: PaginationDto): Promise<PaginationData<ReadUserDto>> {
    const result = await this.usersService.findAll(query.page, query.limit);

    return {
      ...result,
      items: result.items.map(
        (user) =>
          new ReadUserDto(user.uid, user.name, user.email, user.dob.toISOString(), user.phone, user.status, user.role),
      ),
    };
  }

  @Version('1')
  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<ReadUserDto> {
    const user = await this.usersService.findOneById(id);
    return new ReadUserDto(user.uid, user.name, user.email, user.dob.toISOString(), user.phone, user.status, user.role);
  }

  @Version('1')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return new ReadUserDto(user.uid, user.name, user.email, user.dob.toISOString(), user.phone, user.status, user.role);
  }

  @Version('1')
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ReadUserDto> {
    const user = await this.usersService.remove(id);
    return new ReadUserDto(user.uid, user.name, user.email, user.dob.toISOString(), user.phone, user.status, user.role);
  }
}
