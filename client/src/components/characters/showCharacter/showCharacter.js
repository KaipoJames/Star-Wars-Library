import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const columns = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'height', label: 'Height', minWidth: 80 },
  {
    id: 'mass',
    label: 'Mass',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'species',
    label: 'Species',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [charactersList, setCharactersList] = useState([]);

  const deleteCharacterAPI = (id) => { return process.env.NODE_ENV === 'production' ? `https://star-wars-library-kaipo.herokuapp.com/characters/${id}` : `http://localhost:5000/characters/${id}` };
  const getCharactersAPI = process.env.NODE_ENV === 'production' ? `https://star-wars-library-kaipo.herokuapp.com/characters` : 'http://localhost:5000/characters';

  const deleteCharacter = (id) => {
    axios.delete(deleteCharacterAPI(id)).then(() => {
      window.location.reload(false);
    });
  }
  useEffect(() => {
    axios.get(getCharactersAPI).then((allCharacters) => {
      setCharactersList(allCharacters.data);
    });
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {charactersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((character) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={character.code}>
                  {columns.map((column) => {
                    const value = character[column.id];
                    if (column.id === 'action') {
                      return(
                        <>
                          <TableCell key={column.id} align={column.align}>
                            <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteCharacter(character._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </>
                      )
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={charactersList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
