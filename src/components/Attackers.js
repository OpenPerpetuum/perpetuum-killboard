import React, { Component } from "react";

class Attackers extends Component {
    render() {
      return (
        <div style={{ overflow: 'auto', overflowY: 'hidden' }}>
          <table className="table is-striped is-fullwidth dark">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Agent</th>
                <th>Robot</th>
                <th>Damage dealt</th>
                <th>EWAR</th>
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

  export default Attackers;