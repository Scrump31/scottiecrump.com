const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // eslint option in next.config.js is no longer supported in Next 16
  experimental: { esmExternals: true },
  // Enable Turbopack (required in Next 16 when a webpack config is present)
  turbopack: {},
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      },
      // Ensure SVG imports resolve to URL strings (not React components)
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      }
    )

    return config
  },
})
