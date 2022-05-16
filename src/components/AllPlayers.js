import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllPlayers } from '../actions/playerActions';
import { Table,Alert } from 'react-bootstrap';
import { errorNotificationEnd, successNotificationEnd } from '../actions/notificationActions';

class AllPlayers extends Component {
  render() {
    if (this.props.loading){
      return <h3>Loading...</h3>
    } else {
      return (
        <div className="AllPlayers">
          {this.props.successNotification && setTimeout(this.props.successNotificationEnd, 100) && <span/>} 
              
          {this.props.errorNotification && setTimeout(this.props.errorNotificationEnd, 2000) && 
            <Alert variant='danger' onClose={()=> this.props.errorNotificationEnd()}
            dismissible transition>Got an error</Alert>
          }

          <h1>All Players</h1>
          {this.renderPlayers()}
        </div>
      )
    }
  }
  componentDidMount() {
    this.props.getAllPlayers();
  }
  renderPlayers() {
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PlayerID</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {this.props.allPlayers.map( player => (
            <tr key={player.playerID}>
              <td>{player.playerID}</td>
              <td>{player.name}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => ({
  ...state.playerReducer,
  ...state.notificationReducer,
})

 const mapDispatchToProps = dispatch => ({
  getAllPlayers: () => dispatch(getAllPlayers()),
  successNotificationEnd: () => dispatch(successNotificationEnd()),
  errorNotificationEnd: () => dispatch(errorNotificationEnd()),
 })
export default connect(mapStateToProps, mapDispatchToProps)(AllPlayers);
