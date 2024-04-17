import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { Membership, Merchandise, Training, User } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteUser();
    await this.deleteMembership();
    await this.deleteMerchandise();
    await this.deleteTraining();
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

  async deleteMerchandise() {
    await this.prismaService.merchandise.deleteMany({
      where: {
        title: 'test',
      },
    });
  }

  async deleteTraining() {
    await this.prismaService.training.deleteMany({
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

  async createMerchandise() {
    await this.prismaService.merchandise.create({
      data: {
        title: 'test',
        description: 'test',
        price: 100,
        stock: 100,
      },
    });
  }

  async createTraining() {
    await this.prismaService.training.create({
      data: {
        title: 'test',
        description: 'test',
        image: 'test',
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

  async getMembership(): Promise<Membership> {
    return this.prismaService.membership.findUnique({
      where: {
        title: 'test',
      },
    });
  }

  async getMerchandise(): Promise<Merchandise> {
    return this.prismaService.merchandise.findUnique({
      where: {
        title: 'test',
      },
    });
  }

  async getTraining(): Promise<Training> {
    return this.prismaService.training.findUnique({
      where: {
        title: 'test',
      },
    });
  }
}
