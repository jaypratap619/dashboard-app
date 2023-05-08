import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { Grid, Item } from '@mui/material';
import { Card, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"





const ScatterChart = (props) => {
  const [graphData, setGraphData] = useState([]);

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Relation between Intensity and Countries',
      },
    },
    maintainAspectRatio: false
  };

  const data = {
    datasets: [
      {
        label: 'Intensity',
        data: graphData,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };


  const filterFunction = () => {
    const map1 = new Map()

    props?.myData.map(d => {
      map1.set(d.country, 0)
    })


    let counter = 1;
    map1.forEach((value, key) => {
      map1[key] = counter;
      counter++;
    });

    const arr = props?.myData.map(d => {



      if (d.country === '') {
        d.country = 'unknown'
      }
      let obj = { x: map1[d.country], y: d.intensity };


      return obj

    })



    console.log(map1, " map for country")



    setGraphData(arr);
    //console.log("jay", arr)

  }


  useEffect(() => {
    filterFunction()
  }, [props.myData])



  return (
    <Grid item xs={6}>
      <Card style={{ backgroudColor: '#F0E2E2' }}>
        <CardContent>
          <Scatter height={360} options={options} data={data} />
        </CardContent>
      </Card>
    </Grid>
  )

};






export default ScatterChart;


