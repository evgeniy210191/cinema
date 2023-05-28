const config = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('css-mqpacker'),
    require('cssnano')({ preset: 'default' }),
  ],
};

module.exports = config;
