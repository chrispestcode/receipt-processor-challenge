import request from 'supertest';
import { createClient } from 'redis';
import app, { cleanup } from '../index.js';

describe('Receipt API', () => {
    let redisClient;
    
    beforeAll(async () => {
        redisClient = createClient();
        redisClient.on('error', err => console.error('Redis Client Error', err));
        await redisClient.connect();
    });

    afterAll(async () => {
        await redisClient.flushAll();
        await redisClient.quit();
        await cleanup();
    });

    beforeEach(async () => {
        await redisClient.flushAll();
    });

    const validReceipt = {
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
            {
                "shortDescription": "Mountain Dew 12PK",
                "price": "6.49"
            }
        ],
        "total": "6.49"
    };

    describe('POST /receipts/process', () => {
        it('should process a valid receipt and return an id', async () => {
            const response = await request(app)
                .post('/receipts/process')
                .send(validReceipt);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(typeof response.body.id).toBe('number');
        });

        it('should return 400 for invalid receipt', async () => {
            const invalidReceipt = { ...validReceipt, retailer: '' };
            
            const response = await request(app)
                .post('/receipts/process')
                .send(invalidReceipt);

            expect(response.status).toBe(400);
        });
    });

    describe('GET /receipts/:id/points', () => {
        it('should return points for a valid receipt id', async () => {

            const setupResponse = await request(app)
                .post('/receipts/process')
                .send(validReceipt);

            const { id } = setupResponse.body;
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const pointsResponse = await request(app)
                .get(`/receipts/${id}/points`);

            expect(pointsResponse.status).toBe(200);
            expect(pointsResponse.body).toHaveProperty('points');
            expect(typeof pointsResponse.body.points).toBe('number');
        }, 5000);

        it('should return 404 for non-existent receipt id', async () => {
            const response = await request(app)
                .get('/receipts/nonexistent-id/points');

            expect(response.status).toBe(404);
        });
    });
});