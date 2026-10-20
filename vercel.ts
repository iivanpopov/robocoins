export const config = {
  rewrites: [
    {
      source: '/api/services/:path*',
      destination: `${process.env.SERVICES_URL}/:path*`,
    },
    {
      source: '/api/:path*',
      destination: `${process.env.API_URL}/:path*`,
    },
    {
      source: '/(.*)',
      destination: '/index.html',
    },
  ],
}
