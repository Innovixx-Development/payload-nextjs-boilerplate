/* eslint-disable no-console */
import { Payload } from 'payload';

const users = [
  {
    email: 'admin@innovixx.co.uk',
    password: 'Pa$$w0rd!',
  },
];

export const seedUsers = async (payload: Payload): Promise<void> => {
  const user = await payload.find({
    collection: 'user',
    where: {
      email: {
        in: users.map((u) => u.email),
      },
    },
  });

  if (user.docs.length === 0) {
    // eslint-disable-next-line no-shadow, no-restricted-syntax
    for (const user of users) {
      // eslint-disable-next-line no-await-in-loop
      await payload.create({
        collection: 'user',
        data: {
          email: user.email,
          password: user.password,
        },
      });
    }
    payload.logger.info('Users seeded.');
  }
};
