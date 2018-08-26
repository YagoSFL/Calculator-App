import React, { Component } from 'react';

import Calc from  './calculadora/calc'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayValue: '0',
      value: null,
      operator: '',
      waitingOpr: false,
      history: []
    }

    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleOperation = this.handleOperation.bind(this)
    this.handlePercent = this.handlePercent.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleDot = this.handleDot.bind(this)
    this.toggleSignal = this.toggleSignal.bind(this)
    this.handleHistory = this.handleHistory.bind(this)
    this.clearHistory = this.clearHistory.bind(this)
    this.clearLastChar = this.clearLastChar.bind(this)
    
  }

  handleChangeValue(numero) {
    const { displayValue, waitingOpr } = this.state
    if (waitingOpr) {
      this.setState({ 
        displayValue: numero,
        waitingOpr: false })
    } else {
      this.setState({ displayValue: displayValue === '0' ? numero : displayValue  + numero })
    }

  }

  toggleSignal() {
    const { displayValue } = this.state
    
    const newValue = parseFloat(displayValue) * -1

    this.setState({displayValue: String(newValue)})
  }

  handlePercent(nextOperator) {
    const { displayValue, operator, value, history } = this.state
    const nextValue = parseFloat(displayValue)

    const operations = {
      '/': (prevValue, nextValue) => ((nextValue / 100) * prevValue) / prevValue,
      '*': (prevValue, nextValue) => (nextValue / 100) * prevValue,
      '+': (prevValue, nextValue) => ((nextValue / 100) * prevValue) + prevValue,
      '-': (prevValue, nextValue) => ((nextValue / 100) * prevValue) - prevValue,
      '%': (prevValue, nextValue) => nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    if (value == null) {
      this.setState({ 
        value: nextValue
      })
    } else if(operator) {
      const currentValue = value || 0
      const computedValue = operations[operator](currentValue, nextValue)
      this.setState({ value: computedValue, displayValue: String(computedValue),
        history: history.concat({v1: value, op: operator, v2: String(displayValue) + '%', result: computedValue })})

    }
    
    this.setState({ waitingOpr: true, operator: nextOperator })
  }

  handleOperation(nextOperator) {
    const { displayValue, operator, value, history } = this.state
    const nextValue = parseFloat(displayValue)

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue,
      '%': (prevValue, nextValue) => nextValue
    }

    if (value == null) {
      this.setState({ 
        value: nextValue
      })
    } else if(operator) {
      const currentValue = value || 0
      const computedValue = operations[operator](currentValue, nextValue)
      this.setState({ value: computedValue, displayValue: String(computedValue),
        history: history.concat({v1: value, op: operator, v2: displayValue, result: computedValue })})

    }
    
    this.setState({ waitingOpr: true, operator: nextOperator })
  }

  handleHistory(i) {
    const { history } = this.state
    const signal = operator => operator.op !== "=" && operator.op !== "%"
    const newHistory = history.filter(signal)

    this.setState({displayValue: String(newHistory[i].result)})
  }
  
  handleClear() {
    this.setState({ ...this.state, displayValue: '0', value: null, waitingOpr: false, 
        operator: ''})
  }

  clearLastChar() {

    const { displayValue } = this.state

    this.setState({ displayValue: displayValue.substring(0, displayValue.length - 1) || '0' })
  }
  
  clearHistory() {
    this.setState({history: []})
  }

  handleDot() {
    const { displayValue } = this.state
    if(!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingOpr: false
      })
    } 
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <Calc handleChangeValue={this.handleChangeValue}
              handleOperation={this.handleOperation}
              handlePercent={this.handlePercent}
              displayValue={this.state.displayValue}
              handleClear={this.handleClear}
              handleDot={this.handleDot}
              history={this.state.history}
              toggleSignal={this.toggleSignal}
              handleHistory={this.handleHistory}
              clearHistory={this.clearHistory}
              clearLastChar={this.clearLastChar}/>
      </React.Fragment>
    )
  }
}

export default App;
