import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { v7 as uuidv7 } from 'uuid';

import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = this.findOneWithEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = new UserEntity(
      uuidv7(),
      createUserDto.name,
      hashedPassword,
      createUserDto.email,
      new Date(createUserDto.dob),
      createUserDto.phone,
    );
    this.users.push(user);
    return user;
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity {
    const user = this.users.filter((user) => user.uid === id)[0];
    return user;
  }

  findOneWithEmail(email: string): UserEntity {
    const user = this.users.filter((user) => user.email === email)[0];
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
