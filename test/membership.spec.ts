import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('MembershipController', () => {
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

  describe('GET /api/memberships/:membershipId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMembership();
    });

    it('should be able to get membership', async () => {
      const membership = await testService.getMembership();
      const response = await request(app.getHttpServer())
        .get(`/api/memberships/${membership.id}`)
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
  });

  describe('PUT /api/memberships/:membershipId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMembership();
    });

    it('should be rejected if request is invalid', async () => {
      const membership = await testService.getMembership();
      const response = await request(app.getHttpServer())
        .put(`/api/memberships/${membership.id}`)
        .send({
          title: '',
          description: '',
          price: -1,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if membership is not found', async () => {
      const membership = await testService.getMembership();
      const response = await request(app.getHttpServer())
        .put(`/api/memberships/${membership.id + 1}`)
        .send({
          title: 'test updated',
          description: 'test updated',
          price: 10000,
        });

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to update membership', async () => {
      const membership = await testService.getMembership();
      const response = await request(app.getHttpServer())
        .put(`/api/memberships/${membership.id}`)
        .send({
          title: 'test',
          description: 'test updated',
          price: 10000,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test updated');
      expect(response.body.data.price).toBe(10000);
    });
  });

  describe('DELETE /api/memberships/:membershipId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMembership();
    });

    it('should be rejected if membership is not found', async () => {
      const membership = await testService.getMembership();
      const response = await request(app.getHttpServer()).delete(
        `/api/memberships/${membership.id + 1}`,
      );

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to remove membership', async () => {
      const membership = await testService.getMembership();
      const response = await request(app.getHttpServer()).delete(
        `/api/memberships/${membership.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });

  // describe('GET /api/memberships', () => {
  //   beforeEach(async () => {
  //     await testService.deleteAll();
  //     await testService.createMembership();
  //   });

  //   it('should be able to list membership', async () => {
  //     const response = await request(app.getHttpServer()).get(
  //       `/api/memberships`,
  //     );

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.length).toBe(1);
  //     expect(response.body.data[0].title).toBe('test');
  //     expect(response.body.data[0].description).toBe('test');
  //     expect(response.body.data[0].price).toBe(100);
  //   });
  // });
  describe('GET /api/memberships', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMembership();
    });

    it('should be able to search membership', async () => {
      const response = await request(app.getHttpServer()).get(
        `/api/memberships`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search membership by title', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/memberships`)
        .query({
          title: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search membership by title not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/memberships`)
        .query({
          title: 'wrong',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search membership by description', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/memberships`)
        .query({
          description: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search membership by description not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/memberships`)
        .query({
          description: 'wrong',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    // it('should be able to search membership by price', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get(`/api/memberships`)
    //     .query({
    //       price: 1,
    //     });

    //   expect(response.status).toBe(200);
    //   expect(response.body.data.length).toBe(1);
    // });

    // it('should be able to search membership by price not found', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get(`/api/memberships`)
    //     .query({
    //       price: 1111,
    //     });

    //   expect(response.status).toBe(200);
    //   expect(response.body.data.length).toBe(0);
    // });

    it('should be able to search membership with page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/memberships`)
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
