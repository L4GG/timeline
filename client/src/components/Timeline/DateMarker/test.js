// @flow
/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import DateMarker from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DateMarker y={0} year={1990} />, div);
});

it('renders correctly', () => {
  const tree = renderer.create(<DateMarker y={0} year={1990} />).toJSON();

  expect(tree).toMatchSnapshot();
});
