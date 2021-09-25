import logo from './logo.svg';
import './App.css';
import React from 'react';

import alien from './data/alien.jpg'
import Marquee from "react-fast-marquee";

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
    return <div className = "contentPadding">
      <h2>{this.props.headline}</h2>
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

class Weather extends React.Component {
  randomPercent(){
    return (Math.random(0, 100) * 100).toFixed(1) + "%";
  }

  render() {
    let specialConditions = ["Acid Rain", "Low Neutron Count", "Space Junk Rain", "Happy Ape Event", "Ocean Takeover"];
    let i = Math.floor(Math.random() * 10);
    console.log(i);
    let currentCondition = i < specialConditions.length ? specialConditions[i] : ""
    let rain = this.randomPercent();
    let qzone = this.randomPercent();
    let hydrogenCount = this.randomPercent();
    let acidVaporPressure = this.randomPercent();

    let weatherSymbols = ["🌪", "🌥", "⛈", "☼", "☀", "☄"];
    let currentWeather = weatherSymbols[Math.floor(Math.random() * weatherSymbols.length)]

    return <>
      <div className = "contentPadding">
      <h3>Today's Weather</h3>
      <p>{"Rain: " + rain}</p>
      <p>{"QZone: " + qzone}</p>
      <p>{"Hydrogen Count: " + hydrogenCount}</p>
      <p>{"Acid Vapor Pressure: " + acidVaporPressure}</p>
      {currentCondition != "" ? 
        <p className="alert"><b>{"Warning: " + currentCondition}</b></p> : <></>
      }
    </div>
    <p className = "weatherIcon">{currentWeather}</p>
    </>
  }
}

class Ticker extends React.Component {
  generateTickers() {
    let abr = ["TICKER", "UR", "MOM", "DEEZ", "TIK", "ANF", "ENGD", "CS", "BRH", "EFJLSK", "\u263F", "\u2640", "\u2641", "\u2642", "\u2643", "\u2644", "\u26E2", "\u2646", "APPL", "TSLA", "HI"];
    let final = [];
    for(var i in abr){
      let change = (Math.random() * 10 - 5).toFixed(2);
      final.push(
        <span className={change > 0 ? "green" : "red"}> {abr[i] + " " + change + "%" }</span>
      );
    }
    return final;
  }
  render() {
    return <Marquee className = "ticker" gradient = {false} speed = {40}>
      {this.generateTickers()}
    </Marquee>
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
        <Ticker></Ticker>
      </Header>
      <div className = "contentContainer">
        <SubContainer size = "2x3">
        <Pane size = "2x2">
          <img src={alien}></img>
        </Pane>
        <Pane size = "2x1">
          <AITextContent headline="War on Planet Zorg"/>
        </Pane>
        </SubContainer>
        
        <SubContainer size = "2x3">
          <Pane size = "2x1">
            <AITextContent headline="AI Newspaper"/>
          </Pane>
          <Pane size = "2x1">
            <AITextContent headline="AI Newspaper"/>
          </Pane>
          <Pane size = "1x1"></Pane>
          <Pane size = "1x1"></Pane>
        </SubContainer>
        <SubContainer size = "1x3">
          <Pane size = "1x1">
            
          </Pane>
          <Pane size = "1x1"></Pane>
          <Pane size = "1x1"></Pane>
        </SubContainer>
        <SubContainer size = "2x3">
          <Pane size = "2x1">
            <Weather/>
          </Pane>
          <Pane size = "2x2">
            <AITextContent headline="Space Times Continuum goes public"/>
          </Pane>
        </SubContainer>
        <SubContainer size="2x2">
          <Pane size = "2x1">
          <AITextContent headline = "Amateur team wins hackathon."/>
          </Pane>
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