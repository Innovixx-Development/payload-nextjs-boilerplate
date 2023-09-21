/* eslint-disable no-console */
import path from 'path';
import next from 'next';
import nextBuild from 'next/dist/build';
import express from 'express';
import payload from 'payload';
import { config as dotenv } from 'dotenv';

dotenv();

const dev = process.env.NODE_ENV !== 'production';
const server = express();

if (!process.env.PAYLOAD_SECRET_KEY || !process.env.MONGO_URL) {
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
      ...(
        process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && {
          email: {
            transportOptions: {
              host: process.env.SMTP_HOST,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
              port: process.env.SMTP_PORT || 587,
            },
            fromName: 'Payload CMS',
            fromAddress: process.env.FROM_EMAIL || 'service@innovixx.co.uk',
          },
        }
      ),
    });
  } catch (err) {
    console.log(err);
  }

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev });

    const nextHandler = nextApp.getRequestHandler();

    if (dev) {
      server.get('/sandbox', (_, res) => {
        res.sendFile(path.join(__dirname, './server/sandbox.html'));
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
      await nextBuild(process.cwd(), false, true, true, false, false, false, null, 'default');
      process.exit();
    });
  }
};

start();
