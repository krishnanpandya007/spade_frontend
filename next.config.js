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
        destination: 'http://127.0.0.1:8000/create/post/' // Proxy to Backend
      }
    ]
  }
}
