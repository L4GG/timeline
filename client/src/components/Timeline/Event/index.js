// @flow
import React from 'react';
import styled from 'styled-components';

import { color, font } from '../../../styles';
import { WIDTH as AXIS_WIDTH } from '../Axis';
import type { Slide } from '../../../Slide';

type Props = {|
  event: Slide,
  maxWidth: number,
  y: number,
|};

const MARKER_HEIGHT = 3;
const MARKER_WIDTH = 20;
const REFERENCE_LINE_WIDTH = 20;
const GUTTER = 10;

const TWO = 2;

const Group = styled.div`position: absolute;`;

const Marker = styled.div`
  background: ${color.calypso};
  height: ${MARKER_HEIGHT}px;
  left: 0;
  margin-left: -${(MARKER_WIDTH - AXIS_WIDTH) / TWO}px;
  position: absolute;
  top: -${(MARKER_HEIGHT - 1) / TWO}px;
  width: ${MARKER_WIDTH}px;
`;

const ReferenceLine = styled.div`
  background: ${color.alto};
  height: 1px;
  left: ${MARKER_WIDTH}px;
  position: absolute;
  top: 0px;
  width: ${REFERENCE_LINE_WIDTH}px;
`;

const Label = styled.span`
  font-family: ${font.family.body};
  font-size: ${font.size.medium}px;
  left: ${MARKER_WIDTH + REFERENCE_LINE_WIDTH + GUTTER}px;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 0;
  transform: translateY(-50%);
  white-space: nowrap;
`;

const Event = ({ event, maxWidth, y }: Props) => (
  <Group style={{ top: y }}>
    <Marker />
    <ReferenceLine />
    <Label
      style={{
        right: -maxWidth,
      }}
    >
      {event.text.headline}
    </Label>
  </Group>
);

export default Event;
