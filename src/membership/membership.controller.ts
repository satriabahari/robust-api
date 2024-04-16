import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';
import {
  MembershipRequest,
  MembershipResponse,
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
}
