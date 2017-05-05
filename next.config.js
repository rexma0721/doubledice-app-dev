/** @type {import('next').NextConfig} */

const envVariables = {
  NETWORK_ID: process.env.NETWORK_ID,
  GRAPHQL_QUERIES_URL: process.env.GRAPHQL_QUERIES_URL,
  PLATFORM_CONTRACT_ADDRESS: process.env.PLATFORM_CONTRACT_ADDRESS,
  DISCORD_API_URL: process.env.DISCORD_API_URL,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  PINATA_URL: process.env.PINATA_URL,
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
  NEXT_PUBLIC_ENVIRONMENT_PHASE: process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE,
  NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
  INFURA_URL: process.env.INFURA_URL,
  INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET: process.env.INFURA_PROJECT_SECRET,
  IPFS_PROVIDER: process.env.IPFS_PROVIDER,
  CLOUDINARY_CLOUD: process.env.CLOUDINARY_CLOUD,
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  HONEYBADGER_API_KEY: process.env.HONEYBADGER_API_KEY,
  MAIN_URL: process.env.MAIN_URL,
  HEROKU_SLUG_COMMIT: process.env.HEROKU_SLUG_COMMIT,
  IMAGE_OPTIMIZATION_URL: process.env.IMAGE_OPTIMIZATION_URL,
  NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
  GOOGLE_AUTH_SCOPES_URL: process.env.GOOGLE_AUTH_SCOPES_URL,
  GOOGLE_SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID,
  GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
  GOOGLE_TYPE: process.env.GOOGLE_TYPE,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  GOOGLE_TOKEN_URL: process.env.GOOGLE_TOKEN_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  IPFS_GATEWAY: process.env.IPFS_GATEWAY,
};

const HoneybadgerSourceMapPlugin = require("@honeybadger-io/webpack");

const moduleConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: envVariables,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    removeConsole: true,
  },
  images: {
    domains: [
      "gateway.pinata.cloud",
      "asia.olympus-imaging.com",
      "ipfs.doubledice.com",
      "res.cloudinary.com",
      "via.placeholder.com",
      "upload.wikimedia.org",
      "ipfs.infura.io",
      "ipfs.ddvfs.com",
      "cryptologos.cc",
      "i.ibb.co",
    ],
  },
  webpack: (config, options) => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE === "production") {
      if (!options.isServer) {
        config.resolve.alias["honeybadger"] = "honeybadger-js";
      }
      config.devtool = "hidden-source-map";
      config.plugins.push(
        new HoneybadgerSourceMapPlugin({
          apiKey: process.env.HONEYBADGER_API_KEY,
          assetsUrl: `${process.env.MAIN_URL}/_next`,
          revision: process.env.HEROKU_SLUG_COMMIT,
        })
      );
    }
    return config;
  },
};

process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE === "production" &&
  (moduleConfig.images = {
    loader: "cloudinary",
    path: process.env.IMAGE_OPTIMIZATION_URL
  });

module.exports = moduleConfig;
