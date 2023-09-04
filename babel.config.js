module.exports = api => {
  api.cache(false);

  const aliases = {
    '@app': './app',
    '@components': './app/components',
    '@navigation': './app/navigation',
    '@services': './app/services',
    '@theme': './app/theme',
    '@utils': './app/utils',
    '@constants': './app/constants',
    '@screens': './app/screens',
    '@assets': './app/assets',
  };

  const plugins = [['module-resolver', {alias: aliases}]];

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
