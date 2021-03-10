module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [require('@babel/plugin-proposal-class-properties'), { loose: false }],
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api',
          '@infrastructure': './src/infrastructure',
        },
      },
    ],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-typescript',
  ],
  ignore: ['**/*.spec.ts'],
}
