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
import { TrainingService } from './training.service';
import { WebResponse } from '../model/web.model';
import {
  SearchTrainingRequest,
  TrainingRequest,
  TrainingResponse,
} from '../model/training.model';

@Controller('/api/trainings')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() request: TrainingRequest,
  ): Promise<WebResponse<TrainingResponse>> {
    const result = await this.trainingService.create(request);
    return {
      data: result,
    };
  }

  @Get('/:trainingId')
  @HttpCode(200)
  async get(
    @Param('trainingId', ParseIntPipe) trainingId: number,
  ): Promise<WebResponse<TrainingResponse>> {
    const result = await this.trainingService.get(trainingId);
    return {
      data: result,
    };
  }

  @Put('/:trainingId')
  @HttpCode(200)
  async update(
    @Param('trainingId', ParseIntPipe) trainingId: number,
    @Body() request: TrainingRequest,
  ): Promise<WebResponse<TrainingResponse>> {
    const result = await this.trainingService.update(trainingId, request);
    return {
      data: result,
    };
  }

  @Delete('/:trainingId')
  @HttpCode(200)
  async remove(
    @Param('trainingId', ParseIntPipe) trainingId: number,
  ): Promise<WebResponse<boolean>> {
    await this.trainingService.remove(trainingId);
    return {
      data: true,
    };
  }

  // @Get()
  // @HttpCode(200)
  // async list(): Promise<WebResponse<TrainingResponse[]>> {
  //   const result = await this.trainingService.list();
  //   return {
  //     data: result,
  //   };
  // }

  @Get()
  @HttpCode(200)
  async search(
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('image') image?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<TrainingResponse[]>> {
    const request: SearchTrainingRequest = {
      title: title,
      description: description,
      image: image,
      page: page || 1,
      size: size || 10,
    };

    return this.trainingService.search(request);
  }
}
