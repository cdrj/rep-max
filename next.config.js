/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // 确保在生产环境中也加载样式
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  }
}

module.exports = nextConfig
