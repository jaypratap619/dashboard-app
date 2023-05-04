import { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import PieChart from './components/PieChart';

const baseURL = "http://localhost:5000/api"


function App() {
  const [myData, setMyData] = useState([])
  const [isError, setIsError] = useState("")
  useEffect(()=>{
    axios
      .get(`${baseURL}/preds`)
      .then((res)=>{
        setMyData(res.data)
      })
      .catch(error=>setIsError(error.message))
  },[])
  


  return (
    <div>
      {isError !== "" && <h2>{isError}</h2>}
      <PieChart myData={myData} />
    </div>
  );
}

export default App;
