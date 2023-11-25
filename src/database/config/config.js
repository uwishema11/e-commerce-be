import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    url: process.env.DEV_DATABASE_URL,
    logging: false,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
