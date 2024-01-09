import { Payload } from 'payload';
import pageData from './data.json';
import { SeededCollections } from '../..';

export const seedSamplePage = async (payload: Payload, collections: SeededCollections): Promise<void> => {
  let data = JSON.stringify(pageData);

  data = data.replace(/{{PAYLOAD_OG_IMAGE}}/g, collections.media?.find((media) => media.filename === 'payload.jpg')?.id);

  await payload.create({
    collection: 'page',
    data: JSON.parse(data),
  });
};
