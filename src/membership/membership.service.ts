import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  MembershipRequest,
  MembershipResponse,
  SearchMembershipRequest,
} from 'src/model/membership.model';
import { MembershipValidation } from './membership.validation';
import { Membership } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';

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

    return this.toMembershipResponse(membership);
  }

  toMembershipResponse(membership: Membership): MembershipResponse {
    return {
      id: membership.id,
      title: membership.title,
      description: membership.description,
      price: membership.price,
    };
  }

  async checkMembershipMustExist(membershipId: number): Promise<Membership> {
    const membership = await this.prismaService.membership.findFirst({
      where: {
        id: membershipId,
      },
    });

    if (!membership) {
      throw new HttpException('Membership is not found', 404);
    }

    return membership;
  }

  async get(membershipId: number): Promise<MembershipResponse> {
    const membership = await this.checkMembershipMustExist(membershipId);

    return this.toMembershipResponse(membership);
  }

  async update(
    membershipId: number,
    request: MembershipRequest,
  ): Promise<MembershipResponse> {
    const updateRequest: MembershipRequest =
      await this.validationService.validate(
        MembershipValidation.UPDATE,
        request,
      );

    let membership = await this.checkMembershipMustExist(membershipId);

    membership = await this.prismaService.membership.update({
      where: {
        id: membershipId,
      },
      data: updateRequest,
    });

    return this.toMembershipResponse(membership);
  }

  async remove(membershipId: number): Promise<MembershipResponse> {
    await this.checkMembershipMustExist(membershipId);

    const membership = await this.prismaService.membership.delete({
      where: {
        id: membershipId,
      },
    });

    return this.toMembershipResponse(membership);
  }

  async list(): Promise<MembershipResponse[]> {
    const memberships = await this.prismaService.membership.findMany();

    return memberships.map((membership) =>
      this.toMembershipResponse(membership),
    );
  }

  async search(
    request: SearchMembershipRequest,
  ): Promise<WebResponse<MembershipResponse[]>> {
    const searchRequest: SearchMembershipRequest =
      this.validationService.validate(MembershipValidation.SEARCH, request);

    const filters = [];

    if (searchRequest.title) {
      filters.push({
        title: {
          contains: searchRequest.title,
        },
      });
    }

    if (searchRequest.description) {
      filters.push({
        description: {
          contains: searchRequest.description,
        },
      });
    }

    if (searchRequest.price) {
      filters.push({
        price: {
          contains: searchRequest.price,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const memberships = await this.prismaService.membership.findMany({
      where: {
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.membership.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: memberships.map((membership) =>
        this.toMembershipResponse(membership),
      ),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
