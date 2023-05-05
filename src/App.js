import { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';

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



  return (
    <div>
     { console.log(myData)}
      {isError !== "" && <h2>{isError}</h2>}
      <PieChart myData={myData} />
      <BarChart myData={myData} />
    </div>
  );
}

export default App;
