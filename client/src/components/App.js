// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import EventDetail from './EventDetail';
import Root from './Root';
import Timeline from './Timeline';
import events from '../events.json';
import { color, breakPoint } from '../styles';

const TIMELINE_MAX_WIDTH = 425;

const RIGHT_PANEL_PADDING = 20;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 100vh;
`;

const Left = styled.div`
  @media (min-width: ${breakPoint.medium}px) {
    background-color: ${color.gallery};
    flex-basis: ${TIMELINE_MAX_WIDTH}px;
    flex-shrink: 0;
    overflow: auto;
  }
`;

const Right = styled.div`
  box-sizing: border-box;
  display: none;
  flex-grow: 1;
  padding: ${RIGHT_PANEL_PADDING}px;

  @media (min-width: ${breakPoint.medium}px) {
    display: block;
    overflow: auto;
  }
`;

/**
 * Compose our slides
 */

/**
 * The root component for our app.
 */
class App extends Component<{||}> {
  render() {
    return (
      <Root>
        <Container>
          <Left>
            <Timeline events={events} maxWidth={TIMELINE_MAX_WIDTH} />
          </Left>
          <Right>
            <EventDetail event={events[0]} />
          </Right>
        </Container>
      </Root>
    );
  }
}

export default App;
