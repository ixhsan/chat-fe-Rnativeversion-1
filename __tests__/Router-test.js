import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Router from '../src/router';

const mockStore = configureStore([]);

describe('Router component', () => {
  let store;
  let component;

  // beforeEach(() => {
  //     store = mockStore({
  //         user: {
  //             isLogged
  //         }
  //     })
  // })

  it('renders the Login screen when user is not logged in', () => {});
});
