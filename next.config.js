require("dotenv").config();
const { sizes } = require("./src/blocks/Image/sizes");

module.exports = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  },
  images: {
    domains: [
      process.env.NEXT_LOCAL_DOMAIN
    ],
    deviceSizes: sizes,
  },
};
