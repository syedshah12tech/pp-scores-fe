import React, { Component } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AddPlayer from './components/AddPlayer';
import Header from './components/Header';
import TopPlayers from './components/TopPlayers';
import AllPlayers from './components/AllPlayers';
import AddGameResult from './components/AddGameResult';

class App extends Component {  
  render() {
    return (
      <div className="App">
        <Router>
          <Header></Header>
          <div className="container">
            <Routes>
              <Route path="/" element={< TopPlayers />}/>
              <Route path="/addPlayer" element={< AddPlayer />}/>
              <Route path="/allPlayers" element={< AllPlayers />}/>
              <Route path="/addGameResult" element={< AddGameResult />}/>
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
  
}
export default App;