import logo from './logo.svg';
import './App.css';
import React from 'react';

import Marquee from "react-fast-marquee";

import alien from './data/alien.jpg';
import moon from './data/moon.jpg';
import pattern from './data/pattern.png';
import particle from './data/particle.jfif';
import eye from './data/eye.png'
import earth from './data/earth.jpg'
import man_in_moon from './data/man_in_moon.jpg'

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
    this.state = {response: "Loading your news..."};
  }

  componentDidMount(){
  document.title = "The Space Time Continuum";
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

class AlienLanguage extends React.Component {
  generateText(length){
    let final = ""
    for(var i = 0; i < length; i ++){
      let index = Math.floor(Math.random() * this.props.characters.length);
      final += this.props.characters.charAt(index);
    }
    return final;
  }

  render() {
    return <TextContent headline = {this.generateText(20)} body = {this.generateText(1500)}/>
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
            if(rawFile.status === 200 || rawFile.status === 0)
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
        else if(altText[i]!=='\r'){
            word+=altText[i]
        }
    }
    return list;
}

function getRandomInt(max) {

  //Stuff
    return Math.floor(Math.random() * max);
  }

function App() {
  return (
    <div className="App">
      <Header>
        <h1 className = "title">The Space Times Continuum</h1>
        <p className = "subtitle">The best source of news in the observable universe.</p>
        <Ticker></Ticker>
        <title>The Space Times Continuum</title>
      </Header>
      <div className = "contentContainer">
        <SubContainer size = "2x3">
        <Pane size = "2x2">
          <img src={moon}></img>
        </Pane>
        <Pane size = "2x1">
          <AITextContent headline="War on Planet Zorg Rages On"/>
        </Pane>
        </SubContainer>
        <SubContainer size = "2x3">
          <Pane size = "2x1">
            <AITextContent headline="AI Newspaper Achieves Sentience; Writes Garbage"/>
          </Pane>
          <Pane size = "2x1">
          <AlienLanguage characters="▣ ■ □ ▢◯▲▶►▼◆◢◣◤◥"/>
          </Pane>
          <Pane size = "1x1">
            <img src={eye}></img>
          </Pane>
          <Pane size = "1x1">
            <img src={earth}></img>
          </Pane>
        </SubContainer>
          <Pane size = "1x3">
            <AITextContent headline="Prices of Sky Property Fall to Historic Lows"/>
          </Pane>
        <SubContainer size = "2x3">
          <Pane size = "2x1">
            <Weather/>
          </Pane>
          <Pane size = "2x2">
            <img src={particle}></img>
          </Pane>
        </SubContainer>
        <SubContainer size = "3x2">
          <Pane size="3x1">
            <AITextContent headline="Sector E76 Scheduled for Routine Annihilation"/>
          </Pane>
          <Pane size= "1x1">
            <img src={man_in_moon}></img>
          </Pane>
          <Pane size= "2x1">
            <AITextContent headline="Man in Moon Looses Eye"/>
          </Pane>
        </SubContainer>
        <Pane size = "2x2">
          <span className = "barcode">
            <AlienLanguage characters="abcdefghijklmnopqrstuvwxyz     "/>
          </span>
        </Pane>
        <SubContainer size="2x2">
          <Pane size = "2x1">
          <AITextContent headline = "Amateur Team Wins Big Red Hacks"/>
          </Pane>
          <Pane size = "2x1">
            <AITextContent headline="Protobirds in Lab Learn to Swim"/>
          </Pane>
        </SubContainer>
        <SubContainer size="2x2">
          <Pane size = "2x1">
            <AlienLanguage characters="∰ ⋰ ⋱ ∶ ∷ ∴ ∵ ⋘ ⋙"/>
          </Pane>
          <Pane size = "1x1"></Pane>
          <Pane size = "1x1"></Pane>
        </SubContainer>
        <Pane size = "2x2">
          <AlienLanguage characters="ꓯ ꓭ ꓛ ꓷ ꓱ ꓞꟻꓨꓩꓘꓶꟽИꟼꓤЯƧꓕꓵꓥ/Ʌ"/>
        </Pane>
        <Pane size="2x2">
          <AITextContent headline = "Space Times Continuum Goes Public"/>
        </Pane>
        <Pane size = "1x2">
          <img src={pattern}></img>
        </Pane>
        <Pane size = "2x2"></Pane>
      </div>
    </div>
  );
}

export default App;