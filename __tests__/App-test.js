/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Test render', () => {
  it('renders correctly', () => {
    renderer.create('App');
  });

  it.todo('user data is inputted');
});
