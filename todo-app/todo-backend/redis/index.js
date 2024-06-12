const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })

  client.on('connect', () => {
    console.log('Redis connection established');
  });

  client.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
  
  setAsync = promisify(client.set).bind(client)   
  getAsync = promisify(client.get).bind(client)
}

module.exports = {
  getAsync,
  setAsync
}