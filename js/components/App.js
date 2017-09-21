import 'babel-polyfill'
import React, { Component } 
  from 'react';

class App extends Component {

  state = {
    boxes: [1,2,3,4,5,6,7,8,9],
    winningPairs: [ [1,2,3], [4,5,6], [7,8,9], [1,5,9], [3,5,7],[1,4,7],[2,5,8],[3,6,9]],
    playerInputs:[],
    computerInputs:[],
    result: '',
    playerType: false,
    computerType: false,
    firstTurn: [],
    winner:false,
    playerCanClick: true,
    draw:false
  }

  checkWinner = (inputs) => {
    this.state.winningPairs.forEach((item, index) => {
       var win =[]
      inputs.forEach((inputItem, inputIndex) => {
        if(item.includes(inputItem)) {
          win.push(inputItem)
        }
      })

      if(win.length === 3) {
        var winner;
        if(inputs === this.state.computerInputs) {
          winner = 'Computer'
        } else {
          winner = 'You'
        }
        setTimeout(() => alert(winner+' won!'), 500)
        this.setState((state, props) => ({ winner }));

      }

    })
    if(!this.state.winner && (this.state.playerInputs.length + this.state.computerInputs.length === 9)) {
      alert('Draw!')
      this.setState((state, props) => ({ draw: true}));
    }
  }
  _onPlayerClick = (item) => {
    this.setState((state, props) => ({ playerCanClick: false, firstTurn: [...state.firstTurn, state.firstTurn[state.firstTurn.length-1]+1 ], playerInputs: [...state.playerInputs, item] }), () => {
      this.checkWinner(this.state.playerInputs)
      if(this.state.winner) {
        return;
      } else if(!this.state.winner){
        if(this.state.computerInputs.length+this.state.playerInputs.length < 9) {
          setTimeout(() => this._computerTurn(), 4500)
        }
      }
    })
  }

  _computerTurn = () => {
    var item = this._strictGetRandomArbitrary();
    this.setState((state, props) => ({ playerCanClick: true, firstTurn: [...state.firstTurn, state.firstTurn[state.firstTurn.length-1]+1 ], computerInputs:[...state.computerInputs, item] }), () => {
      this.checkWinner(this.state.computerInputs)
    });
  }

  _strictGetRandomArbitrary = () => {
    var item = Math.round(Math.random() * (9 - 1) + 1)
    if(this.state.computerInputs.includes(item)) {
      return this._strictGetRandomArbitrary()
    } else if(this.state.playerInputs.includes(item)) {
      return this._strictGetRandomArbitrary()
    } else {
      return item;
    }
  }

  getRandomArbitrary = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }

  _firstTurn = () => {
    return this.getRandomArbitrary(1,2);
  }

  componentDidMount() {
    this.setState((state, props) => ({ firstTurn: [...state.firstTurn, this._firstTurn()] }), () => {
      if(Boolean(this.state.firstTurn.length === 1 && this.state.firstTurn[this.state.firstTurn.length-1] % 2 !== 0)) {
        setTimeout(() => this._computerTurn(), 600)
      }  
    })
  }

  _showType = (item) => {
    if(this.state.computerInputs.includes(item)) {
      return this.state.computerType;
    } else if(this.state.playerInputs.includes(item)) {
      return this.state.playerType;
    } else {
      return '';
    }
  }

  _showWinner = () => {
    if(this.state.winner) {
          setTimeout(() => {
            location.reload()
        },3000)
   
      return this.state.winner+' won!'
    }
    if(this.state.draw) {
      setTimeout(() => {
        location.reload()
      },3000)
      return 'Draw!'
    }
    return Boolean(this.state.firstTurn[this.state.firstTurn.length-1] % 2 === 0) ? 'Your turn' : 'Computers\' turn';
  }

  _disableButton = (item) => {
    if(this.state.playerInputs.includes(item) || this.state.computerInputs.includes(item)) {
      return true
    }
    if(!this.state.playerCanClick) {
      return true
    } 
  }

  render() {

    return (
        <div> 
          <span className="title"> ReactJs Pomodoro Clock </span>
            <div className="container">
              <div> Advanced FrontEnd Development Project </div>
               {this.state.playerType ? 
                (<div><div style={{margin:'40px auto 0 auto', textAlign: 'center', height: '350px', width: '350px'}}>
                  {this.state.boxes.map((item,index) => {
                    return (<button disabled={this._disableButton(item)} key={index} className="itemTac" onClick={(e) => this._onPlayerClick(item)} style={{ cursor: 'pointer', float: 'left', fontSize:'36px', display: 'inline-block', border: "solid #333 1px", height: '33%', lineHeight: '33%', width: '33%', position: 'relative', boxSizing: 'border-box'}}>
                            {this._showType(item)}</button>)
                  })}
                </div><div style={{marginTop: '16px', fontSize: '24px'}}> {this._showWinner()}</div></div>) : 
                (<div style={{ color: 'white', backgroundColor: '#4caf50', padding: '12px 24px 24px 12px', marginTop: '40px'}}> Choose between <span style={{ color: '#006400', margin: '3px' }}>X</span> or <span style={{ color: '#006400', margin: '3px' }}>O</span>?
                  <div style={{marginTop: '12px'}}>
                    <span style={{ margin: '8px', fontSize: '20px', color: '#006400'}} className="x" onClick={() => this.setState((state, props) => ({ playerType: 'X', computerType: 'O'}))}> X </span> 
                    <span style={{ margin: '8px', fontSize: '20px', color: '#006400'}} className="o" onClick={() => this.setState((state, props) => ({ playerType: 'O', computerType: 'X'}))}> O </span>
                  </div> 
                </div>)}
              <div style={{marginTop: '30px'}}>
                <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-pomodoro-clock.herokuapp.com/" target="_blank" > link </a> </span>
                <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-tictactoe" target="_blank" > link </a> </span>
              </div>
            </div>
          <span className="footer"> Developed by Glendon Philipp Baculio </span>
        </div>
    )
  }
}
export default App
