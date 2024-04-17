import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { MerchandiseValidation } from './merchandise.validation';
import { Merchandise } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';
import {
  MerchandiseRequest,
  MerchandiseResponse,
  SearchMerchandiseRequest,
} from 'src/model/merchandise.model';

@Injectable()
export class MerchandiseService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(request: MerchandiseRequest): Promise<MerchandiseResponse> {
    const merchandiseRequest: MerchandiseRequest =
      this.validationService.validate(MerchandiseValidation.CREATE, request);

    const totalMerchandiseWithSameTitle =
      await this.prismaService.merchandise.count({
        where: {
          title: merchandiseRequest.title,
        },
      });

    if (totalMerchandiseWithSameTitle != 0) {
      throw new HttpException('Title already exists', 400);
    }

    const merchandise = await this.prismaService.merchandise.create({
      data: merchandiseRequest,
    });

    return this.toMerchandiseResponse(merchandise);
  }

  toMerchandiseResponse(merchandise: Merchandise): MerchandiseResponse {
    return {
      id: merchandise.id,
      title: merchandise.title,
      description: merchandise.description,
      price: merchandise.price,
      stock: merchandise.stock,
    };
  }

  async checkMerchandiseMustExist(merchandiseId: number): Promise<Merchandise> {
    const merchandise = await this.prismaService.merchandise.findFirst({
      where: {
        id: merchandiseId,
      },
    });

    if (!merchandise) {
      throw new HttpException('Merchandise is not found', 404);
    }

    return merchandise;
  }

  async get(merchandiseId: number): Promise<MerchandiseResponse> {
    const merchandise = await this.checkMerchandiseMustExist(merchandiseId);

    return this.toMerchandiseResponse(merchandise);
  }

  async update(
    merchandiseId: number,
    request: MerchandiseRequest,
  ): Promise<MerchandiseResponse> {
    const updateRequest: MerchandiseRequest =
      await this.validationService.validate(
        MerchandiseValidation.UPDATE,
        request,
      );

    let merchandise = await this.checkMerchandiseMustExist(merchandiseId);

    merchandise = await this.prismaService.merchandise.update({
      where: {
        id: merchandiseId,
      },
      data: updateRequest,
    });

    return this.toMerchandiseResponse(merchandise);
  }

  async remove(merchandiseId: number): Promise<MerchandiseResponse> {
    await this.checkMerchandiseMustExist(merchandiseId);

    const merchandise = await this.prismaService.merchandise.delete({
      where: {
        id: merchandiseId,
      },
    });

    return this.toMerchandiseResponse(merchandise);
  }

  async list(): Promise<MerchandiseResponse[]> {
    const merchandises = await this.prismaService.merchandise.findMany();

    return merchandises.map((merchandise) =>
      this.toMerchandiseResponse(merchandise),
    );
  }

  async search(
    request: SearchMerchandiseRequest,
  ): Promise<WebResponse<MerchandiseResponse[]>> {
    const searchRequest: SearchMerchandiseRequest =
      this.validationService.validate(MerchandiseValidation.SEARCH, request);

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

    const merchandises = await this.prismaService.merchandise.findMany({
      where: {
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.merchandise.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: merchandises.map((merchandise) =>
        this.toMerchandiseResponse(merchandise),
      ),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
