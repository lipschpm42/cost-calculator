import React, { useState, useEffect } from 'react';
import { MenuItem, Select, makeStyles, Input, InputAdornment, Checkbox, Grid } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  selectMenu: {
    // marginRight: theme.spacing(3),
    // marginLeft: theme.spacing(3),
    minWidth: 80,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  inputBox: {
    // marginRight: theme.spacing(3),
    // marginLeft: theme.spacing(3),
    width: 65,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
    marginTop: theme.spacing(0)
  },
  checkBox: {
    // marginRight: theme.spacing(3),
    // marginLeft: theme.spacing(3),
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  display: {
    // marginRight: theme.spacing(3),
    // marginLeft: theme.spacing(3),
    width: 50,
    fontSize: '15px',
  },
  gridItem: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

function MaterialRow(props) {
  const [cost, setCost] = useState(5.99)
  const [yards, setYards] = useState(1)
  const [width, setWidth] = useState(56)
  // const [design, setDesign] = useState()
  const [onFold, setOnFold] = useState(false)
  const [squareSize, setSquareSize] = useState(10)
  const [squareCount, setSquareCount] = useState(10)
  const [squareCountMax, setSquareCountMax] = useState()
  const [total, setTotal] = useState()

  const classes = useStyles();


  useEffect(() => {
    let squaresTall = Math.floor((yards * 36) / squareSize)
    let squaresWide = Math.floor(width / squareSize)
    setSquareCountMax(squaresWide * squaresTall)
    if (onFold) {
      let squaresWide = Math.floor(width / squareSize / 2)
      setSquareCountMax(squaresWide * squaresTall * 2)
    }

    if (squareCountMax !== 0) {
      setTotal(((cost * yards * 1.05) / squareCountMax * squareCount).toFixed(2))
      props.materialCost(props.materialNum, total)
    }
    else {
      setTotal("Error")
    }
  }, [yards, squareSize, width, onFold, squareCountMax, cost, squareCount, props, total]);

  const costChange = (e) => {
    if (e.target.value.match("^[0-9]*[.]?[0-9]{0,2}$") !== null) {
      setCost(e.target.value)
    }
  }
  const yardsChange = (e) => {
    if (e.target.value.match("^[0-9]*$") !== null) {
      setYards(e.target.value)
    }
  }
  const widthChange = (e) => {
    if (e.target.value.match("^[0-9]*$") !== null) {
      setWidth(e.target.value)
    }
  }
  const squareSizeChange = (e) => {
    setSquareSize(e.target.value)
  }
  // const designChange = (e) => { }
  const squareCountChange = (e) => {
    if (e.target.value.match("^[0-9]*$") !== null && e.target.value <= squareCountMax) {
      setSquareCount(e.target.value)
    }
  }

  return (
    <Grid container>
      <Grid item className={classes.gridItem}>
        <Input
          className={classes.inputBox}
          value={cost}
          onChange={costChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </Grid>
      <Grid item className={classes.gridItem}>
      <Input className={classes.inputBox} type='text' value={yards} onChange={yardsChange} />
      </Grid>
      <Grid item className={classes.gridItem}>
      <Input className={classes.inputBox} type='text' value={width} onChange={widthChange} />
      {/* <Input className={classes.inputBox} type='text'value={design}/>  */}
      </Grid>
      <Grid item className={classes.gridItem}>
      <Checkbox className={classes.checkBox} checked={onFold} color='primary' onChange={() => setOnFold(!onFold)} />
      </Grid>
      <Grid item className={classes.gridItem}>
      <Select
        defaultValue={10}
        value={squareSize}
        onChange={squareSizeChange}
        className={classes.selectMenu}
      >
        <MenuItem value={10}>10 X 10</MenuItem>
        <MenuItem value={9}>9 X 9</MenuItem>
        <MenuItem value={8}>8 X 8</MenuItem>
        <MenuItem value={7}>7 X 7</MenuItem>
        <MenuItem value={6}>6 X 6</MenuItem>
        <MenuItem value={5}>5 X 5</MenuItem>
      </Select>
      </Grid>
      <Grid item className={classes.gridItem}>
      <Input className={classes.inputBox} type='text' value={squareCount} onChange={squareCountChange} />
      </Grid>
      {/* <span className={classes.display}>{squareCountMax}</span> */}
      {/* <span className={classes.display}>${total}</span> */}
    </Grid>
  );
}

export default MaterialRow;
