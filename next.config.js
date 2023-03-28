/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        pathname: '/image/upload/**'
      },
      {
        protocol: 'https',
        hostname: 'awsimages.detik.net.id',
        pathname: '/community/media/visual/**'
      }
    ]
  }
}

module.exports = nextConfig
