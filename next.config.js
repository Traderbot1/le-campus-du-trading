/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bunny embed + thumbnails
  images: { remotePatterns: [{ protocol: "https", hostname: "**.b-cdn.net" }] },
};
module.exports = nextConfig;
