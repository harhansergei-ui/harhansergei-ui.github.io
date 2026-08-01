import type { NextConfig } from "next";

const isStaticExport = process.env.KUULA_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  trailingSlash: isStaticExport,
  typescript: {
    tsconfigPath: "tsconfig.static.json",
  },
};

export default nextConfig;
