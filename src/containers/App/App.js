import React, { Component } from 'react';
import NavBar from '../../components/Navbar/NavBar';
// import logo from './logo.svg';
// import './App.css';
import Tree from 'react-tree-graph';



class App extends Component {
    constructor() {
        super();
        this.state = {

          data : {
            name: 'Parent',
            children: [{
              name: 'Child One'
            }, {
              name: 'Child Two'
            }, {
              name: 'Child Three'
            }]
          }

        }
    }
    onClick = (event, nodeKey) =>  {

      // onCLICK
      // add your modal
      alert(nodeKey);

      this.setState({data : {
          name: 'Parent',
          children: [{
            name: 'Child One'
          }, {
            name: 'Child Two'
          }]
        }})
  };

    render() {
        return (
            <div className="App">
                <NavBar />
              <Tree
                  data={this.state.data}
                  height={400}
                  width={600}
                  gProps={{
                    onClick: this.onClick
                  }}/>
            </div>
        );
    }
}

export default App;
