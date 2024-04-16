import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  MembershipRequest,
  MembershipResponse,
} from 'src/model/membership.model';
import { MembershipValidation } from './membership.validation';

@Injectable()
export class MembershipService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(request: MembershipRequest): Promise<MembershipResponse> {
    const membershipRequest: MembershipRequest =
      this.validationService.validate(MembershipValidation.CREATE, request);

    const totalMembershipWithSameTitle =
      await this.prismaService.membership.count({
        where: {
          title: membershipRequest.title,
        },
      });

    if (totalMembershipWithSameTitle != 0) {
      throw new HttpException('Title already exists', 400);
    }

    const membership = await this.prismaService.membership.create({
      data: membershipRequest,
    });

    return {
      id: membership.id,
      title: membership.title,
      description: membership.description,
      price: membership.price,
    };
  }
}
