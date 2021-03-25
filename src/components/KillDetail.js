import React, { Component } from "react";
import Attacker from './Attacker';
import Attackers from './Attackers';
import { apiUrl } from '../config';

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
            'attackers': json._embedded.attackers.map(function (attacker) {
              return (
                <Attacker
                  key={attacker.id}
                  {...attacker}
                  totalDamageDealt={json.damageReceived}
                  agent={attacker._embedded.agent}
                  robot={attacker._embedded.robot}
                  corporation={attacker._embedded.corporation}
                  totalEcmAttempts={attacker.totalEcmAttempts}
                  energyDrain={attacker.energyDispersed}
                  sensorSurpressions={attacker.sensorSurpressions}
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
              <div className="has-text-centered" style={{ marginBottom: '2em' }}>
                <div>
                  <p className="heading">Agent</p>
                  <p className="subtitle">{this.state.agent.name}</p>
                </div>
              </div>
              <div className="has-text-centered" style={{ marginBottom: '2em' }}>
                <div>
                  <p className="heading">Corporation</p>
                  <p className="subtitle">{this.state.corporation.name}</p>
                </div>
              </div>
              <div className="has-text-centered" style={{ marginBottom: '2em' }}>
                <div>
                  <p className="heading">Robot</p>
                  <p className="subtitle">{this.state.robot.name}</p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="has-text-centered" style={{ marginBottom: '2em' }}>
                <div>
                  <p className="heading">Zone</p>
                  <p className="subtitle">{this.state.zone.name}</p>
                </div>
              </div>
              <div className="has-text-centered" style={{ marginBottom: '2em' }}>
                <div>
                  <p className="heading">Date</p>
                  <p className="subtitle">{this.state.date}</p>
                </div>
              </div>
              <div className="has-text-centered" style={{ marginBottom: '2em' }}>
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

export default KillDetail;