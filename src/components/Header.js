import React, { Component } from 'react';
import { Navbar,Nav,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
  
class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">PP Scores</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Top Players</Nav.Link>
              <Nav.Link as={Link} to="/addPlayer">Add Player</Nav.Link>
              <Nav.Link as={Link} to="/allPlayers">All Players</Nav.Link>
              <Nav.Link as={Link} to="/addGameResult">Add Game Result</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      
    );
  }
}
export default Header;