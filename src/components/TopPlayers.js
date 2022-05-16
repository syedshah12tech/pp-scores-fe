import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTopPlayers } from '../actions/playerActions';
import { Table } from 'react-bootstrap';

class TopPlayers extends Component {
  render() {
    if (this.props.loading){
      return <h3>Loading...</h3>
    } else if (this.props.error != null) {
      return <h3>Got Error</h3>
    } else {
      return (
        <div className="TopPlayers">
          <h1>Top Players</h1>
          {this.renderPlayers()}
        </div>
      )
    }
  }
  componentDidMount() {
    this.props.getTopPlayers();
  }
  renderPlayers() {
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PlayerID</th>
            <th>Name</th>
            <th>W/L Ratio</th>
          </tr>
        </thead>
        <tbody>
          {this.props.topPlayers.map( player => (
            <tr key={player.playerID}>
              <td>{player.playerID}</td>
              <td>{player.name}</td>
              <td>{player.winLossRatio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => ({
  ...state.playerReducer,
})

 const mapDispatchToProps = dispatch => ({
  getTopPlayers: (count = 10) => dispatch(getTopPlayers({count}))
 })
export default connect(mapStateToProps, mapDispatchToProps)(TopPlayers);
