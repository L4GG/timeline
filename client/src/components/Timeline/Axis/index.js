// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { color } from '../../../styles';

type Props = {|
  children?: Node,
  height: number,
|};

export const WIDTH = 20;

const Bar = styled.div`
  background: ${color.alto};
  position: relative;
  width: ${WIDTH}px;
`;

const Axis = ({ children, height }: Props) => (
  <Bar style={{ height }}>{children}</Bar>
);

export default Axis;
