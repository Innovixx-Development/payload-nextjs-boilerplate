/* eslint-disable no-console */
import path from 'path';
import next from 'next';
import nextBuild from 'next/dist/build';
import express from 'express';
import payload from 'payload';
import { config as dotenv } from 'dotenv';

dotenv({
  path: path.resolve(__dirname, '../.env'),
});

const dev = process.env.NODE_ENV !== 'production';
const server = express();

try {
  if (!process.env.PAYLOAD_SECRET_KEY || !process.env.MONGO_URL) {
    console.log(
      'Payload secret key or Mongo URL not found. Please check your .env file.',
    );
  }
} catch (error) {
  console.log(
    'Payload secret key or Mongo URL not found. Please check your .env file.',
  );
}

const start = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET_KEY,
      mongoURL: process.env.MONGO_URL,
      express: server,
    });
  } catch (err) {
    throw new Error(err);
  }

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev });

    const nextHandler = nextApp.getRequestHandler();

    if (dev) {
      server.get('/sandbox', (_, res) => {
        res.sendFile(path.join(__dirname, './sandbox.html'));
      });
    }

    server.get('*', (req, res) => nextHandler(req, res));

    nextApp.prepare().then(() => {
      console.log('NextJS started');

      server.listen(process.env.PORT, async () => {
        console.log(`Server listening on ${process.env.PORT}...`);
      });
    });
  } else {
    server.listen(process.env.PORT, async () => {
      console.log('NextJS is now building...');
      await nextBuild(path.join(__dirname, '../'));
      process.exit();
    });
  }
};

start();
