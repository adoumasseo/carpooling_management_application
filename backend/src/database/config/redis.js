const redis = require('redis');

// Create Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
});

client.on('connect', () => {
  console.log('🟢 Connected to Redis');
});

client.on('error', (err) => {
  console.error('🔴 Redis error:', err);
});

// Connect to Redis
client.connect();

module.exports = client;
