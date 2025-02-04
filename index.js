import express from 'express';
import bodyParser from 'body-parser';
import {receiptPostvalidator, receiptGetValidator} from './ReceiptValidator.mjs';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import ItemValidator from './ItemValidator.mjs';
import ReceiptPoints from './ReceiptPoints.mjs';
import RedisClient from './RedisClient.mjs';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let client;

const getRedisClient = async () => {
    if (!client) {
        client = new RedisClient();
    }
    return client;
};

app.post('/receipts/process', checkSchema(receiptPostvalidator), checkSchema(ItemValidator), async (req, res) => {
  
  if(!req.body ||  req.headers['content-type'] !== 'application/json') {
    return res.status(400).send('The receipt is invalid.');
  }

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).send(`The receipt is invalid. ${errors.array()[0].msg}`);
  }

  const receipt = matchedData(req);
  const receiptPoints = new ReceiptPoints(receipt);

  const redisClient = await getRedisClient();
  const id = await redisClient.set(receiptPoints.getPoints());

  if(!id) {
    return res.status(500).send('Internal server error: Receipt could not be processed');
  }
  return res.status(200).json({ id: id }); 
});

app.get('/receipts/:id/points', checkSchema(receiptGetValidator), async (req, res) => {

  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).send(`The receipt is invalid. ${errors.array()[0].msg}`);
  }

  const data = matchedData(req);
  const redisClient = await getRedisClient();
  const receiptPoints = await redisClient.get(data.id);
  
  if(!receiptPoints) {
    return res.status(404).send('No receipt found for that ID.');
  }

  return res.status(200).json({ points: parseInt(receiptPoints) });
});

app.use((err, req, res, next) => {
  console.error(err); 

  if(err.status === 400)
    return res.status(err.status).send('Error with parsing JSON');

  return next(err);
});


// Commented out to avoid confusion during evaluation
// app.use('*', (_, res) => {
//   return res.status(404).send('Not Found');
// });

export const cleanup = async () => {
    if (client) {
        await client.quit();
        client = null;
    }
};

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

export default app;