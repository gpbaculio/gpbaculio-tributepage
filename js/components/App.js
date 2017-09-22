import 'babel-polyfill'
import React, { Component } 
  from 'react';

class Button extends Component {
  onButtonClick = (e) => {
      this.props.handleMethods(e.target.value);
  }
  _buttonStyle = () => {
    if([1,2,3].includes(this.props.item)) {
        return {
        top: '-35px',
        position: 'relative',
        margin: '10px',
        fontSize: '24px',
        width: '50px',
        height: '50px',
        border: 'solid #00ADE8 1px',
        color: '#00ADE8'
      }
    }
    if(this.props.item===0) {
      return {
        position: 'absolute',
        top: '361px',
        width: '120px',
        left: '10px',
        margin: '10px',
        fontSize: '24px',
        height: '50px',
        border: 'solid #00ADE8 1px',
        color: '#00ADE8'
      }
    }
    if(this.props.item==='.') {
      return {
        position: 'absolute',
        top: '361px',
        width: '50px',
        left: '150px',
        margin: '10px',
        fontSize: '24px',
        height: '50px',
        border: 'solid #00ADE8 1px',
        color: '#00ADE8'
      }
    }
    if(['AC','CE'].includes(this.props.item)) {
      return {
        margin: '10px',
        fontSize: '20px',
        width: '50px',
        height: '50px',
        border: 'solid white 1px',
        backgroundColor: '#00ADE8',
        color: 'white'
      }
    }
    if(this.props.item === '=') {
      return {
        position: 'relative',
        margin: '10px',
        fontSize: '24px',
        width: '50px',
        height: '120px',
        border: 'solid white 1px',
        backgroundColor: '#00ADE8',
        color: 'white'
      };
    }
    return {
        margin: '10px',
        fontSize: '24px',
        width: '50px',
        height: '50px',
        border: 'solid #00ADE8 1px',
        color: '#00ADE8'
    }
  }

  _toDisable = () => {
    var g = []; // if length of this === 0, that means there's no operator on history, yet
    
    this.props.history.split('').map((item,index) => ['+','x','-','÷'].map((i) => {
      if(i === item) {
        g.push(i)
      } 
    }));

    if(this.props.item==="=" && ['+','x','-','÷'].includes(this.props.history.charAt(this.props.history.length-1))){
      return true;
    } else if(this.props.item==="=" && g.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {

    return (
      <button
        disabled={this._toDisable()}
        className="btn btn-default"
        style={this._buttonStyle()}
        value={this.props.item}
        onClick={(e) => this.onButtonClick(e)}
        >{this.props.item}</button>
    );
  }
}
class App extends Component {

    state = {      
      answer: '0',
      history: '0'
    };

    _renderButtons = () => {
      // chars for our calculator
      let items = ['AC', 'CE', '÷','x',7,8,9,'-',4,5,6,'+',1,2,3,'=',0,'.']; 
      return items.map((item) => {
        return(<Button 
                history={this.state.history}
                handleMethods={this.handleMethods}
                item = {item}
              />);
      });
    }
    
    handleUserInput = (item) => {
      var answerState, historyState;
      if(this.state.answer.includes('.') && item === '.') {
        return;
      }
      if(this.state.answer.charAt(0) === '0' && item === '0') {
        return;
      }
      if(['+','x','-','÷'].includes(this.state.answer.charAt(this.state.answer.length-1)) && ['+','x','-','÷'].includes(item)){
        return;
      }
      if(['+','x','-','÷'].includes(item)){
        answerState = item;
        historyState = this.state.history.concat(item);
        if(this.state.history.includes('=')) {
          historyState = this.state.answer.concat(item)
        }
      } else if(['+','x','-','÷'].includes(this.state.answer.charAt(0))) {
        answerState = item;
        historyState = this.state.history.concat(item)
      } else if(item === '=') {
        var formulaEval = this.state.history;
            formulaEval = formulaEval.toString();
        if(formulaEval.includes('x')) {
          formulaEval = formulaEval.replace(/(\x)/,'*')
        }
        if(formulaEval.includes('÷')) {
          formulaEval = formulaEval.replace(/(\÷)/,'/')
        }
        answerState = eval(formulaEval.toString());
        answerState = answerState.toString();
        if(answerState.includes('.')) {
          answerState = Number(answerState).toFixed(2)
          answerState = answerState.toString()
        }
        historyState = formulaEval.toString();
        if(historyState.toString().includes('/')) {
          historyState = historyState.replace(/(\/)/,'÷')
        }
        if(historyState.toString().includes('*')) {
          historyState = historyState.replace(/(\*)/,'x')
        }
        historyState = historyState.concat('='+answerState)
      } else if(this.state.history.includes('=')) {
        answerState = item;
        historyState = item;
      }else {
        answerState = this.state.answer.concat(item)
        historyState = this.state.history.concat(item)
      }
      this.setState((state, props) => ({ answer: answerState.toString(), history: historyState.toString() }));
    }

    handleMethods = (item) => {
      if(item==="AC") {
        this.setState((state, props) => ({
          answer: '0',
          history: '0'
        }));
        return;
      } 
      if(item==="CE") {
        if(!this.state.history.includes('=') && this.state.answer === this.state.history.slice(-this.state.answer.length) && this.state.history.length>this.state.answer.length) {
          this.setState((state, props) => ({ answer: '0', history: this.state.history.slice(0, -this.state.answer.length) }));
          return;
        } else if(this.state.history.includes('=')) {
          this.setState((state, props) => ({ answer: '0', history: '0' }));
        }else {
          this.setState((state, props) => ({ answer: '0', history: '0' }));
          return;
        }
      } else if(this.state.history === '0' && this.state.answer === '0') {
        this.setState((state, props) => ({ answer: '', history: ''}), () => this.handleUserInput(item));
      } else if( this.state.answer === '0' && ['+','x','-','÷'].includes(this.state.history.charAt(this.state.history.length-1))) {
         this.setState((state, props) => ({ answer: '' }), () => this.handleUserInput(item));
      }else {
        console.log("ce failed")
        this.handleUserInput(item) 
      } 
    }

  render() {

    let { answer, history, warning } = this.state;

    return (<div><span className="title"> Reactjs Calculator </span>
            <div className="container">
            <div className="calculator">
              <div className="text-center">
                <div className="display-container">
                  <p className="display" id="answer">{answer}</p>
                  <p className="display" id="history">{history}</p>
                </div>
                {this._renderButtons()}
                <p>{warning}</p>
              </div>
            </div>
            <div> 
              <div style={{marginTop: '40px'}}>
                  <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-twitchtv-api.herokuapp.com/" target="_blank" > link </a> </span>
                  <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-twitchtv-api" target="_blank" > link </a> </span>
              </div>
            </div>
          
        </div>
        <span className="footer"> Developed by Glendon Philipp Baculio </span>
    </div>);
  }
}

export default App;
