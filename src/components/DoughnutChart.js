import React, { useState, useEffect } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Item } from '@mui/material';
import { Card, CardContent, Typography } from "@mui/material"

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = (props) => {
    const [sectors, setSectors] = useState([])
    const [counts, setCounts] = useState([])
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of predictions from each sector',
            },
        },
        maintainAspectRatio: false
    }
    const data = {
        labels: sectors,
        datasets: [
            {
                label: '# of Predictions',
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
            if (d.sector !== "") {
                if (map1.has(d.sector))
                    map1.set(d.sector, map1.get(d.sector) + 1)
                else
                    map1.set(d.sector, 1)
            }
        })

        console.log('number of sector', map1.size)
        setSectors([...map1.keys()])
        setCounts([...map1.values()])
    }
    useEffect(() => {
        filterFunction();
    }, [props.myData])
    return (

        <Grid item xs={6}>
            <Card style={{ backgroudColor: '#F0E2E2' }}>
                <CardContent>
                    <Doughnut height={360} options={options} data={data} />
                </CardContent>
            </Card>
        </Grid>

    )
}

export default DoughnutChart