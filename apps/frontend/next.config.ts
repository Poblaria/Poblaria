import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@poblaria/backend"]
};

export default nextConfig;
