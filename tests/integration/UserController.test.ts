import { Application } from 'express';
import { Connection } from 'typeorm';
import request from 'supertest';
import { boot, setupConnection } from '../setup';

describe('UserController', () => {
  let app: Application;
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupConnection();
    app = await boot();
  });

  afterAll(() => {
    connection.close();
  });

  it('should list users and respond with status 200', async () => {
    const response = await request(app)
      .get('/users');

    expect(response.status).toBe(200);
  });

  it('should register user and respond with status 201', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'leon.sdsilva1@gmail.com',
        password: '123456'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });
});
