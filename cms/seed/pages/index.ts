import { Payload } from 'payload';
import { SeedMedia } from '../types';
import { seedHomePage } from './home';
import { seedSamplePage } from './sample';

export const seedPages = async (payload: Payload, medias: SeedMedia): Promise<void> => {
  await seedHomePage(payload, medias);
  await seedSamplePage(payload, medias);

  payload.logger.info('Pages seeded.');
};
