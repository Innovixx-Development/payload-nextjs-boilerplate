import { Payload } from 'payload';
import { SeedMedia } from '../../types';
import pageData from './data.json';

export const seedSamplePage = async (payload: Payload, medias: SeedMedia): Promise<void> => {
  let data = JSON.stringify(pageData);

  data = data.replace(/{{PAYLOAD_OG_IMAGE}}/g, medias.find((media) => media.filename === 'payload.jpg')?.id);

  await payload.create({
    collection: 'page',
    data: JSON.parse(data),
  });

  payload.logger.info('Sample Page seeded.');
};
