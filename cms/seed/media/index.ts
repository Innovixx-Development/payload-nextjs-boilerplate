import path from 'path';
import { Payload } from 'payload';
import { Media } from '../../../payload-types';

const medias = [
  {
    fileName: 'payload.jpg',
    alt: 'Payload OG Image',
  },
];

export const seedMedia = async (payload: Payload): Promise<Media[]> => {
  await Promise.all(
    medias.map(async (media) => {
      await payload.create({
        collection: 'media',
        data: {
          alt: media.alt,
        },
        filePath: path.resolve(__dirname, `./assets/${media.fileName}`),
      });
    }),
  );

  payload.logger.info('Media Seeded');

  return payload.find({
    collection: 'media',
  }).then((res) => res.docs);
};
