import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
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

  describe('POST /api/memberships', () => {
    beforeEach(async () => {
      await testService.deleteAll();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/memberships')
        .send({
          title: '',
          description: '',
          price: -1,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create membership', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/memberships')
        .send({
          title: 'test',
          description: 'test',
          price: 100,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test');
      expect(response.body.data.price).toBe(100);
    });

    it('should be rejected if title already exists', async () => {
      await testService.createMembership();
      const response = await request(app.getHttpServer())
        .post('/api/memberships')
        .send({
          title: 'test',
          description: 'test',
          price: 100,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
