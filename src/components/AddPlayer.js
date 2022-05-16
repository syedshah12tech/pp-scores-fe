import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { addPlayer } from '../actions/playerActions';
import { errorNotificationEnd, successNotificationEnd } from '../actions/notificationActions';
import { Alert } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ""
    }

    this.onAddPlayer = this.onAddPlayer.bind(this);
    this.onPlayerNameChanged = this.onPlayerNameChanged.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  onPlayerNameChanged(e) {
    this.setState({
      playerName: e.target.value
    });
  }
  resetState() {
    this.setState({
      playerName: ""
    });
  }
  render() {
    return (
      <div className="AddPlayer">
        {this.props.successNotification && setTimeout(this.props.successNotificationEnd, 2000) &&
          <Alert variant='success' onClose={()=> this.props.successNotificationEnd()} 
            dismissible>Player Successfully Added</Alert>}
        {this.props.errorNotification && setTimeout(this.props.errorNotificationEnd, 4000) &&
          <Alert variant='danger' onClose={()=> this.props.errorNotificationEnd()}
          dismissible transition>Got an error</Alert>
        }
        <h1>Add Player</h1>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Control type="name" placeholder="Enter name" 
              onChange={ this.onPlayerNameChanged }
              value={ this.state.playerName }
            />  
          </Form.Group>

          <Button variant="primary" type="submit"
            size="lg"
            disabled={this.props.loading}
            onClick={!this.props.loading ? this.onAddPlayer : null}
          >
            Add Player
          </Button>
        </Form>
      </div>
    )
  }
  onAddPlayer(e) {
    e.preventDefault();

    this.props.addPlayer({
      name: this.state.playerName
    });
    this.resetState();
  }
}

const mapStateToProps = state => ({
  ...state.playerReducer,
  ...state.notificationReducer
 })

 const mapDispatchToProps = dispatch => ({
   addPlayer: (player) => dispatch(addPlayer(player)),
   successNotificationEnd: () => dispatch(successNotificationEnd()),
   errorNotificationEnd: () => dispatch(errorNotificationEnd()),
 })
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);
