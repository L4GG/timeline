// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { __, equals, filter, map, modulo, pipe, range } from 'ramda';

import Axis, { WIDTH as AXIS_WIDTH } from './Axis';
import DateMarker from './DateMarker';
import Event from './Event';
import type { Slide } from '../../Slide';

type Props = {|
  // children?: Element<Event>[],
  events: Slide[],
  maxWidth: number,
|};

// TODO: convert everything to millisecond granularity
const START_YEAR = 1980;
const END_YEAR = 2020;

const YEAR_HEIGHT = 30;
const MAJOR_YEAR_MARKER = 5;

const SCALE_PADDING_LEFT = 55;
const SCALE_PADDING_VERTICAL = 20;

const TWO = 2;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${SCALE_PADDING_VERTICAL}px ${SCALE_PADDING_LEFT}px;
  position: relative;
`;

class Timeline extends Component<Props> {
  render() {
    const { events, maxWidth } = this.props;

    const axisHeight = (END_YEAR - START_YEAR) * YEAR_HEIGHT;

    return (
      <Container>
        <Axis height={axisHeight}>
          {pipe(
            filter(pipe(modulo(__, MAJOR_YEAR_MARKER), equals(0))),
            map(year => (
              <DateMarker
                key={year}
                year={year}
                y={(year - START_YEAR) * YEAR_HEIGHT}
              />
            ))
          )(range(START_YEAR, END_YEAR + 1))}
          {pipe(
            map((event: Slide) => (
              <Event
                event={event}
                maxWidth={maxWidth - SCALE_PADDING_LEFT - AXIS_WIDTH / TWO}
                y={(event.start_date.year - START_YEAR) * YEAR_HEIGHT}
              />
            ))
          )(events)}
        </Axis>
      </Container>
    );
  }
}

export default Timeline;
