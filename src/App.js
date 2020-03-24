import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid.js'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.ROWS = 20;
        this.COLS = 30;
    }
  render() {
      return (
          <Grid rows={this.ROWS} cols={this.COLS} />
      );
  }

}

export default App;
