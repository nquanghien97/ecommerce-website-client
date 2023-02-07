import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function DashBoard() {

  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Box>
        <Typography variant="h1">Welcome to DashBoard</Typography>
      </Box>
    </Container>
  )
}

export default DashBoard