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
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      },
      // Ensure SVG imports resolve to URL strings (not React components)
      {
        test: /\.svg$/i,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      }
    )

    // In Next 16 with React 19, keep default React; remove Preact aliasing

    return config
  },
})

/*
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
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    // In Next 16 with React 19, keep default React; remove Preact aliasing

    return config
  },
})

 */
