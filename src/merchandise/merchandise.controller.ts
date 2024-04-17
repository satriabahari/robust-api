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
import { WebResponse } from '../model/web.model';
import { MerchandiseService } from './merchandise.service';
import {
  MerchandiseRequest,
  MerchandiseResponse,
  SearchMerchandiseRequest,
} from '../model/merchandise.model';

@Controller('/api/merchandises')
export class MerchandiseController {
  constructor(private merchandiseService: MerchandiseService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() request: MerchandiseRequest,
  ): Promise<WebResponse<MerchandiseResponse>> {
    const result = await this.merchandiseService.create(request);
    return {
      data: result,
    };
  }

  @Get('/:merchandiseId')
  @HttpCode(200)
  async get(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
  ): Promise<WebResponse<MerchandiseResponse>> {
    const result = await this.merchandiseService.get(merchandiseId);
    return {
      data: result,
    };
  }

  @Put('/:merchandiseId')
  @HttpCode(200)
  async update(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
    @Body() request: MerchandiseRequest,
  ): Promise<WebResponse<MerchandiseResponse>> {
    const result = await this.merchandiseService.update(merchandiseId, request);
    return {
      data: result,
    };
  }

  @Delete('/:merchandiseId')
  @HttpCode(200)
  async remove(
    @Param('merchandiseId', ParseIntPipe) merchandiseId: number,
  ): Promise<WebResponse<boolean>> {
    await this.merchandiseService.remove(merchandiseId);
    return {
      data: true,
    };
  }

  // @Get()
  // @HttpCode(200)
  // async list(): Promise<WebResponse<MerchandiseResponse[]>> {
  //   const result = await this.merchandiseService.list();
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
    @Query('stock', new ParseIntPipe({ optional: true })) stock?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<MerchandiseResponse[]>> {
    const request: SearchMerchandiseRequest = {
      title: title,
      description: description,
      price: price,
      stock: stock,
      page: page || 1,
      size: size || 10,
    };

    return this.merchandiseService.search(request);
  }
}
