// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

type Props = {|
  children?: Node,
|};

// Extra wrapper div is required to overcome IE 10-11 bug in which flex
// children don't know the height of their parent, if that parent's
// height has been set via min-height.
// https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// This wrapper div is required to overcome Chrome 56 issue wherein
// a flex container w/ a min-height and justify-content set to space-around
// or space-between will be taller than the specified min-height.
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/**
 * The main purpose of the Root component is to ensure that it fills the page,
 * and its children can fill its height, in a cross-browser compatible way.
 *
 * @param {*} props Should only contain children
 * @returns {*} unaltered children wrapped in a full-height flex-column container
 */
const Root = ({ children }: Props) => (
  <OuterWrapper>
    <InnerWrapper>{children}</InnerWrapper>
  </OuterWrapper>
);

export default Root;
