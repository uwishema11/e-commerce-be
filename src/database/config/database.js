import Sequelize from 'sequelize';
import config from './config.js';

const { development, test, production } = config;

let sequelizeConfig;

switch (process.env.NODE_ENV) {
  case 'development':
    sequelizeConfig = development;
    break;
  case 'test':
    sequelizeConfig = test;
    break;
  case 'production':
    sequelizeConfig = production;
    break;
  default:
    throw new Error(
      'Invalid NODE_ENV value. Supported values are development, test, and production.',
    );
}

const sequelize = new Sequelize(sequelizeConfig.url, sequelizeConfig);

export default sequelize;
