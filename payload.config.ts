import dotenv from 'dotenv';
import { buildConfig } from 'payload/config';
import { Media, Page, User } from './cms/collections';
import { seed } from './cms/seed';

dotenv.config();

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [Page, Media, User],

  onInit: async (payload) => {
    if (
      process.env.NODE_ENV === 'development'
      && (process.env.PAYLOAD_SEED_DATABASE)
    ) {
      await seed(payload);
    }
  },

  indexSortableFields: true,
});
