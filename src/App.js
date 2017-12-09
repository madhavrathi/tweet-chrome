import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Tweets from './components/tweets';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <div>
          <Tweets />
        </div>
      </div>
    );
  }
}

export default App;
