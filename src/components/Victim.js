import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/Victim.css';
import '../css/index.css';
import resolveIcon from '../iconResolve'

class Victim extends Component {
  handleClick = () => {
    this.props.history.push('/kill/' + this.props.killId);
  }

  handleMouseEnter = () => {
    this.setState({ hover: true }); 
  }

  handleMouseLeave = () => {
    this.setState({ hover: false }); 
  }

  handleRenderClass = () => {
    if(this.state!=null){
      return this.state.hover ? "victim-hover" : "victim";
    }else{
      return "victim";
    }
  }

  render() {
    return (
      <tr id="row" className={this.handleRenderClass() + " dark"} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick} style={{'cursor': 'pointer'}}>
        <td></td>
        <td><img className="bot-icon" src={resolveIcon(this.props.victimRobot)} alt="robot-icon"/></td>
        <td>{this.props.victimRobot}</td>
        <td><strong>{this.props.victimAgent}</strong><br />{this.props.victimCorporation}</td>
        <td><strong>{this.props.attackerAgent}</strong><br />{this.props.attackerCorporation}</td>
        <td>{this.props.zone}</td>
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

export default withRouter(Victim);