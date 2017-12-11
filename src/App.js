import React, { Component } from 'react';
import Tweets from './components/tweets';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className='section'>
        <div>
          <Tweets />
        </div>
      </div>
    );
  }
}

export default App;
