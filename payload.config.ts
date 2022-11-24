import dotenv from 'dotenv';
import { buildConfig } from 'payload/config';
import { Media, Page } from './cms/collections';

dotenv.config();

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [Page, Media],
});
