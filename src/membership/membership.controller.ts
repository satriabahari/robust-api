import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import {
  MembershipRequest,
  MembershipResponse,
  SearchMembershipRequest,
} from '../model/membership.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/memberships')
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() request: MembershipRequest,
  ): Promise<WebResponse<MembershipResponse>> {
    const result = await this.membershipService.create(request);
    return {
      data: result,
    };
  }

  @Get('/:membershipId')
  @HttpCode(200)
  async get(
    @Param('membershipId', ParseIntPipe) membershipId: number,
  ): Promise<WebResponse<MembershipResponse>> {
    const result = await this.membershipService.get(membershipId);
    return {
      data: result,
    };
  }

  @Put('/:membershipId')
  @HttpCode(200)
  async update(
    @Param('membershipId', ParseIntPipe) membershipId: number,
    @Body() request: MembershipRequest,
  ): Promise<WebResponse<MembershipResponse>> {
    const result = await this.membershipService.update(membershipId, request);
    return {
      data: result,
    };
  }

  @Delete('/:membershipId')
  @HttpCode(200)
  async remove(
    @Param('membershipId', ParseIntPipe) membershipId: number,
  ): Promise<WebResponse<boolean>> {
    await this.membershipService.remove(membershipId);
    return {
      data: true,
    };
  }

  // @Get()
  // @HttpCode(200)
  // async list(): Promise<WebResponse<MembershipResponse[]>> {
  //   const result = await this.membershipService.list();
  //   return {
  //     data: result,
  //   };
  // }

  @Get()
  @HttpCode(200)
  async search(
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('price', new ParseIntPipe({ optional: true })) price?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<MembershipResponse[]>> {
    const request: SearchMembershipRequest = {
      title: title,
      description: description,
      price: price,
      page: page || 1,
      size: size || 10,
    };

    return this.membershipService.search(request);
  }
}
