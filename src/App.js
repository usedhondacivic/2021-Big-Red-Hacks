import logo from './logo.svg';
import './App.css';
import React from 'react';

import alien from './data/alien.jpg'

const deepai = require('deepai');
deepai.setApiKey('ce191c40-186c-4f63-8f55-d52048319c0b');

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

class TextContent extends React.Component {
  render() {
    return <div className = "textContent">
      <h3>{this.props.headline}</h3>
      <p>{this.props.body}</p>
    </div>
  }
}

class AITextContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {response: ""};
  }
  componentDidMount(){
  (async function() {
    var resp = await deepai.callStandardApi("text-generator", {
      text: this.props.headline,
      });
      this.setState({
        response: resp.output
      });
    }).call(this);
  }
  render() {
    return <TextContent headline={this.props.headline} body={this.state.response} />
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

/*==============Marco Functionc========= */
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var allText
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    return allText
}
function fileList(file){
    let altText =readTextFile(file);
    let list = [];;
    let word=""
    for(let i= 0; i<altText.length;i++){
        if(altText[i]=='\n'){
            fileList.push(word)
            word="";
        }
        else if(altText[i]!='\r'){
            word+=altText[i]
        }
    }
    return list;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
            <img src={alien}></img>
          </Pane>
          <Pane size = "2x1">
            
          </Pane>
          </SubContainer>
          <SubContainer size = "1x3">
            <Pane size = "1x1"></Pane>
            <Pane size = "1x1"></Pane>
            <Pane size = "1x1"></Pane>
          </SubContainer>
        </SubContainer>
        <SubContainer size = "2x3">
          <Pane size = "2x1">
            <AITextContent headline="AI Newspaper"/>
          </Pane>
          <Pane size = "2x1"></Pane>
          <Pane size = "1x1"></Pane>
          <Pane size = "1x1"></Pane>
        </SubContainer>
        <SubContainer size = "2x3">
          <Pane size = "2x2">
            <AITextContent headline="Space Times Continuum goes public"/>
          </Pane>
          <Pane size = "2x1"></Pane>
        </SubContainer>
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
    </div>
  );
}

export default App;
