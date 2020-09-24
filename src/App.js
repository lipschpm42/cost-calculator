import React, { useState } from 'react';
import './App.css';
import TitleRow from './component/TitleRow';
import FabricMaterialRow from './component/FabricMaterialRow';
import VinylMaterialRow from './component/VinylMaterialRow';
import LaborRow from './component/LaborRow'
import { Input, makeStyles, Button } from '@material-ui/core'
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  inputBox: {
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 65,
    fontSize: '15px',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  display: {
    margin: theme.spacing(1),
    width: 50,
    fontSize: '15px',
  },
  materialNum: {
    display: 'flex',
    margin: theme.spacing(0),
    fontSize: '20px',
    color: 'white'
  },
  button: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    variant: "contained"
  }
}));

function App() {
  const [fabNum, setFabNum] = useState([1, 2, 3, 4])
  const [vinyNum, setVinyNum] = useState([1])
  const [materialArray, setMaterialArray] = useState([{ materialNum: 1, materialCost: 4.19 }, { materialNum: 2, materialCost: 4.19 }, { materialNum: 3, materialCost: 4.19 }, { materialNum: 4, materialCost: 4.19 }])
  const [totalLaborCost, setTotalLaborCost] = useState()
  const [totalCost, setTotalCost] = useState()
  const [finalPrice, setFinalPrice] = useState()

  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.value > fabNum.length) {
      setFabNum(fabNum.concat(parseInt(e.target.value, 10)))
      setMaterialArray(materialArray.concat({ materialNum: parseInt(e.target.value, 10), materialCost: 4.19 }))
    }
    else if (e.target.value < fabNum.length && e.target.value >= 1) {
      let array = [...fabNum]
      array.splice(-1, 1)
      setFabNum(array)
      let arrayObj = [...materialArray]
      arrayObj.splice(-1, 1)
      setMaterialArray(arrayObj)
    }
    console.log(materialArray)
  }

  const handleChange2 = (e) => {
    if (e.target.value > vinyNum.length) {
      setVinyNum(vinyNum.concat(parseInt(e.target.value, 10)))
      setMaterialArray(materialArray.concat({ materialNum: parseInt(e.target.value, 10), materialCost: 4.19 }))
    }
    else if (e.target.value < vinyNum.length && e.target.value >= 1) {
      let array = [...vinyNum]
      array.splice(-1, 1)
      setVinyNum(array)
      let arrayObj = [...materialArray]
      arrayObj.splice(-1, 1)
      setMaterialArray(arrayObj)
    }
    console.log(materialArray)
  }

  const updateMaterialCost = (materialNum, materialCost) => {
    const updateMaterial = materialArray.findIndex(x => x.materialNum === materialNum)
    materialArray[updateMaterial].materialCost = parseFloat(materialCost)
  }
  const updateLaborCost = (laborCost) => {
    setTotalLaborCost(laborCost)
  }

  const calculateTotal = () => {
    setTotalCost(
      (materialArray.reduce((totalCost, obj) => totalCost + obj.materialCost, 0)
        + totalLaborCost).toFixed(2))
    setFinalPrice(
      ((materialArray.reduce((totalCost, obj) => totalCost + obj.materialCost, 0)
        + totalLaborCost) * 1.5).toFixed(2))
  }

  return (
    <div className="App">
      <p className={classes.materialNum}> Number of Fabrics </p>
      <Input type='number' className={classes.inputBox} value={fabNum.length} onChange={handleChange} />
      <p className={classes.materialNum}> Number of Vinyls</p>
      <Input type='number' className={classes.inputBox} value={vinyNum.length} onChange={handleChange2} />
      <header className="App-header">
        <TitleRow />
        {fabNum.map((row) => <FabricMaterialRow materialNum={row} materialCost={updateMaterialCost} />)}
        <TitleRow />
        {vinyNum.map((row) => <VinylMaterialRow materialNum={row} materialCost={updateMaterialCost} />)}
        <LaborRow laborCost={updateLaborCost} />
        <Button onClick={calculateTotal} className={classes.button} disableElevation >calcuate</Button>
        <div>
          <p>Material Cost: ${totalCost}</p>
          <p>Final Price: ${finalPrice}</p>
        </div>
      </header>
    </div >
  );
}

export default App;
