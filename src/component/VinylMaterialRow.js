import React, { useState, useEffect } from 'react';
import { MenuItem, Select, makeStyles, Input, InputAdornment, Checkbox, Box } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  selectMenu: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    minWidth: 80,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  inputBox: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    width: 65,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
    marginTop: theme.spacing(0)
  },
  checkBox: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  display: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    width: 50,
    fontSize: '15px',
  },
}));

function MaterialRow(props) {
  const [cost, setCost] = useState(11.99)
  const [sheets, setSheets] = useState(1)
  const [total, setTotal] = useState()

  const classes = useStyles();


  useEffect(() => {
    setTotal((cost * sheets * 1.05).toFixed(2))
    props.materialCost(props.materialNum, total)
  }, [sheets, cost, total]);

  const costChange = (e) => {
    if (e.target.value.match("^[0-9]*[.]?[0-9]{0,2}$") !== null) {
      setCost(e.target.value)
    }
  }
  const sheetssChange = (e) => {
    if (e.target.value.match("^[0-9]*[.]?[0,5]{0,1}$") !== null) {
      setSheets(e.target.value)
    }
  }

  return (
    <Box>
      <Input
        className={classes.inputBox}
        value={cost}
        onChange={costChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
      <Input className={classes.inputBox} type='text' value={sheets} onChange={sheetssChange} />
      {/* <span className={classes.display}>${total}</span> */}
    </Box>
  );
}

export default MaterialRow;
