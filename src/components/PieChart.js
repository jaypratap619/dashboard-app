import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid , Item} from '@mui/material';
import { Card , CardContent, Typography} from "@mui/material"
import {Box} from "@mui/system"

const PieChart = (props) => {
    console.log("Pie", props)
    const [contrys, setContrys] = useState([])
    const [counts, setCounts] = useState([])
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: contrys,
        datasets: [
            {
                label: '# of predictions',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const filterFunction = () => {
        const map1 = new Map();
        props?.myData.map(d => {
            if(d.country === '')
            {
                d.country = 'unknown'
            }
            if (map1.has(d.country))
                map1.set(d.country, map1.get(d.country) + 1)
            else
                map1.set(d.country, 1)
        })

        console.log('number of country', map1.size)
        setContrys([...map1.keys()].slice(0,10))
        setCounts([...map1.values()].slice(0,10))
    }
    useEffect(() => {
        filterFunction();
    }, [props.myData])

    return (

        <Grid item xs={4}>
        <Card style={{ backgroudColor: '#F0E2E2' }}>
          <CardContent>
            <Pie data={data} />
          </CardContent>
        </Card>
      </Grid>
        
    )
}



export default PieChart