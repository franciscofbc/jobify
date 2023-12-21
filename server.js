import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'data received', data: req.body });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on port ${port}...`);
});
