import React, { Component } from "react";

class Victims extends Component {
    render() {
      return (
        <div style={{ overflow: 'auto', overflowY: 'hidden' }}>
          <table className="table is-striped is-fullwidth dark">
            <thead>
              <tr id="row">
                <th></th>
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

export default Victims;
