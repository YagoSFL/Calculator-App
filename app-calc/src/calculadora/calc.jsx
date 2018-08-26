import React, {Fragment} from 'react'
import Teclado from './teclado'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Header from './header'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Textfit from 'react-textfit'
import Button from  '@material-ui/core/Button'

import styles from './styles'

export default props => {

    const renderHistory = () => {
        const history = props.history || ''
        const signal = operator => operator.op !== "=" && operator.op !== "%"
        const memoria = history.filter(signal)
        return memoria.map((opr, i) => (
            <ListItem key={i}>
                <Button onClick={() => props.handleHistory(i)}>
                    <Typography variant="headline">
                        {parseFloat(opr.v1).toFixed(2).replace(/\.0+$/,'')}
                        {opr.op}
                        {opr.v2}
                    </Typography>      
                </Button>
            </ListItem>
        ))
    }

    const language = navigator.language || 'pt-BR'
    let formattedValue = parseFloat(props.displayValue).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })
    
    // Add back missing .0 in e.g. 12.0
    const match = props.displayValue.match(/\.\d*?(0*)$/)
    
    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

    return (
        <Fragment>
            <Grid container spacing={16}  style={{paddingTop: 55}} >
                <Header/>
                <Grid item sm md={3}>
                    <Paper style={styles.paper}>
                        <Paper style={styles.visor}> 
                        
                            <Textfit mode='single'>
                                {formattedValue}
                            </Textfit>
                  
                        </Paper>
                            <Teclado
                                clickNum={(value) => props.handleChangeValue(value)} 
                                clickOp={(value) => props.handleOperation(value)}
                                clickClear={props.handleClear}
                                clickDot={props.handleDot}
                                clickSignal={props.toggleSignal}
                                clickPercent={(value) => props.handlePercent(value)}
                                clearLastChar={props.clearLastChar}
                            /> 
                    </Paper>
                </Grid>
                <Grid item sm md='auto'>
                    <Paper style={styles.paper}>
                        <Typography variant="display1">
                            Histórico
                        </Typography>
                        <List component="nav">
                            {renderHistory()}
                            <Button onClick={props.clearHistory}>
                                Limpar
                            </Button>  
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
} 

