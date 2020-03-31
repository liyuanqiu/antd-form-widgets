module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
