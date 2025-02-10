import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'zh'], 
    defaultLocale: 'zh',
  },
  serverRuntimeConfig: {
    // 设置一个较高的构建超时，单位是毫秒
    buildTimeout: 240000, // 默认是 60秒
  },
};

export default nextConfig;
