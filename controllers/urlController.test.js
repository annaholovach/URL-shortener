const request = require('supertest');
const app = require('../index');  
const urlService = require('../service/urlService');
const redis = require('redis-mock');
const SequelizeMock = require('sequelize-mock');

jest.mock('../service/urlService');

jest.mock('redis', () => ({
    createClient: jest.fn(() => ({
      on: jest.fn(),
      SET: jest.fn(() => Promise.resolve('OK')), 
      GET: jest.fn(() => Promise.resolve('some_value')), 
      quit: jest.fn(() => Promise.resolve()),
    })),
  }));

let mockRedisClient;

beforeAll(() => {
    mockRedisClient = redis.createClient();
    return mockRedisClient;
});
  
afterAll(() => {
    return new Promise((resolve, reject) => {
        mockRedisClient.quit((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
});

describe('UrlController Tests', () => {
  
  describe('POST /url/shorten', () => {
    it('should create a new URL and return it', async () => {
      const mockUrl = { longUrl: 'http://longurl.com' };

      urlService.createUrl.mockResolvedValue(mockUrl);

      const response = await request(app)
        .post('/url/shorten')
        .send({ longUrl: 'http://longurl.com' });

      expect(response.status).toBe(200);
      expect(urlService.createUrl).toHaveBeenCalledWith('http://longurl.com');
    });
  });

  describe('GET /:urlCode', () => {
    it('should redirect to the correct URL', async () => {
      const mockUrl = 'http://longurl.com';
      const urlCode = 'abc123';

      urlService.getUrl.mockResolvedValue(mockUrl);

      const response = await request(app)
        .get(`/${urlCode}`);

      expect(response.status).toBe(302);  
      expect(response.header.location).toBe(mockUrl);
      expect(urlService.getUrl).toHaveBeenCalledWith(urlCode);
    });

    it('should return 404 if the URL code is not found', async () => {
      const urlCode = 'nonexistent';

      urlService.getUrl.mockRejectedValue(new Error('such url does not exist'));

      const response = await request(app)
        .get(`/${urlCode}`);

      expect(response.body).toBe('such url does not exist');
    });
  });
});
