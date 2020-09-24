
import React, { useState, useEffect } from 'react';
import { MenuItem, Select, makeStyles, OutlinedInput, Input, InputAdornment, Checkbox } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  selectMenu: {
    margin: theme.spacing(1),
    minWidth: 80,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  inputBox: {
    margin: theme.spacing(1),
    width: 65,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  checkBox: {
    margin: theme.spacing(0),
    color: 'white'
  },
  display: {
    margin: theme.spacing(1),
    width: 50,
    fontSize: '15px',
  },
}));

function LaborRow(props) {
  const [wages, setWages] = useState(17.5)
  const [hours, setHours] = useState(10)
  const [totalLabor, setTotalLabor] = useState()
  
  const classes = useStyles();

  useEffect(() => {
    setTotalLabor((wages * hours).toFixed(2))
    props.laborCost(parseFloat(totalLabor))
  });

  const wagesChange = (e) => {
    if (e.target.value.match("^[1-9]*[.]?[0-9]{0,2}$") !== null) {

      setWages(e.target.value)

    }
  }
  const hoursChange = (e) => {
    if (e.target.value.match("^[1-9]*[.]?[0-9]{0,2}$") !== null) {
      setHours(e.target.value)
    }
  }

  return (
    <div className="InputRow" >
      <div>
        <span style={{ margin: 10, width: '50px' }}>Wages</span>
        <span style={{ margin: 10, width: '50px' }}>Hours</span>
        <span style={{ margin: 10, width: '50px' }}>Total</span>
      </div>
      <div>
        <Input className={classes.inputBox} type='text' value={wages} onChange={wagesChange} />
        <Input className={classes.inputBox} type='text' value={hours} onChange={hoursChange} />
        <span style={{ margin: 10, width: '50px' }}>${totalLabor}</span>
      </div>
    </div>
  );
}

export default LaborRow;
