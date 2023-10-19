require('dotenv').config();
const ContentSecurityPolicy = require('./csp');


module.exports = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  images: {
    domains: [
      new URL(process.env.NEXT_PUBLIC_SERVER_URL).hostname,
    ],
  },
  async headers() {
    const headers = [];
    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    });

    return headers;
  },
  pageExtensions: ['tsx', 'js'],
};
