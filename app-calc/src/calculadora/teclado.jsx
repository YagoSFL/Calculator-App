import React, {Fragment, Component} from 'react'
import Button from  '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import styles from './styles'

const operations = {
    '+': 'sum',
    '-': 'sub',
    '/': 'div',
    '*': 'mult',
    '=': 'equ'
}

export default class Teclado extends Component {
    

    renderNumber(i) {
        return(
            <Button style={styles.buttons} value={i} 
                onClick={() => this.props.clickNum(String(i))}>
                {i}
            </Button>
        )
    }
    renderOp(i, d){
        return(
            <Button style={styles.buttons} value={i} 
                onClick={() => this.props.clickOp(String(i))}>
                {d}
            </Button>
        )
    }

    handleKeyDown = (event) => {
        let { key } = event
        
        if (key === 'Enter'){
            event.preventDefault()
            this.props.clickOp('=')
        }
        
        
        if ((/\d/).test(key)) {
          event.preventDefault()
          this.props.clickNum(key)
        } else if(key in operations){
            event.preventDefault()
            this.props.clickOp(key)
        } else if (key === '%') {
            event.preventDefault()
            this.props.clickPercent(key)
        } else if (key === 'Delete') {
            event.preventDefault()
            this.props.clickClear()
        } else if (key === 'n') {
            event.preventDefault()
            this.props.clickSignal()
        } else if (key === ',') {
            event.preventDefault()
            this.props.clickDot()
        } else if (key === 'Backspace') {
            event.preventDefault()
            this.props.clearLastChar()
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }
      
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    render(){
        
        const {clickDot, clickSignal, clickClear, clickOp, clickPercent} = this.props

        return (
            <Fragment>
                <Grid container spacing={16}>
                <Grid item xs={3} md={3}>
                    {this.renderNumber(7)}
                    {this.renderNumber(4)}
                    {this.renderNumber(1)}
                    <Button style={styles.buttons} onClick={clickDot}>,</Button>
                    <Button style={styles.buttons} onClick={clickSignal}>±</Button>                 
                </Grid>
                <Grid item xs={3} md={3}>
                    {this.renderNumber(8)}
                    {this.renderNumber(5)}
                    {this.renderNumber(2)}
                    {this.renderNumber(0)}
                    <Grid item xs={6} md={6}>
                        <Button style={styles.clear} onClick={clickClear}>AC</Button>
                    </Grid>   
                </Grid>
                <Grid item xs={3} md={3}>
                    {this.renderNumber(9)}
                    {this.renderNumber(6)}
                    {this.renderNumber(3)}
                    <Button style={styles.buttons} onClick={() => clickOp('=')}>=</Button>
                </Grid>
                <Grid item xs={3} md={3} style={styles.central} >
                    <Button style={styles.buttons} onClick={() => clickPercent('%')}>%</Button>
                    {this.renderOp('/', '÷')}
                    {this.renderOp('*', '×')}
                    {this.renderOp('-', '-')}
                    {this.renderOp('+', '+')}           
                </Grid>
            </Grid>
            </Fragment>
        )
    }
}