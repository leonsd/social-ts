const path = require('path');

const databases = {
  development: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
  },
  test: {
    type: 'sqlite',
    database: `${path.resolve(__dirname, 'tests/database.sqlite')}`,
    logging: false,
  }
};

const database = databases[process.env.NODE_ENV];

module.exports = {
  ...database,
  entities: [
    "src/entities/**/*.ts"
  ],
  migrations: [
    "src/database/migrations/**/*.ts"
  ],
  subscribers: [
    "src/subscribers/**/*.ts"
  ],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/subscribers"
  }
}
