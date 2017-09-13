// @flow
import React from 'react';
import styled from 'styled-components';

import { color, font } from '../../../styles';
import { WIDTH as AXIS_WIDTH } from '../Axis';

type Props = {|
  year: number,
  y: number,
|};

const GUTTER = 10;
const HEIGHT = 1;
const WIDTH = 40;

const TWO = 2;

const Marker = styled.div`
  background: ${color.dustyGrey};
  height: ${HEIGHT}px;
  left: 0;
  margin-left: -${(WIDTH - AXIS_WIDTH) / TWO}px;
  position: absolute;
  width: ${WIDTH}px;
`;

const Year = styled.span`
  display: block;
  font-family: ${font.family.body};
  font-size: ${font.size.small}px;
  position: absolute;
  right: ${WIDTH + GUTTER}px;
  top: 0;
  transform: translateY(-50%);
`;

const DateMarker = ({ year, y }: Props) => {
  return (
    <Marker style={{ top: y }}>
      <Year>{year}</Year>
    </Marker>
  );
};

export default DateMarker;
