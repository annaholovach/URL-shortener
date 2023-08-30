const redis = require('redis');
const {promisify} = require('util')

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on('connect', async () => console.log('redis connected'))
client.on('error', (err) => {
    console.error('Ошибка подключения к Redis:', err);
});

const SET_ASYNC = promisify(client.SET).bind(client)
const GET_ASYNC = promisify(client.GET).bind(client)

module.exports = {
    SET_ASYNC,
    GET_ASYNC
}