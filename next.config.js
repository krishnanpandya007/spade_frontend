const { SITE_IN_MAINTENANCE } = require('./config')

const withPWA = require('next-pwa')({
  dest: 'public'
})



nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true, // ! Trial
  images: {
    domains: ['127.0.0.1', 'core.backend-61489.spadebeta.in'],
  },
  async redirects() {

    // ! IN_MAINTANANCE

    return [
      {
        source: SITE_IN_MAINTENANCE ? "/((?!maintenance).*)" : "/maintanance.html",
        destination: SITE_IN_MAINTENANCE ? "/maintenance.html" : "/",
        permanent: false, 
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
