import { Payload } from 'payload';
import { Media, Page, User } from '../../payload-types';
import { seedMedia } from './media';
import { seedPages } from './pages';
import { seedUsers } from './users';

export type SeededCollections = {
  media?: Media[];
  users?: User[];
  pages?: Page[];
}

export const seed = async (payload: Payload): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    payload.logger.info('Seeding database...');

    const collections: SeededCollections = {};

    collections.media = await seedMedia(payload);
    collections.users = await seedUsers(payload);
    collections.pages = await seedPages(payload, collections);

    payload.logger.info('Database Seeding Complete');
  } catch (err) {
    console.error(err);
    payload.logger.error('Error seeding database.');
  }
};
