import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ShowCharacter() {
  const classes = useStyles();

  const [charactersList, setCharactersList] = useState([]);

  const deleteCharacterAPI = process.env.NODE_ENV === 'production' ? `https://star-wars-library-kaipo.herokuapp.com/characters/${id}` : `http://localhost:5000/characters/${id}`;
  const getCharactersAPI = process.env.NODE_ENV === 'production' ? `https://star-wars-library-kaipo.herokuapp.com/characters` : 'http://localhost:5000/characters';

  const deleteCharacter = (id) => {
    axios.delete(deleteCharacterAPI).then(() => {
      window.location.reload(false);
    });
  }

  useEffect(() => {
    axios.get(getCharactersAPI).then((allCharacters) => {
      setCharactersList(allCharacters.data);
    });
  }, []);

  return (
    <>
    <h2>All Characters</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Mass</TableCell>
            <TableCell align="right">Species</TableCell>
            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {charactersList.map((character, key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {character.name}
              </TableCell>
              <TableCell align="right">{character.height}</TableCell>
              <TableCell align="right">{character.mass}</TableCell>
              <TableCell align="right">{character.species}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteCharacter(character._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}