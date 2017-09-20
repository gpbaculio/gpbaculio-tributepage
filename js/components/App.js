import 'babel-polyfill'
import React, { Component } 
  from 'react';

class App extends Component {

  state = {
    timeFor: 'Session',
    sessionLength: 1,
    breakLength: 1,
    color: 'green',
    timeStart: false,
    displayTime: '00:00:00',
    timeLeftInSeconds: 0,
    clicks: 0,
    pause: 'false',
    startTimer: 0
  }

  secondsToHms = (seconds) => {
    seconds = Number(seconds);
    var hour = Math.floor(seconds / 3600); // 3600 = seconds in 1 hour
    var minutes = Math.floor(seconds % 3600 / 60);
    var seconds = Math.floor(seconds % 3600 % 60);
    return (
      (hour > 0 // hour greater than 0
        ? hour + ":" + (minutes < 10 ? "0" : "") : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    ); 
  }

  _playTimer = (timeLength) => {
     var timeLength = timeLength*60; // multiply by 60, 60 = mins
     var startTimer = setInterval(() => {
      timeLength = timeLength - 1; 
      var timeToDisplay = this.secondsToHms(timeLength)
      this.setState((state, props) => ({ startTimer, pause: false, timeLeftInSeconds: timeLength, displayTime: timeToDisplay }));
      if(timeLength === 0 ) {
        clearInterval(this.state.startTimer)
        this.setState((state, props) => ({ timeFor: Boolean(this.state.timeFor === 'Session') ? 'Break' : 'Session'}), () => this._playTimer(Boolean(this.state.timeFor === 'Session') ? Math.ceil(this.state.sessionLength): Math.ceil(this.state.breakLength)));
      }
    },1000)
  }
  _startTimer = () => {
    this.setState((state, props) => ({ clicks: state.clicks+1, }), () => {
      if(this.state.clicks % 2 === 0) {
        this.setState((state, props) => {
          if(this.state.timeFor==='Session') {
            return {
               pause: true, 
               sessionLength: this.state.timeLeftInSeconds / 60
            }
          } 
          if(this.state.timeFor==='Break') {
            return {
              pause: true, 
              breakLength: this.state.timeLeftInSeconds / 60
            }
          }
        });
        clearTimeout(this.state.startTimer)
      return;
    } else {
    this._playTimer(Boolean(this.state.timeFor === 'Session') ? this.state.sessionLength: this.state.breakLength)
  }
    });
  }

  render() {
    var timeLength = Boolean(this.state.timeFor === 'Session')  ? this.state.sessionLength : this.state.breakLength
    var denom = 60 * timeLength; // denom is time length * 60
    var timeLeftinSeconds = this.state.timeLeftInSeconds; // make formula
    var perc = Math.abs((timeLeftinSeconds / denom) * 100 - 100);
    var fill = { 
      'height' : 100-perc + '%',
      'backgroundColor'  : '#4CAF50'
    };


    return (
        <div> 
          <span className="title"> ReactJs Pomodoro Clock </span>
            <div className="container">
            <span> Advanced FrontEnd Development Project </span>
            <div id="clock" 
              style={this.state.timeStart ? {
      'border' : '2px solid ' + 'green',
      backgroundColor: 'green'
    } : {
      'border' : '2px solid ' + 'green',
      backgroundColor: '#4CAF50'
    }} onClick={() => this.setState((state, props) => ({ timeStart: true }), () => this._startTimer())}>
          <div style={fill}>
            <span style={{textAlign: 'center'}}>{this.state.timeFor} <br/> {this.state.timeStart ? this.state.displayTime : Boolean(this.state.timeFor === 'Session') ? Math.round(this.state.sessionLength) : Math.round(this.state.breakLength)}</span>
          </div>
        </div>
        <div className="length-container">
       <div id="break"> 
        <button  disabled={this.state.pause === false || this.state.breakLength===1} className="button" onClick={() => this.setState((state, props) => ({ timeStart: false, breakLength: Math.round(state.breakLength-1)}))}>-</button>
          <span style={{ margin: '0 8px'}}><strong>{Math.round(this.state.breakLength)}</strong></span> 
        <button disabled={this.state.pause === false} className="button" onClick={() => this.setState((state, props) => ({ timeStart: false, breakLength: Math.round(state.breakLength+1)}))}> + </button><br/> Break Length </div>
        <div id="session"> 
        <button  disabled={this.state.pause === false || this.state.sessionLength===1} className="button" onClick={() => this.setState((state, props) => ({ timeStart: false, sessionLength: Math.round(state.sessionLength-1)}))}>-</button> 
          <span style={{ margin: '0 8px'}}><strong>{Math.round(this.state.sessionLength)}</strong></span>
        <button disabled={this.state.pause === false} className="button" onClick={() => this.setState((state, props) => ({ timeStart: false, sessionLength: Math.round(state.sessionLength+1)}))}> + </button> <br/> Session Length </div>
       </div>
        
              <div style={{marginTop: '40px'}}>
                <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-pomodoro-clock.herokuapp.com/" target="_blank" > link </a> </span>
                <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-pomodoro-clock" target="_blank" > link </a> </span>
            </div>
            </div>
          <span className="footer"> Developed by Glendon Philipp Baculio </span>
        </div>
    )
  }
}
export default App
