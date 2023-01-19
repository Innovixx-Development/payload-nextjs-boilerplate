import { Payload } from 'payload';
import { seedMedia } from './media';
import { seedPages } from './pages';
import { seedUsers } from './users';

export const seed = async (payload: Payload): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    payload.logger.info('Seeding database...');

    await seedMedia(payload);

    const medias = [];
    const pages = [];


    const imageReq = await payload.find({
      collection: 'media',
      limit: 100,
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const image of imageReq.docs) {
      medias.push({
        id: image.id,
        filename: image.filename,
      });
    }

    await seedUsers(payload);

    await seedPages(payload, medias);
    const pageReq = await payload.find({
      collection: 'page',
      limit: 100,
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const page of pageReq.docs) {
      pages.push({
        id: page.id,
        slug: page.slug,
      });
    }

    payload.logger.info('Database Seeding Complete');
  } catch (err) {
    console.error(err);
    payload.logger.error('Error seeding database.');
  }
};
