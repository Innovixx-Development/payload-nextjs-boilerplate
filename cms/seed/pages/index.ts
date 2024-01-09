import { Payload } from 'payload';
import { seedHomePage } from './home';
import { seedSamplePage } from './sample';
import { SeededCollections } from '..';
import { Page } from '../../../payload-types';

export const seedPages = async (payload: Payload, collections: SeededCollections): Promise<Page[]> => {
  await seedHomePage(payload, collections);
  await seedSamplePage(payload, collections);

  payload.logger.info('Pages seeded.');

  return payload.find({
    collection: 'page',
  }).then((res) => res.docs);
};
