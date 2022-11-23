const withPWA = require('next-pwa')({
  dest: 'public'
})

nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // ! Trial
  images: {
    domains: ['127.0.0.1', 'core.backend-61489.spadebeta.in'],
  },
  async redirects() {

    // ! IN_MAINTANANCE

    return [
      {
        source: "/((?!maintenance).*)",
        destination: "/maintenance.html",
        permanent: false, 
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
