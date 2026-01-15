module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
      'nativewind/babel'
    ],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts', // This MUST point to your root file
          logTimings: true,
        },
      ],
      // Reanimated MUST be the very last plugin
      'react-native-reanimated/plugin', 
    ],
  };
};