import { useEffect, useState } from 'react';
import './App.css';
import { Grid, ThemeProvider, colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import axios from 'axios';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import ScatterChart from './components/ScatterChart';

const baseURL = "http://localhost:5000/api"




function App() {
  const [myData, setMyData] = useState([])
  const [isError, setIsError] = useState("")
  useEffect(() => {
    axios
      .get(`${baseURL}/preds`)
      .then((res) => {
        setMyData(res.data)
        // console.log(myData);
      })
      .catch(error => setIsError(error.message))
  }, [])
  // {isError !== "" && <h2>{isError}</h2>}


  return (
    <div className='app'>
     <Grid container spacing={2}>
     
      <PieChart myData={myData} />
      <BarChart myData={myData}/>
      <ScatterChart myData={myData}/>
     
    </Grid>
    </div>

  );
}

export default App;
