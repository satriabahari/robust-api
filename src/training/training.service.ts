import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  TrainingRequest,
  SearchTrainingRequest,
  TrainingResponse,
} from '../model/training.model';
import { TrainingValidation } from './training.validation';
import { Training } from '@prisma/client';
import { WebResponse } from '../model/web.model';

@Injectable()
export class TrainingService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(request: TrainingRequest): Promise<TrainingResponse> {
    const trainingRequest: TrainingRequest = this.validationService.validate(
      TrainingValidation.CREATE,
      request,
    );

    const totalTrainingWithSameTitle = await this.prismaService.training.count({
      where: {
        title: trainingRequest.title,
      },
    });

    if (totalTrainingWithSameTitle != 0) {
      throw new HttpException('Title already exists', 400);
    }

    const training = await this.prismaService.training.create({
      data: trainingRequest,
    });

    return this.toTrainingResponse(training);
  }

  toTrainingResponse(training: Training): TrainingResponse {
    return {
      id: training.id,
      title: training.title,
      description: training.description,
      image: training.image,
    };
  }

  async checkTrainingMustExist(trainingId: number): Promise<Training> {
    const training = await this.prismaService.training.findFirst({
      where: {
        id: trainingId,
      },
    });

    if (!training) {
      throw new HttpException('Training is not found', 404);
    }

    return training;
  }

  async get(trainingId: number): Promise<TrainingResponse> {
    const trainnig = await this.checkTrainingMustExist(trainingId);

    return this.toTrainingResponse(trainnig);
  }

  async update(
    trainingId: number,
    request: TrainingRequest,
  ): Promise<TrainingResponse> {
    const updateRequest: TrainingRequest =
      await this.validationService.validate(TrainingValidation.UPDATE, request);

    let training = await this.checkTrainingMustExist(trainingId);

    training = await this.prismaService.training.update({
      where: {
        id: trainingId,
      },
      data: updateRequest,
    });

    return this.toTrainingResponse(training);
  }

  async remove(trainingId: number): Promise<TrainingResponse> {
    await this.checkTrainingMustExist(trainingId);

    const membership = await this.prismaService.training.delete({
      where: {
        id: trainingId,
      },
    });

    return this.toTrainingResponse(membership);
  }

  async list(): Promise<TrainingResponse[]> {
    const memberships = await this.prismaService.training.findMany();

    return memberships.map((training) => this.toTrainingResponse(training));
  }

  async search(
    request: SearchTrainingRequest,
  ): Promise<WebResponse<TrainingResponse[]>> {
    const searchRequest: SearchTrainingRequest =
      this.validationService.validate(TrainingValidation.SEARCH, request);

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

    if (searchRequest.image) {
      filters.push({
        image: {
          contains: searchRequest.image,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const trainings = await this.prismaService.training.findMany({
      where: {
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.training.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: trainings.map((training) => this.toTrainingResponse(training)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
