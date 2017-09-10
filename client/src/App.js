// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Intro = styled.p`font-size: large;`;

const Logo = styled.img`
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
`;

const Root = styled.div`text-align: center;`;

class App extends Component<{||}> {
  render() {
    return (
      <Root>
        <Header>
          <Logo src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </Header>
        <Intro className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
      </Root>
    );
  }
}

export default App;
