/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable production optimizations
  reactStrictMode: true,
  
  // Optimize bundle size
  swcMinify: true,
  
  // Reduce JavaScript payload
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
