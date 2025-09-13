/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fictilecore.com', 'localhost', '143.244.142.60'], // add all domains here
  },
};

module.exports = nextConfig;
