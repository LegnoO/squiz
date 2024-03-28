/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.fsgn5-12.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "img-c.udemycdn.com",
      },
    ],
  },
};

export default nextConfig;
