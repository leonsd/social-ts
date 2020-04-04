import './config/env';

import { createConnection } from 'typeorm';
import { boot } from './app';

const PORT = process.env.PORT || 3333;

createConnection().then(async connection => {
  const app = await boot();

  app.listen(PORT, () => {
    const { log } = console;
    log('App started in PORT ', PORT);
  });
});
