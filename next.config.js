require('dotenv').config();
const { sizes } = require('./src/blocks/Image/sizes');

module.exports = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  images: {
    domains: [
      '127.0.0.1',
      'localhost',
    ],
    deviceSizes: sizes,
  },
  pageExtensions: ['tsx', 'js'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};
