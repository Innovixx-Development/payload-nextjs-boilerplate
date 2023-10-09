import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { Media, Page, User } from './cms/collections';
import { seed } from './cms/seed';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  admin: {
    user: User.slug,
    bundler: webpackBundler(),
    css: path.resolve(__dirname, '/cms/styles/custom.scss'),
  },

  routes: {
    admin: '/admin',
  },

  db: mongooseAdapter({
    url: process.env.MONGO_URL,
  }),
  indexSortableFields: true,

  editor: lexicalEditor({}),

  collections: [Page, Media, User],

  onInit: async (payload) => {
    if (
      process.env.NODE_ENV === 'development'
      && (process.env.PAYLOAD_SEED_DATABASE)
    ) {
      await seed(payload);
    }
  },
});
