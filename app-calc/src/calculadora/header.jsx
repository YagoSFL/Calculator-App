import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = {
  menu: {
    flexGrow: 1,
    background: '#00695C'
  }
}

export default props => (
    <AppBar position="fixed" style={styles.menu} >
      <Toolbar>
        <Typography variant="title" color="inherit">
          Calculadora
        </Typography>
      </Toolbar>
    </AppBar>
)


