import React, { useState } from 'react';
import './App.css';
import FabricHeaders from './component/FabricHeaders';
import VinylHeaders from './component/VinylHeaders';
import FabricMaterialRow from './component/FabricMaterialRow';
import VinylMaterialRow from './component/VinylMaterialRow';
import LaborRow from './component/LaborRow'
import { Input, makeStyles, Button, Grid, Typography } from '@material-ui/core'
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  inputBox: {
    width: 65,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
    justifySelf: 'center',
    justifyContent: 'center'
  },
  display: {
    margin: theme.spacing(1),
    width: 50,
    fontSize: '15px',
  },
  materialNum: {
    display: 'flex',
    margin: theme.spacing(0),
    fontSize: '9px + 2vmin',
    color: 'white',
  },
  materialGrid: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  button: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    variant: 'contained'
  },
  totals: {
    justifyContent: 'center',
    fontSize: '9px + 2vmin',
  },
  totalItems: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px + 2vmin',
    margin: theme.spacing(1)
  }
}));

function App() {
  const [fabNum, setFabNum] = useState([1, 2, 3, 4])
  const [vinyNum, setVinyNum] = useState([1])
  const [fabricArray, setFabricArray] = useState([{ materialNum: 1, materialCost: 4.19 }, { materialNum: 2, materialCost: 4.19 }, { materialNum: 3, materialCost: 4.19 }, { materialNum: 4, materialCost: 4.19 }])
  const [vinylArray, setVinylArray] = useState([{ materialNum: 1, materialCost: 4.19 }])
  const [totalLaborCost, setTotalLaborCost] = useState()
  const [totalCost, setTotalCost] = useState()
  const [finalPrice, setFinalPrice] = useState()

  const classes = useStyles();

  const handleFabricChange = (e) => {
    if (e.target.value > fabNum.length) {
      setFabNum(fabNum.concat(parseInt(e.target.value, 10)))
      setFabricArray(fabricArray.concat({ materialNum: parseInt(e.target.value, 10), materialCost: 4.19 }))
    }
    else if (e.target.value < fabNum.length && e.target.value >= 1) {
      let array = [...fabNum]
      array.splice(-1, 1)
      setFabNum(array)
      let arrayObj = [...fabricArray]
      arrayObj.splice(-1, 1)
      setFabricArray(arrayObj)
    }
    console.log(fabricArray)
  }

  const handleVinylChange = (e) => {
    if (e.target.value > vinyNum.length) {
      setVinyNum(vinyNum.concat(parseInt(e.target.value, 10)))
      setVinylArray(vinylArray.concat({ materialNum: parseInt(e.target.value, 10), materialCost: 4.19 }))
    }
    else if (e.target.value < vinyNum.length && e.target.value >= 0) {
      let array = [...vinyNum]
      array.splice(-1, 1)
      setVinyNum(array)
      let arrayObj = [...vinylArray]
      arrayObj.splice(-1, 1)
      setVinylArray(arrayObj)
    }
    console.log(vinylArray)
  }

  const fabricMaterialCost = (materialNum, materialCost) => {
    const updateMaterial = fabricArray.findIndex(x => x.materialNum === materialNum)
    fabricArray[updateMaterial].materialCost = parseFloat(materialCost)
  }
  const vinylMaterialCost = (materialNum, materialCost) => {
    const updateMaterial = vinylArray.findIndex(x => x.materialNum === materialNum)
    vinylArray[updateMaterial].materialCost = parseFloat(materialCost)
  }


  const updateLaborCost = (laborCost) => {
    setTotalLaborCost(laborCost)
  }

  const calculateTotal = () => {
    setTotalCost(
      ((fabricArray.reduce((totalCost, obj) => totalCost + obj.materialCost, 0)) +
        (vinylArray.reduce((totalCost, obj) => totalCost + obj.materialCost, 0))
        + totalLaborCost).toFixed(2))
    setFinalPrice(
      (((fabricArray.reduce((totalCost, obj) => totalCost + obj.materialCost, 0)) +
        (vinylArray.reduce((totalCost, obj) => totalCost + obj.materialCost, 0))
        + totalLaborCost) * 1.5).toFixed(2))
  }

  return (
    <div className='App'>
      <div align='center' style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Quilt Calculator</div>
      <Grid container className='App-header'>
        <Grid item className={classes.materialGrid}>
          <Typography className={classes.materialNum}> Fabric #'s </Typography>
          <Input type='number' className={classes.inputBox} value={fabNum.length} onChange={handleFabricChange} />
        </Grid>
        <Grid item className={classes.materialGrid}>
          <Typography className={classes.materialNum}> Vinyl #'s</Typography>
          <Input type='number' className={classes.inputBox} value={vinyNum.length} onChange={handleVinylChange} />
        </Grid>
      </Grid>
      <Grid container className='App-body'>
        <Grid item>
          <FabricHeaders />
        </Grid>
        <Grid item>
          {fabNum.map((row) => <FabricMaterialRow materialNum={row} materialCost={fabricMaterialCost} />)}
        </Grid>
        {vinyNum.length >= 1 ?
          <div>
            <Grid item>
              <VinylHeaders />
            </Grid>
            <Grid item>
              {vinyNum.map((row) => <VinylMaterialRow materialNum={row} materialCost={vinylMaterialCost} />)}
            </Grid>
          </div>
          : <></>}
        <Grid item>
          <LaborRow laborCost={updateLaborCost} />
        </Grid>
        <Grid item className={classes.materialGrid}>
          <Button onClick={calculateTotal} className={classes.button} disableElevation >calcuate</Button>
        </Grid>
        <Grid container className={classes.totals}>
          <Grid item className={classes.totalItems}>
            <p style={{ margin: 0 }}>Material Cost</p>
            <div>
              {totalCost ? <p>${totalCost}</p> : <></>}
            </div>
          </Grid>
          {/* <Grid item className={classes.totalItems}><p>|</p> </Grid> */}
          <Grid item className={classes.totalItems}>
            <p style={{ margin: 0 }}>Final Price</p>
            <div>
              {totalCost ? <p>${finalPrice}</p> : <></>}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
}

export default App;
