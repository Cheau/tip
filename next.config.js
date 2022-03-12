/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.xlsx?/,
      loader: 'excel-loader',
    })
    return config
  }
}

module.exports = nextConfig
