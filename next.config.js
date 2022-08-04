
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
        destination: `https://www.spadebeta.in/create/post/` // Proxy to Backend
      }
    ]
  },
}
