module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [/node_modules\/@astrouxds\/react/], // Ignore Astro React library
        },
      ],
    },
  };
  