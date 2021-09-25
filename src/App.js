import logo from './logo.svg';
import './App.css';
import React from 'react';

import alien from './data/alien.jpg'

/** 
 * </SubContainer>
        <Pane size = "2x2"></Pane>
        <SubContainer size="2x2">
          <Pane size = "2x1"></Pane>
          <Pane size = "2x1"></Pane>
        </SubContainer>
        <SubContainer size="2x2">
          <Pane size = "2x1"></Pane>
          <Pane size = "1x1"></Pane>
          <Pane size = "1x1"></Pane>
        </SubContainer>
        <Pane size = "2x2"></Pane>
        <Pane size = "2x2"></Pane>
        <Pane size = "2x2"></Pane>
      </div>
*/
class Header extends React.Component {
  render() {
    return (
      <div className = "header">
        {this.props.children}
      </div>
    )
  }
}

class Pane extends React.Component {
  render() {
    let className = "pane" + this.props.size;
    return (
      <div className = {className + " pane"}>
        {this.props.children}
      </div>
    )
  }
}

class SubContainer extends React.Component {
  render() {
    let className = "subContainer" + this.props.size;
    return <div className = {className + " subContainer"}>
      {this.props.children}
    </div>
  }
}

function App() {
  return (
    <div className="App">
      <Header>
        <h1 className = "title">The Space Times Continuum</h1>
      </Header>
      <div className = "contentContainer">
        <SubContainer size = "3x3">
          <SubContainer size = "2x3">
          <Pane size = "2x2">
            Hello, I am an article.
            <img src={alien}></img>
          </Pane>
          <Pane size = "2x1"></Pane>
          </SubContainer>
          <SubContainer size = "1x3">
            <Pane size = "1x1"></Pane>
            <Pane size = "1x1"></Pane>
            <Pane size = "1x1"></Pane>
          </SubContainer>
        </SubContainer>
      </div>
    </div>
  );
}

export default App;
