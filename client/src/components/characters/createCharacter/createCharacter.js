import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateCharacter() {
  const classes = useStyles();

  const [character, setCharacter] = useState({ 
    name: '',
    mass: '',
    height: '',
    species: '',
    home_planet: ''
  });

  const createCharacter = () => {
    // use axios to send data from front-end to back-end
    console.log(character);
    axios.post('http://localhost:5000/create-character', character);
  }

  return (
    <>
    <h2>Create Character</h2>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Name" variant="outlined" value={character.name} onChange={(e) => {
        setCharacter({ ...character, name: e.target.value });
      }} />
      <TextField id="outlined-basic" label="Height" variant="outlined" value={character.height} onChange={(e) => {
        setCharacter({ ...character, height: e.target.value });
      }} />
      <TextField id="outlined-basic" label="Mass" variant="outlined" value={character.mass} onChange={(e) => {
        setCharacter({ ...character, mass: e.target.value });
      }} />
      <TextField id="outlined-basic" label="Species" variant="outlined" value={character.species} onChange={(e) => {
        setCharacter({ ...character, species: e.target.value });
      }} />
      <TextField id="outlined-basic" label="Home Planet" variant="outlined" value={character.home_planet} onChange={(e) => {
        setCharacter({ ...character, home_planet: e.target.value });
      }} />
      <Button variant="contained" color="primary" onClick={createCharacter}>Create</Button>
    </form>
    </>
  );
}
