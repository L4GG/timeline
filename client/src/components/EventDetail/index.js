// @flow
import React from 'react';
import styled from 'styled-components';
import { isWebUri } from 'valid-url';

import { color, font } from '../../styles';
import type { Slide } from '../../Slide';

type Props = {|
  event: Slide,
|};

const MAX_WIDTH = 500;

const Headline = styled.h1`
  font-family: ${font.family.heading};
  font-size: ${font.size.large}px;
  font-weight: normal;
  line-height: ${font.lineHeight.heading};
  text-align: center;
`;

const Body = styled.p`
  font-family: ${font.family.body};
  font-size: ${font.size.medium}px;
  line-height: ${font.lineHeight.body};
`;

const Graphic = styled.img``;

const Quote = styled.blockquote`
  font-family: ${font.family.body};
  font-size: ${font.size.quote}px;
  line-height: ${font.lineHeight.body};
`;

const Caption = styled.span`
  font-family: ${font.family.small};
  font-size: ${font.size.small}px;
  line-height: ${font.lineHeight.body};
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${MAX_WIDTH}px;
`;

const EventDetail = ({ event }: Props) => (
  <Root>
    <Headline>{event.text.headline}</Headline>
    {isWebUri(event.media.url) ? (
      <Graphic src={event.media.url} />
    ) : (
      <Quote>{event.media.url}</Quote>
    )}
    <Caption>{event.media.caption}</Caption>
    <Body>{event.text.text}</Body>
  </Root>
);

export default EventDetail;
