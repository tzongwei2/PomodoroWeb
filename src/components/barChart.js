import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

function BarChart(props){
    return<Bar data={props.data} options ={{
        scales: {
           xAxes: [{
              barThickness: 1
           }]
     },
     maintainAspectRatio: false,}} />;
}

export default BarChart