import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { addGameResult } from '../actions/gameResultActions';
import { errorNotificationEnd, successNotificationEnd } from '../actions/notificationActions';
import { Alert } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

class AddGameResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1ID: "",
      player2ID: "",
      player3ID: "",
      player4ID: "",
      winner1ID: "",
      winner2ID: "",
    }

    this.onAddGameResult = this.onAddGameResult.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateFields() {
    if (this.state.player1ID === "") {
      alert("Player 1 ID cannot be empty");
      return false;
    }

    if (this.state.player2ID === "") {
      alert("Player 2 ID cannot be empty");
      return false;
    }

    if (this.state.winner1ID === "") {
      alert("Winner 1 ID cannot be empty");
      return false;
    }

    return true;
  }
  onAddGameResult(e) {
    e.preventDefault();

    if (!this.validateFields()) {
      return;
    }

    let playerIDs = [this.state.player1ID,this.state.player2ID];
    if (this.state.player3ID !== "" && this.state.player4ID !== "") {
      playerIDs.push(this.state.player3ID);
      playerIDs.push(this.state.player4ID);
    }
    console.log("PlayerIDs: ", playerIDs);

    let winnerIDs = [this.state.winner1ID];
    if (this.state.winner2ID !== "") {
      winnerIDs.push(this.state.winner2ID);
    }
    console.log("WinnerIDs: ", winnerIDs);

    this.props.addGameResult({
      playerIDs: playerIDs,
      winnerIDs: winnerIDs,
      resultDate: new Date().toISOString()
    });
    this.resetState();
  }

  resetState() {
    this.setState({
    });
  }

  handleChange(event) {
    switch(event.target.id) {
      case "player1":
        this.setState({ player1ID: event.target.value });
        break;
      case "player2":      
        this.setState({ player2ID: event.target.value });
        break;
      case "player3":      
        this.setState({ player3ID: event.target.value });
        break;
      case "player4":      
        this.setState({ player4ID: event.target.value });
        break;
      case "winner1":      
        this.setState({ winner1ID: event.target.value });
        break;
      case "winner2":      
        this.setState({ winner2ID: event.target.value });
        break;
      default:
        console.warn('Unhandled event target: ' + event.target.id);
        break;
    }
  }
  render() {
    return (
      <div className="AddGameResult">
        {this.props.successNotification && setTimeout(this.props.successNotificationEnd, 2000) &&
          <Alert variant='success' onClose={()=> this.props.successNotificationEnd()} 
            dismissible>Game Result Successfully Added</Alert>}
        {this.props.errorNotification && setTimeout(this.props.errorNotificationEnd, 4000) &&
          <Alert variant='danger' onClose={()=> this.props.errorNotificationEnd()}
          dismissible transition>Got an error</Alert>
        }
        <h1>Add Game Result</h1>
        <Form>
          <Form.Group className="mb-3" controlId="player1">
            <Form.Control type="input" placeholder="Enter Player 1 ID" 
              onChange={ this.handleChange }
              value={ this.state.player1ID }
            />  
          </Form.Group>
          <Form.Group className="mb-3" controlId="player2">
            <Form.Control type="input" placeholder="Enter Player 2 ID" 
              onChange={ this.handleChange }
              value={ this.state.player2ID }
            />  
          </Form.Group>
          <Form.Group className="mb-3" controlId="player3">
            <Form.Control type="input" placeholder="Enter Player 3 ID" 
              onChange={ this.handleChange }
              value={ this.state.player3ID }
            />  
          </Form.Group>
          <Form.Group className="mb-3" controlId="player4">
            <Form.Control type="input" placeholder="Enter Player 4 ID" 
              onChange={ this.handleChange }
              value={ this.state.player4ID }
            />  
          </Form.Group>
          <Form.Group className="mb-3" controlId="winner1">
            <Form.Control type="input" placeholder="Enter Winner 1 ID" 
              onChange={ this.handleChange }
              value={ this.state.winner1ID }
            />  
          </Form.Group>
          <Form.Group className="mb-3" controlId="winner2">
            <Form.Control type="input" placeholder="Enter Winner 2 ID" 
              onChange={ this.handleChange }
              value={ this.state.winner2ID }
            />  
          </Form.Group>

          <Button variant="primary" type="submit"
            size="lg"
            disabled={this.props.loading}
            onClick={!this.props.loading ? this.onAddGameResult : null}
          >
            Add Game Result
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.gameResultReducer,
  ...state.notificationReducer
 })

 const mapDispatchToProps = dispatch => ({
   addGameResult: (gameResultInput) => dispatch(addGameResult(gameResultInput)),
   successNotificationEnd: () => dispatch(successNotificationEnd()),
   errorNotificationEnd: () => dispatch(errorNotificationEnd()),
 })
export default connect(mapStateToProps, mapDispatchToProps)(AddGameResult);

