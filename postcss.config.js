const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [path.join(__dirname, 'app')]
    }),
    require('postcss-cssnext')({
      features: {
        customProperties: true
      }
    }),
    require('postcss-flexbugs-fixes'),
  ],
};
