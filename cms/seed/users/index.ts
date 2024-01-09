/* eslint-disable no-console */
import { Payload } from 'payload';
import { User } from '../../../payload-types';

const users = [
  {
    email: 'admin@innovixx.co.uk',
    password: 'Pa$$w0rd!',
  },
];

export const seedUsers = async (payload: Payload): Promise<User[]> => {
  await Promise.all(
    users.map(async (user) => {
      await payload.create({
        collection: 'user',
        data: {
          email: user.email,
          password: user.password,
        },
      });
    }),
  );

  payload.logger.info('Users seeded.');

  return payload.find({
    collection: 'user',
  }).then((res) => res.docs);
};
