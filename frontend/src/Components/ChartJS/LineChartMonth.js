import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment, { min } from 'moment';
import './LineChartMonth.css'
import { Chart as ChartJS, registerables, CategoryScale } from 'chart.js';
import 'chartjs-adapter-moment';
import {

  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

ChartJS.register(...registerables);
function LineChartMonth() {
  const weekArray = moment.weekdays()
  const [fin, setFin] = useState([])

  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios.get(`finance/financeData`)
      .then((res) => {
        const findata = res.data;
        setFin(findata);
        var entryDates = res.data.map((item) => new Date(item.entryDate).toLocaleDateString('en-US', { month: 'long' }));//.toLocaleDateString('en-US', {day: 'numeric',month:'short', year:'numeric'}));

        var costData = res.data.map((item) => (item.netCosts));
        var netSalesData = res.data.map((item) => (item.netSales));
        var salesDifferenceData = res.data.map((item) => (item.saleDifference));
        const maxDate = moment().format('MMM DD, YYYY');
        const minDate = moment().subtract(7, 'day').format('MMM DD, YYYY');
        const currmonth = new Date()

        let thismonth = currmonth.toLocaleString('en-US', { month: 'long' });
        
        var date = new Date()

        var check = new Date(date.setMonth(date.getMonth()-2)).toLocaleString('en-US', { month: 'long' });

        let netsum = 0;
          for (let i = 0; i < res.data.length; i++)
          {
            
            if(entryDates[i] == thismonth)
            {
              netsum += netSalesData[i];
            }
            localStorage.setItem("netcostss",netsum.toString())
          }
          

           //For the netCosts
           let costsum = 0;
           for (let i = 0; i < res.data.length; i++)
           {
             
             if(entryDates[i] == thismonth)
             {
               costsum += costData[i];
             }
             localStorage.setItem("netsaless",costsum.toString())
           }

           //For the netDiff
           let diffsum = 0;
           for (let i = 0; i < res.data.length; i++)
           {
             
             if(entryDates[i] == thismonth)
             {
               diffsum += salesDifferenceData[i]
             }
             localStorage.setItem("netDiff",diffsum.toString())
           }

console.log("month", check)
        let chart1 = [];
        const ctx1 = document.getElementById('myChart1');

        const myChart1 = new ChartJS(ctx1, {
          type: 'bar',
          data: {
            labels: [thismonth],
            datasets: [

              {
                data: [localStorage.netcostss],
                borderColor: '#1976d2cc',
                backgroundColor: '#1976d2cc',
                borderWidth: 1,
                hoverBorderWidth: 3,
                label: 'Gross Profit',
                barThickness: 50,
                borderRadius: 30
              },
              {
                data: [localStorage.netsaless],
                borderColor: '#00000073',
                backgroundColor: '#00000073',
                borderWidth: 1,
                hoverBorderWidth: 3,
                label: 'Total Costs',
                pointStyle: 'rectRot',
                barThickness: 50,
                borderRadius: 30
              },
              {
                data: [localStorage.netDiff],
                borderColor: '#8abaff',
                backgroundColor: '#8abaff',
                borderWidth: 1,
                hoverBorderWidth: 3,
                label: 'Profit',
                pointStyle: 'rectRot',
                barThickness: 50,
                borderRadius: 30
              },
            ]
          },
          options: {
            scales: {
              x: {
                display: true,
  


              },

              y: {
                display: true,
                max: 6000,
                min: 0,
                ticks: {
                  callback: function (entryDates) {
                    return '$' + entryDates;
                  },
                  stepSize: 500   // minimum will be 0, unless there is a lower value.

                }
              },
            },
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: 'black'
                }
              }
            }
          }
        })
      })
      .catch((err) => {
        console.log(err, "Unable to get user pay info");
      });
  }, [])
  return (
    <div className='BarChart'>
      <canvas height="400px" width="1300px" id="myChart1"></canvas>
    </div>
  )
}

export default LineChartMonth;