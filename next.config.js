const { BACKEND_ROOT_URL } = require('./config')

module.exports = {
  reactStrictMode: true,
  // swcMinify: true, // ! Trial
  images: {
    domains: ['127.0.0.1'],
  },
  async rewrites() {
    return [
      {
        source: '/api/create/post',
        destination: `${BACKEND_ROOT_URL}create/post/` // Proxy to Backend
      }
    ]
  },
}
