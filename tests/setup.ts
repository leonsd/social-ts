import { createConnection } from 'typeorm';
import { boot } from '../src/app';

const setupConnection = async () => {
  const connection = await createConnection();

  return connection;
};

export { boot, setupConnection };
