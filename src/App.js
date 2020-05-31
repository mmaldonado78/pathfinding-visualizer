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
          // <div style={{width: '100vw', height: '100vh'}} onMouseMove={(e) => console.log(e)} >
              <Grid rows={this.ROWS} cols={this.COLS} />
          // </div>
      );
  }

}

export default App;
