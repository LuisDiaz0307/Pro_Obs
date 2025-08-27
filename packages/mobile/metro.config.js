const path = require('path');

const extraNodeModules = {
  '@mi-proyecto/core': path.resolve(__dirname, '../core/src'),
  // si necesitas otros alias, los agregas aquí
};

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../core'),
    path.resolve(__dirname, '../../node_modules'),
  ],
  resolver: {
    extraNodeModules,
    sourceExts: ['tsx', 'ts', 'js', 'jsx', 'json', 'native.tsx', 'native.js'],
  },
};
