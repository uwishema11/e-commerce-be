const redis = require('redis');
require('dotenv').config();

const { REDIS_URL } = process.env;
const redisClient = redis.createClient({ url: REDIS_URL });

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client connected'));
redisClient.on('end', () => console.log('Client disconnected from Redis...'));

redisClient.on('ready', () => {
  console.log('Client connected to Redis...');
});

module.exports = {
  setToken: async (key, value) => {
    try {
      const reply = await redisClient.set(key, value, 'EX', 60 * 60 * 24);
      return reply;
    } catch (err) {
      console.error('Error setting token:', err);
      throw err;
    }
  },

  deleteToken: async (key) => {
    try {
      const reply = await redisClient.get(key);
      return reply;
    } catch (err) {
      console.error('Error deleting token:', err);
      throw err;
    }
  },

  getToken: async (key) => {
    try {
      const reply = await redisClient.get(key);
      return reply;
    } catch (err) {
      console.error('Error getting token:', err);
      throw err;
    }
  },

  redisClient,
};
