import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('MerchandiseController', () => {
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

  describe('POST /api/merchandises', () => {
    beforeEach(async () => {
      await testService.deleteAll();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/merchandises')
        .send({
          title: '',
          description: '',
          price: -1,
          stock: -1,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create merchandise', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/merchandises')
        .send({
          title: 'test',
          description: 'test',
          price: 100,
          stock: 100,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test');
      expect(response.body.data.price).toBe(100);
      expect(response.body.data.stock).toBe(100);
    });

    it('should be rejected if title already exists', async () => {
      await testService.createMerchandise();
      const response = await request(app.getHttpServer())
        .post('/api/merchandises')
        .send({
          title: 'test',
          description: 'test',
          price: 100,
          stock: 100,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/merchandises/:merchandiseId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMerchandise();
    });

    it('should be able to get merchandise', async () => {
      const merchandise = await testService.getMerchandise();
      const response = await request(app.getHttpServer())
        .get(`/api/merchandises/${merchandise.id}`)
        .send({
          title: 'test',
          description: 'test',
          price: 100,
          stock: 100,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test');
      expect(response.body.data.price).toBe(100);
      expect(response.body.data.stock).toBe(100);
    });
  });

  describe('PUT /api/merchandises/:merchandiseId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMerchandise();
    });

    it('should be rejected if request is invalid', async () => {
      const merchandise = await testService.getMerchandise();
      const response = await request(app.getHttpServer())
        .put(`/api/merchandises/${merchandise.id}`)
        .send({
          title: '',
          description: '',
          price: -1,
          stock: -1,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if merchandise is not found', async () => {
      const merchandise = await testService.getMerchandise();
      const response = await request(app.getHttpServer())
        .put(`/api/merchandises/${merchandise.id + 1}`)
        .send({
          title: 'test updated',
          description: 'test updated',
          price: 100,
          stock: 100,
        });

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to update merchandise', async () => {
      const merchandise = await testService.getMerchandise();
      const response = await request(app.getHttpServer())
        .put(`/api/merchandises/${merchandise.id}`)
        .send({
          title: 'test',
          description: 'test updated',
          price: 100,
          stock: 100,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.title).toBe('test');
      expect(response.body.data.description).toBe('test updated');
      expect(response.body.data.price).toBe(100);
      expect(response.body.data.stock).toBe(100);
    });
  });

  describe('DELETE /api/merchandises/:merchandiseId', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMerchandise();
    });

    it('should be rejected if merchandise is not found', async () => {
      const merchandise = await testService.getMerchandise();
      const response = await request(app.getHttpServer()).delete(
        `/api/merchandises/${merchandise.id + 1}`,
      );

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to remove merchandise', async () => {
      const merchandise = await testService.getMerchandise();
      const response = await request(app.getHttpServer()).delete(
        `/api/merchandises/${merchandise.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });

  // describe('GET /api/merchandises', () => {
  //   beforeEach(async () => {
  //     await testService.deleteAll();
  //     await testService.createMerchandise();
  //   });

  //   it('should be able to list merchandise', async () => {
  //     const response = await request(app.getHttpServer()).get(
  //       `/api/merchandises`,
  //     );

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.length).toBe(1);
  //     expect(response.body.data[0].title).toBe('test');
  //     expect(response.body.data[0].description).toBe('test');
  //     expect(response.body.data[0].price).toBe(100);
  //     expect(response.body.data[0].stock).toBe(100);
  //   });
  // });
  describe('GET /api/merchandises', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createMerchandise();
    });

    it('should be able to search merchandise', async () => {
      const response = await request(app.getHttpServer()).get(
        `/api/merchandises`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search merchandise by title', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/merchandises`)
        .query({
          title: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search merchandise by title not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/merchandises`)
        .query({
          title: 'wrong',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search merchandise by description', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/merchandises`)
        .query({
          description: 'test',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search merchandise by description not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/merchandises`)
        .query({
          description: 'wrong',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    // it('should be able to search merchandise by price', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get(`/api/merchandises`)
    //     .query({
    //       price: 1,

    //     });

    //   expect(response.status).toBe(200);
    //   expect(response.body.data.length).toBe(1);
    // });

    // it('should be able to search merchandise by price not found', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get(`/api/merchandises`)
    //     .query({
    //       price: 111
    //     });

    //   expect(response.status).toBe(200);
    //   expect(response.body.data.length).toBe(0);
    // });

    it('should be able to search merchandise with page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/merchandises`)
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
