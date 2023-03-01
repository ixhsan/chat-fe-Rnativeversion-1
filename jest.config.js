module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // '^.+\\.jsx?$': 'babel-jest',
    'node_modules/react-native-elements/(.*)': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },

  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testPathIgnorePatterns: ['/node_modules/', '/ios/', '/android/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo)',
  ],
};
