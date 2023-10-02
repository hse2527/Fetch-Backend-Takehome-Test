/**
 * Jest test for points.ts
 * 
 * author: Seok-Hee Han
 */

import * as request from 'supertest';
import app from '../src/app';

describe('Points - add', () => {
  test('POST /add - Add points to payer', async () => {
    let res = await request(app)
      .post('/add')
      .send({
        payer: 'DANNON',
        points: 1000,
        timestamp: '2020-11-02T14:00:00Z'
      });
    expect(res.statusCode).toEqual(200);
   
    res = await request(app)
      .post('/add')
      .send({
        payer: 'UNILEVER',
        points: 200,
        timestamp: '2020-10-31T11:00:00Z'
      });
    expect(res.statusCode).toEqual(200);

    res = await request(app)
      .post('/add')
      .send({
        payer: 'MILLER COORS',
        points: 10000,
        timestamp: '2020-11-01T14:00:00Z'
      });
    expect(res.statusCode).toEqual(200);

    // no request body
    res = await request(app)
      .post('/add');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('No transaction found');

    // missing required fields
    res = await request(app)
      .post('/add')
      .send({
        payer: 'DANNON',
        points: 1000
      });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Missing required fields');

    // invalid data types
    res = await request(app)
      .post('/add')
      .send({
        payer: 'DANNON',
        points: '1000',
        timestamp: '2020-11-02T14:00:00Z'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Invalid data types');
  });
});

describe('Points - rest (tested add first)', () => {
  test('POST /spend - Spend points and return points spent per payer', async () => {
    let res = await request(app)
      .post('/spend')
      .send({
        points: 5000
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      UNILEVER: -200,
      'MILLER COORS': -4800
    });

    // overbalance
    res = await request(app)
      .post('/spend')
      .send({
        points: 1000000
      });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Not enough points');

    // no request body
    res = await request(app)
      .post('/spend');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('No points provided');

    // wrong data type
    res = await request(app)
      .post('/spend')
      .send({
        points: '5000'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Invalid data type');
  });

  test('GET /balance - Return points per payer', async () => {
    let res = await request(app)
      .get('/balance');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      DANNON: 1000,
      UNILEVER: 0,
      'MILLER COORS': 5200
    });
  });
});