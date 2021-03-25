import React, { Component } from "react";
import resolveIcon from '../iconResolve';

class Attacker extends Component {
    render() {
      return (
        <tr id="row" className="attacker dark">
          <td></td>
          <td><img className="bot-icon" src={resolveIcon(this.props.robot.name)} alt="robot-icon" /></td>
          <td><strong>{this.props.agent.name} {this.props.hasKillingBlow && <span className="tag is-danger"> Killing blow! </span>} </strong><br />{this.props.corporation.name}</td>
          <td><strong>{this.props.robot.name}</strong><br /></td>
          <td><strong>{Math.round(this.props.damageDealt * 100) / 100}</strong><br />{Math.round(this.props.damageDealt / this.props.totalDamageDealt * 10000) / 100}%</td>
          <td>
            {this.props.energyDrain > 0 && <span><strong>Energy Drained:</strong>  {Math.round(this.props.energyDrain)} <br /></span>}
            {this.props.sensorSurpressions > 0 && <span><strong>Sensor Surpressions:</strong>  {this.props.sensorSurpressions} <br /></span>}
            {this.props.totalEcmAttempts > 0 && <span><strong>ECM Attempts:</strong>  {this.props.totalEcmAttempts}<br /> </span>}
          </td>
          <td></td>
        </tr>
      );
    }
  }

  export default Attacker