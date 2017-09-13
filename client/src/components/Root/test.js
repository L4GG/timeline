// @flow
/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Root from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root />, div);
});

it('renders correctly', () => {
  const tree = renderer.create(<Root />).toJSON();

  expect(tree).toMatchSnapshot();
});
