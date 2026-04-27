import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@poblaria/backend"],
    compress: false,
    experimental: {
        typedEnv: true,
        serverActions: {
            bodySizeLimit: "20mb"
        }
    },
    webpack: (config: {
        resolve: { extensionAlias: Record<string, string[]> };
    }) => {
        config.resolve.extensionAlias = {
            ".js": [".ts", ".tsx", ".js", ".jsx"],
            ".mjs": [".mts", ".mjs"],
            ".cjs": [".cts", ".cjs"]
        };
        return config;
    },
    output: "standalone"
};

export default nextConfig;
