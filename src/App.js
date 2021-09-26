import logo from './logo.svg';
import './App.css';
import React from 'react';

import alien from './data/alien.jpg'
import names from './data/first-names.txt'
import titles from './data/titles.txt'
import planets from './data/planets.txt'

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
    var topics = ["politics", "travel", "economy", "health", "sports", "technology", "food"]
    var starter = await GenerateStarterText(topics[Math.floor(Math.random()*7)])
    var resp = await deepai.callStandardApi("text-generator", {
      text: starter,
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


async function getFromFile(file) {
  return fetch(file)
  .then(r => r.text())
  .then(text => {
    var arrayText = text.split("\n")
    return arrayText[Math.floor(Math.random()*arrayText.length)]
  });
}

function genLastName(name) {
  name = name.split("").reverse().join("").toLowerCase()
  var first = name.charAt(0)
  return name = first.toUpperCase() + name.substring(1, name.length)
}

async function genFullName() {
  var firstName = (await getFromFile(names)).slice(0, -1)
  var lastName = genLastName((await getFromFile(names)).trim(0, -1))
  if (Math.floor(Math.random()*20) < 3) {
    var title = (await getFromFile(titles)).trim(0, -1)
  } else {
    var title = ""
  }
  if (Math.floor(Math.random()*10) < 5) {
    var middleName = (await getFromFile(names)).trim(0, -1)
    var fullName = title + " " + firstName + " " + middleName + " " + lastName
  } else {
    var fullName = title + " " + firstName + " " + lastName
  }
  return fullName
}

async function genPlanet() {
  return await getFromFile(planets)
}

async function GenerateStarterText(type) {
  var timePeriods = ["winter", "spring", "summer", "autumn", "week", "month", "year", "decade", "century", "millennium"]
  var pronouns = ["his", "her", "their"]
  var fullName = await genFullName()
  var planet = await genPlanet()
  var timePeriod = timePeriods[Math.floor(Math.random()*timePeriods.length)]
  var pronoun = pronouns[Math.floor(Math.random()*pronouns.length)]

  var options
  switch (type) {
    case "politics":
      options = [fullName + " has just won the " +planet+ " election in a landslide, "+fullName+" reports to The Space Times Continuum.",
      "BREAKING: In a stunning turn of events, the "+planet+" army has invaded "+(await genPlanet())+", sparking concern from all over the galaxy.",
      fullName+" has announced "+pronoun+" resignation from the "+planet+" gubernatorial race.",
      ]
      break;
    case "travel":
      options = ["A hot new destination has opened for those looking to embark on exciting adventures: "+planet+".",
      fullName +" recommends everyone take a trip to "+planet+" this "+timePeriod+".",
      "\""+planet+" was the best trip I ever took\" says "+fullName+" of the planet "+(await genPlanet())+".",
      ]
      break;
    case "economy":
      options = ["Optimistic financial analyst "+fullName+" says the current recession will be over soon."]
      break;
    case "health":
      options = ["A pandemic on the planet "+planet+" has put the whole system into lockdown. President "+fullName+" calls for cooperation and empathy in these trying times.",
      "\"This is groundbreaking.\" A new "+genLastName((await getFromFile(names)).trim(0, -1))+"virus drug has entered trials in worms on the research planet " +planet+" of the "+(await genPlanet())+" system."]
      break;
    case "sports":
      options = ["A shocking upset to the reigning "+planet+"ball champions by the "+(await genPlanet())+" planetorial team finds the sport in an uproar."]
      break;
    case "technology":
      options = ["The new (new) iPhone "+Math.floor(Math.random()*200)+ " has been announced at the centennial "+planet+" developer's conference to much acclaim and fanfare. However, some tech analysts criticize the new phone's lack of a phone in the box, which Apple calls necessary \"to better support galactic sustainibility\"."

    ]
      break;
    case "food":
      options = ["Try the new delicacy that's sweeping the "+planet+" system!",
      "Concerns of food poisoning has prompted a shutdown of the popular "+planet+" restaurant "+genLastName((await getFromFile(names)).trim(0, -1))+"."
    ]
      break;
  }
  return options[Math.floor(Math.random()*options.length)]
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
            <AITextContent headline="AI Newspaper" body=""/>
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
            <AITextContent headline="Space Times Continuum goes public" body=""/>
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
