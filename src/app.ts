import 'reflect-metadata';

import express, { Application } from 'express';
import cors from 'cors';

class App {
  public express: Application;

  constructor() {
    this.express = express();

    this.boot = this.boot.bind(this);
  }

  async boot() {
    this.beforeMiddlewares();
    await this.routes();
    this.afterMiddlewares();

    return this.express;
  }

  beforeMiddlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  afterMiddlewares() { } // tslint:disable-line

  async routes() {
    const routes = await import('./routes');

    this.express.use(routes.default);
  }
}

const app = new App();
const { boot } = app;

export { boot };
