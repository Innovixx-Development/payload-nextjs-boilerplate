import { CollectionConfig } from 'payload/types';

export const User: CollectionConfig = {
  slug: 'user',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
  },
  fields: [
  ],
};
