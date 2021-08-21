require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectPostgres } from './app/common/postgres';

// Start server
try {
  const app = express();
  const port = parseInt(process.env.NODE_PORT, 10) || 3000;

  app.set('port', port);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  const init = async () => {
    await connectPostgres();

    app.listen(port, () => {
      console.log('API Server is running on port ' + port);
    });
  };

  init();
} catch (e) {
  console.log(`Can't start API Server`, e);
}
