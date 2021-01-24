import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid.js'
import Menu from './Menu.js'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.ROWS = 20;
        this.COLS = 30;
    }
  render() {
      return (
          <div id={"main"}>
            <Grid rows={this.ROWS} cols={this.COLS} />
            <Menu/>
          </div>


      );
  }

}

export default App;
