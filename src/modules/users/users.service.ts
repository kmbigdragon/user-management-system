import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationData } from '@/interceptors/transform/transform.interceptor';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { v7 as uuidv7 } from 'uuid';

import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser: UserEntity | null = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    return this.prisma.user.create({
      data: {
        uid: uuidv7(),
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        dob: new Date(createUserDto.dob),
        phone: createUserDto.phone,
      },
    });
  }

  async findAll(page = 1, limit = 10): Promise<PaginationData<UserEntity>> {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
          dob: 'desc',
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { uid: id },
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findOneById(id);

    const data = { ...updateUserDto };

    if (data.email) {
      throw new ForbiddenException('Cannot change email');
    }

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data];

      if (value === undefined || value === null || value === '') {
        delete data[key as keyof typeof data];
      }
    });

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 12);
    } else {
      delete data.password;
    }

    return this.prisma.user.update({
      where: { uid: id },
      data,
    });
  }

  async remove(id: string): Promise<UserEntity> {
    await this.findOneById(id);
    return this.prisma.user.delete({
      where: { uid: id },
    });
  }
}
