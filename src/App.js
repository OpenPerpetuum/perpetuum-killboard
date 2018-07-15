import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { apiUrl } from './config';
import Victim from './Victim';
var httpBuildQuery = require('http-build-query');

class HeroSection extends Component {
  render() {
    return (
      <section className="hero is-small is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              <Link to="/">
                Open Perpetuum Killboard
              </Link>
            </h1>
            <h2 className="subtitle">
              v0.2
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

class FooterSection extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>Open Perpetuum Killboard</strong> is part of Open Perpetuum, an open-source project. Support us on <a href="https://www.patreon.com/openperpetuum">Patreon</a>!
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

class KillBoard extends Component {
  constructor(props) {
    super(props);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickFirst = this.handleClickFirst.bind(this);
    this.handleClickLast = this.handleClickLast.bind(this);
    this.populateTableFromAPI = this.populateTableFromAPI.bind(this);
    this.state = {
      'kills': [],
      'page': this.state!=null ? this.state.page : 1,
      'prev': this.state!=null ? this.state.page : 1,
      'page_count': this.state!=null ? this.state.page_count : 1
    };
  }


  handleClickNext(){
    this.populateTableFromAPI(this.state.next);
  }

  handleClickPrev(){
    this.populateTableFromAPI(this.state.prev);
  }

  handleClickFirst(){
    this.populateTableFromAPI(1);
  }

  handleClickLast(){
    this.populateTableFromAPI(this.state.page_count);
  }


  populateTableFromAPI(pageNum) {
    var searchParams = {
      'order-by': [
        {
          'type': 'field',
          'field': 'date',
          'direction': 'desc',
        },
      ],
      'page' : pageNum
    };
    
    fetch(new URL('/killboard/kill?'+httpBuildQuery(searchParams), apiUrl), {
      method: 'GET',
      headers: new Headers({
        "Accept": "application/*+json",
      }),
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.setState({
        'page' : json.page,
        'next' : json.page+1,
        'prev' : json.page-1,
        'page_count': json.page_count,
        'kills': json._embedded.kill.map(function(kill) {
          return (
            <Victim 
              key={kill.id}
              killId={kill.id}
              victimRobot={kill._embedded.robot.name}
              victimAgent={kill._embedded.agent.name} 
              victimCorporation={kill._embedded.corporation.name}
              attackerAgent={
                kill._embedded.attackers.map(function(attacker) {
                  if (attacker.hasKillingBlow === true) {
                    return attacker._embedded.agent.name;
                  }
                  return '';
                })
              }
              attackerCorporation={
                kill._embedded.attackers.map(function(attacker) {
                  if (attacker.hasKillingBlow === true) {
                    return attacker._embedded.corporation.name;
                  }
                  return '';
                })
              }
              attackerCount={kill._embedded.attackers.length}
              zone={kill._embedded.zone.name} 
              date={kill.date}
            />
          );
        }),
      });
    });
  }

  componentDidMount() {
    this.populateTableFromAPI(this.state.page);
  }

  render() {
    return (
      <div>
        <Victims kills={this.state.kills} />

        <button onClick={this.handleClickFirst}>First</button>
        {this.state.page>1 && <button onClick={this.handleClickPrev}>Prev</button>}
        {this.state.page<this.state.page_count && <button onClick={this.handleClickNext}>Next</button>}
        <button onClick={this.handleClickLast}>Last</button>

      </div>
    );
  }
}

class KillDetail extends Component {
  state = {
    'date': null,
    'damageReceived': null,
    'agent': {
      'name': null,
    },
    'corporation': {
      'name': null,
    },
    'robot': {
      'name': null,
    },
    'zone': {
      'id': null,
    },
    'attackers': [],
  };

  componentDidMount() {
    fetch(new URL('/killboard/kill/' + this.props.match.params.killId, apiUrl), {
      method: 'GET',
      headers: new Headers({
        "Accept": "application/*+json",
      }),
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.setState({
        'date': json.date,
        'damageReceived': json.damageReceived,
        'agent': json._embedded.agent,
        'corporation': json._embedded.corporation,
        'robot': json._embedded.robot,
        'zone': json._embedded.zone,
        'attackers': json._embedded.attackers.map(function(attacker) {
          return (
            <Attacker
              key={attacker.id}
              {...attacker}
              totalDamageDealt={json.damageReceived}
              agent={attacker._embedded.agent}
              robot={attacker._embedded.robot} 
              corporation={attacker._embedded.corporation}
            />
          );
        }),
      });
    });
  }

  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <div className="has-text-centered" style={{marginBottom: '2em'}}>
              <div>
                <p className="heading">Agent</p>
                <p className="subtitle">{this.state.agent.name}</p>
              </div>
            </div>
            <div className="has-text-centered" style={{marginBottom: '2em'}}>
              <div>
                <p className="heading">Corporation</p>
                <p className="subtitle">{this.state.corporation.name}</p>
              </div>
            </div>
            <div className="has-text-centered" style={{marginBottom: '2em'}}>
              <div>
                <p className="heading">Robot</p>
                <p className="subtitle">{this.state.robot.name}</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="has-text-centered" style={{marginBottom: '2em'}}>
              <div>
                <p className="heading">Zone</p>
                <p className="subtitle">{this.state.zone.name}</p>
              </div>
            </div>
            <div className="has-text-centered" style={{marginBottom: '2em'}}>
              <div>
                <p className="heading">Date</p>
                <p className="subtitle">{this.state.date}</p>
              </div>
            </div>
            <div className="has-text-centered" style={{marginBottom: '2em'}}>
              <div>
                <p className="heading">Damage received</p>
                <p className="subtitle">{Math.round(this.state.damageReceived * 100) / 100}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="title is-4">
            Attackers
          </h1>
          <div>
            <Attackers attackers={this.state.attackers} />
          </div>
        </div>
      </div>
    );
  }
}

class Attackers extends Component {
  render() {
    return (
      <div style={{overflow: 'auto', overflowY: 'hidden'}}>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th></th>
              <th>Agent</th>
              <th>Robot</th>
              <th>Damage dealt</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.attackers}
          </tbody>
        </table>
      </div>
    );
  }
}

class Attacker extends Component {
  render() {
    return (
      <tr className="attacker">
        <td></td>
        <td><strong>{this.props.agent.name}</strong><br />{this.props.corporation.name}</td>
        <td><strong>{this.props.robot.name}</strong><br /></td>
        <td><strong>{Math.round(this.props.damageDealt * 100) / 100}</strong><br />{Math.round(this.props.damageDealt / this.props.totalDamageDealt * 10000) / 100}%</td>
        <td></td>
        <td>
          {this.props.hasKillingBlow &&
            <span className="tag is-success">Killing blow</span>
          }
        </td>
      </tr>
    );
  }
}

class Victims extends Component {
  render() {
    return (
      <div style={{overflow: 'auto', overflowY: 'hidden'}}>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th></th>
              <th>Robot</th>
              <th>Victim</th>
              <th>Killing blow</th>
              <th>Location</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.kills}
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeroSection />
          <section className="section">
            <div className="container">
              <Route exact path="/" component={KillBoard} />
              <Route exact path="/kill/:killId" component={KillDetail} />
            </div>
          </section>
          <FooterSection />
        </div>
      </Router>
    );
  }
}

export default App;
