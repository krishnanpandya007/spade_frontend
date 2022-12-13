const SITE_IN_MAINTENANCE = false;
const withPWA = require('next-pwa')({
  dest: 'public'
})



nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true, // ! Trial
  images: {
    domains: ['127.0.0.1', 'core.backend-61489.spadebeta.in', 'images.unsplash.com'],
  },
  async redirects() {

    return [
      {
        source: SITE_IN_MAINTENANCE ? "/((?!maintenance).*)" : "/maintanance.html",
        destination: SITE_IN_MAINTENANCE ? "/maintenance.html" : "/",
        permanent: false, 
      },//
    ]
  },
}

module.exports = withPWA(nextConfig)
