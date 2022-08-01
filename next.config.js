const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  // swcMinify: true, // ! Trial
  images: {
    domains: ['127.0.0.1'],
  },
  async rewrites() {
    return [
      {
        source: '/api/create/post',
        destination: 'http://127.0.0.1:8000/create/post/' // Proxy to Backend
      }
    ]
  },
  pwa: {
    dest: "public/static",
    disable: process.env.NODE_ENV === "development",
    register: true,
    sw: '/sw.js',
    skipWaiting: true,
  }
})
