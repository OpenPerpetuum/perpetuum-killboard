import React, { Component } from 'react';
import { apiUrl } from './config';
var httpBuildQuery = require('http-build-query');

class HeroSection extends Component {
  render() {
    return (
      <section className="hero is-small is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Open Perpetuum Killboard
            </h1>
            <h2 className="subtitle">
              Pre-alpha!
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

class Killboard extends Component {
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

class Kill extends Component {
  render() {
    return (
      <tr>
        <td></td>
        <td>{this.props.victimRobot}</td>
        <td><strong>{this.props.victimAgent}</strong><br />{this.props.victimCorporation}</td>
        <td><strong>{this.props.attackerAgent}</strong><br />{this.props.attackerCorporation}</td>
        <td>{this.props.location}</td>
        <td>
          <span className="icon">
            <i className="fas fa-users"></i> 
          </span>
          <span style={{marginLeft: '0.25rem'}}>{this.props.attackerCount}</span>
        </td>
        <td>{this.props.date}</td>
      </tr>
    );
  }
}

class App extends Component {
  state = {
    'kills': [],
  };
  componentDidMount() {
    var searchParams = {
      'order-by': [
        {
          'type': 'field',
          'field': 'date',
          'direction': 'desc',
        },
      ],
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
        'kills': json._embedded.kill.map(function(kill) {
          return (
            <Kill 
              key={kill.id}
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
              location={kill._embedded.zone.name} 
              date={kill.date}
            />
          );
        }),
      });
    });
  }

  render() {
    return (
      <div>
        <HeroSection />
        <section className="section">
          <div className="container">
            <Killboard kills={this.state.kills} />
          </div>
        </section>
        <FooterSection />
      </div>
    );
  }
}

export default App;
