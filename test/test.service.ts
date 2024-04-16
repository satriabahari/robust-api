import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteUser();
    await this.deleteMembership();
  }

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        email: 'test@gmail.com',
      },
    });
  }

  async deleteMembership() {
    await this.prismaService.membership.deleteMany({
      where: {
        title: 'test',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        email: 'test@gmail.com',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }

  async createMembership() {
    await this.prismaService.membership.create({
      data: {
        title: 'test',
        description: 'test',
        price: 100,
      },
    });
  }

  async getUser(): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email: 'test@gmail.com',
      },
    });
  }
}
