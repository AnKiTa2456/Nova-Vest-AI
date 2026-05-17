/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
  },
  // Proxy all /api/* requests to the backend.
  // This works in both development and production (Vercel).
  // Cookies set by the backend are forwarded and stored under the frontend domain,
  // eliminating cross-origin cookie issues entirely.
  async rewrites() {
    const backendUrl = process.env.API_URL ?? 'http://localhost:4000'
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
