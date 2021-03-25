import React, { Component } from "react";
import Victim from './Victim';
import Victims from './Victims';
import loadingGif from '../images/loading.gif';
import { apiUrl } from '../config';

var httpBuildQuery = require('http-build-query');

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
        'page': this.state != null ? this.state.page : 1,
        'prev': this.state != null ? this.state.page : 1,
        'page_count': this.state != null ? this.state.page_count : 1,
        'loaded': false
      };
    }
  
    handleClickNext() {
      this.populateTableFromAPI(this.state.next);
    }
  
    handleClickPrev() {
      this.populateTableFromAPI(this.state.prev);
    }
  
    handleClickFirst() {
      this.populateTableFromAPI(1);
    }
  
    handleClickLast() {
      this.populateTableFromAPI(this.state.page_count);
    }
  
  
    populateTableFromAPI(pageNum) {
      this.setState({ 'loaded': false });
      var searchParams = {
        'order-by': [
          {
            'type': 'field',
            'field': 'date',
            'direction': 'desc',
          },
        ],
        'page': pageNum
      };
  
      fetch(new URL('/killboard/kill?' + httpBuildQuery(searchParams), apiUrl), {
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
            'loaded': true,
            'page': json.page,
            'next': json.page + 1,
            'prev': json.page - 1,
            'page_count': json.page_count,
            'kills': json._embedded.kill.map(function (kill) {
              return (
                <Victim
                  key={kill.id}
                  killId={kill.id}
                  victimRobot={kill._embedded.robot.name}
                  victimAgent={kill._embedded.agent.name}
                  victimCorporation={kill._embedded.corporation.name}
                  attackerAgent={
                    kill._embedded.attackers.map(function (attacker) {
                      if (attacker.hasKillingBlow === true) {
                        return attacker._embedded.agent.name;
                      }
                      return '';
                    })
                  }
                  attackerCorporation={
                    kill._embedded.attackers.map(function (attacker) {
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
      const loaded = this.state.loaded;
      var classes = "button is-large is-dark";
      var imgClass = "is-invisible";
      if (!loaded) {
        imgClass = "";
      }
      return (
        <div>
          <Victims kills={this.state.kills} />
          <div className="buttons">
            <a disabled={!loaded} className={classes} onClick={this.handleClickFirst}>First</a>
            {this.state.page > 1 && <a disabled={!loaded} className={classes} onClick={this.handleClickPrev}>Prev</a>}
            {this.state.page < this.state.page_count && <a disabled={!loaded} className={classes} onClick={this.handleClickNext}>Next</a>}
            <a disabled={!loaded} className={classes} onClick={this.handleClickLast}>Last</a>
            <img className={imgClass} src={loadingGif} alt="loading..." />
          </div>
  
        </div>
      );
    }
  }

  export default KillBoard;