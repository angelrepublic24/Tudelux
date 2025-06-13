import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      '24116371.fs1.hubspotusercontent-na1.net',
      '22465736.fs1.hubspotusercontent-na1.net',
      'res.cloudinary.com',
      'tudelu.com'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tudeluserver.onrender.com/api/:path*', 
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
