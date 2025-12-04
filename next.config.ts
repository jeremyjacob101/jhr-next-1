import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "yykrealestate.com" },
      { protocol: "https", hostname: "cdn.stocksnap.io" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "imgcdn.stablediffusionweb.com" },
      { protocol: "https", hostname: "www.therealestateconversation.com.au" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
