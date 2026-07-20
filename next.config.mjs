/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  allowedDevOrigins: ["192.168.74.68"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // The wildcard (*.) allows any region subdomain like sgp.cloud, nyc3.cloud, etc.
        hostname: "*.cloud.appwrite.io",
        port: "",
        pathname: "/v1/storage/buckets/**",
      },
      {
        protocol: "https",
        hostname: "appwrite.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
