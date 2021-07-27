import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Character from './components/showCharacter/showCharacter.js'
import CreateCharacter from './components/createCharacter/createCharacter.js'
import './App.css';
import useStyles from './style.js';

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">Characters</Typography>
        </AppBar>

        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch">
              <Grid item xs={12} sm={7}>
                <AppBar className={classes.appbar} position="static" color="inherit">
                  <Character/>
                </AppBar>
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppBar className={classes.appbar} position="static" color="inherit">
                  <CreateCharacter/>
                </AppBar>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
