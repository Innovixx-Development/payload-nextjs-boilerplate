/* eslint-disable no-console */
import path from 'path';
import { Payload } from 'payload';

const medias = [
  {
    fileName: 'payload.jpg',
    alt: 'Payload OG Image',
  },
];

export const seedMedia = async (payload: Payload): Promise<void> => {
  const existingMedia = await payload.find({
    collection: 'media',
  });

  if (existingMedia.docs.length === 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const media of medias) {
      // eslint-disable-next-line no-await-in-loop
      await payload.create({
        collection: 'media',
        data: {
          alt: media.alt,
        },
        filePath: path.resolve(__dirname, `./assets/${media.fileName}`),
      });
    }
    payload.logger.info('Media Seeded');
  }
};
