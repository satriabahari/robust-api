import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('TrainingController', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testService = app.get(TestService);
  });

  describe('POST /api/trainings', () => {
    beforeEach(async () => {
      await testService.deleteAll();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/trainings')
        .send({
          title: '',
          description: '',
          image: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create training', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/trainings')
        .send({
          title: 'test',
          description: 'test',
          image: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test');
      expect(response.body.data.image).toBe('test');
    });

    it('should be rejected if title already exists', async () => {
      await testService.createTraining();
      const response = await request(app.getHttpServer())
        .post('/api/trainings')
        .send({
          title: 'test',
          description: 'test',
          image: 'test',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/trainings/:trainingId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createTraining();
    });

    it('should be able to get training', async () => {
      const training = await testService.getTraining();
      const response = await request(app.getHttpServer())
        .get(`/api/trainings/${training.id}`)
        .send({
          title: 'test',
          description: 'test',
          image: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test');
      expect(response.body.data.image).toBe('test');
    });
  });

  describe('PUT /api/trainings/:trainingId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createTraining();
    });

    it('should be rejected if request is invalid', async () => {
      const training = await testService.getTraining();
      const response = await request(app.getHttpServer())
        .put(`/api/trainings/${training.id}`)
        .send({
          title: '',
          description: '',
          image: '',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if training is not found', async () => {
      const training = await testService.getTraining();
      const response = await request(app.getHttpServer())
        .put(`/api/trainings/${training.id + 1}`)
        .send({
          title: 'test updated',
          description: 'test updated',
          image: 'test updated',
        });

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to update training', async () => {
      const training = await testService.getTraining();
      const response = await request(app.getHttpServer())
        .put(`/api/trainings/${training.id}`)
        .send({
          title: 'test',
          description: 'test updated',
          image: 'test updated',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test updated');
      expect(response.body.data.image).toBe('test updated');
    });
  });

  describe('DELETE /api/trainings/:trainingId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createTraining();
    });

    it('should be rejected if training is not found', async () => {
      const training = await testService.getTraining();
      const response = await request(app.getHttpServer()).delete(
        `/api/trainings/${training.id + 1}`,
      );

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to remove training', async () => {
      const training = await testService.getTraining();
      const response = await request(app.getHttpServer()).delete(
        `/api/trainings/${training.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });

  // describe('GET /api/trainings', () => {
  //   beforeEach(async () => {
  //     await testService.deleteAll();
  //     await testService.createTraining();
  //   });

  //   it('should be able to list training', async () => {
  //     const response = await request(app.getHttpServer()).get(
  //       `/api/trainings`,
  //     );

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.length).toBe(1);
  //     expect(response.body.data[0].title).toBe('test');
  //     expect(response.body.data[0].description).toBe('test');
  //     expect(response.body.data[0].image).toBe('test');
  //   });
  // });
  describe('GET /api/trainings', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createTraining();
    });

    it('should be able to search training', async () => {
      const response = await request(app.getHttpServer()).get(`/api/trainings`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search training by title', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/trainings`)
        .query({
          title: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search training by title not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/trainings`)
        .query({
          title: 'wrong',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search training by description', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/trainings`)
        .query({
          description: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search training by description not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/trainings`)
        .query({
          description: 'wrong',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    // it('should be able to search training by image', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get(`/api/trainings`)
    //     .query({
    //       image: 1,
    //     });

    //   expect(response.status).toBe(200);
    //   expect(response.body.data.length).toBe(1);
    // });

    // it('should be able to search training by image not found', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get(`/api/trainings`)
    //     .query({
    //       image: 1111,
    //     });

    //   expect(response.status).toBe(200);
    //   expect(response.body.data.length).toBe(0);
    // });

    it('should be able to search training with page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/trainings`)
        .query({
          size: 1,
          page: 2,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(2);
      expect(response.body.paging.total_page).toBe(1);
      expect(response.body.paging.size).toBe(1);
    });
  });
});
