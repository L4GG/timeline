// @flow
/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Axis from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Axis height={10} />, div);
});

it('renders correctly', () => {
  const tree = renderer.create(<Axis height={10} />).toJSON();

  expect(tree).toMatchSnapshot();
});
