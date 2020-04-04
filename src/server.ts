import './config/env';

import { createConnection } from 'typeorm';
import { boot } from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 3333;

createConnection().then(async connection => {
  const app = await boot();

  app.listen(PORT, () => {
    logger.log('App started in PORT', PORT);
  });
});
