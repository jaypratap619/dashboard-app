import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';




const BarChart = (props) => {
    console.log("Bar", props)
    const [predictionCount, setPredictionCount] = useState([])
    const [likelihood, setLikelihood] = useState([])
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Relation between likelihood and number of predictions',
            },
        },
    };
    
    const labels = likelihood;
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Number of Predictions',
                data: predictionCount,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    const filterFunction = () => {
        let map1 = new Map();
        props?.myData.map(d => {
            if(d.likelihood == null) d.likelihood = "unknown"
            if (map1.has(d.likelihood))
                map1.set(d.likelihood, map1.get(d.likelihood) + 1)
            else
                map1.set(d.likelihood, 1)
        })
        map1 = new Map([...map1].sort());
        // console.log(map1);  
        setLikelihood([...map1.keys()])
        setPredictionCount([...map1.values()])
    }
    useEffect(() => {
        filterFunction();
    }, [props.myData])
    return (
        <Bar options={options} data={data} />
    )
}

export default BarChart