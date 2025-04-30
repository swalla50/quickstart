import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment, { min } from 'moment';
import './LineChartMonth.css'
import { Chart as ChartJS, registerables, CategoryScale } from 'chart.js';
import 'chartjs-adapter-moment';
import { Bar, Doughnut } from 'react-chartjs-2';
import './SalesRestockPieChast.css'
import {

    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function SalesRestockPieChart(props) {
    const weekArray = moment.weekdays();
    const [dataRestock, setdataRestock] = useState([]);
    const [itemname, setitemname] = useState([]);
    var totalSales = 0;
    var totalRestocks = 0;

    const [data, setData] = useState([]);
    const [chartData, setchartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
        console.log("PROPS CHANGE",props.refresh)
        axios.get(`getSRLog/getSRLog`)
            .then((res) => {
                const SRLOGDATA = res.data;
                setData(SRLOGDATA.filter(item => moment(item.Date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && item.Sold == true));
                setdataRestock(SRLOGDATA.filter(item => moment(item.Date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && item.Restocked == true))
                var todaySales = res.data.filter(item => moment(item.Date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && item.Sold == true)//.toLocaleDateString('en-US', {day: 'numeric',month:'short', year:'numeric'}));
                console.log("TRUE DATA", res.data.filter(item => moment(item.Date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && item.Restocked == true))
                var todayRestock = res.data.filter(item => moment(item.Date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && item.Restocked == true)
                setitemname(res.data.map((item) => item.ItemName))
                // var costData = res.data.map((item) => (item.netCosts));
                // var netSalesData = res.data.map((item) => (item.netSales));
                // var salesDifferenceData = res.data.map((item) => (item.saleDifference));
                // const maxDate = moment().format('MMM DD, YYYY');
                // const minDate = moment().subtract(7, 'day').format('MMM DD, YYYY');
                // const currmonth = new Date()

var datas;
                for (let i = 0; i < todaySales.length; i++) {
                    totalSales += (todaySales[i].ItemAmount *todaySales[i].numberSR);
                    console.log("total sales: ", i, totalSales)
                    // localStorage.setItem("totalSalestoday", totalSales.toString())
                    datas = totalSales
                }

                
                var datasr;
                for (let i = 0; i < todayRestock.length; i++) {
                    totalRestocks += (todayRestock[i].ItemAmount * todayRestock[i].numberSR);
                    console.log("total restock: ", i, totalRestocks)
                  datasr = totalRestocks
                }

                // const INPROGRESSDATA = res.data.filter(proj => proj.isDeleted == false && proj.isDeleted == false);
    
                // console.log("VENDOR CHART DATA2", data)
                setchartData({
                    labels: ['Resotcks','Sales'],
                    datasets: [

                        {
                            label:'Sales',
                            data: [datasr,datas],
                            borderColor: ['#1976d2cc','#4ff68a'],
                            backgroundColor: ['#1976d2cc','#4ff68a'],
                            borderWidth: 1,
                            hoverBorderWidth: 3,
                            barThickness: 10,
                            borderRadius: 10
                        },
                     
                    ]
                });
                setChartOptions(
                {
                    responsive: true,

                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: 'black'
                            }
                        }
                    }
                })

                // let thismonth = currmonth.toLocaleString('en-US', { month: 'long' });

                // var date = new Date()

                // var check = new Date(date.setMonth(date.getMonth()-2)).toLocaleString('en-US', { month: 'long' });

                // let netsum = 0;
                //   for (let i = 0; i < res.data.length; i++)
                //   {

                //     if(entryDates[i] == thismonth)
                //     {
                //       netsum += netSalesData[i];
                //     }
                //     localStorage.setItem("netcostss",netsum.toString())
                //   }


                //    //For the netCosts
                //    let costsum = 0;
                //    for (let i = 0; i < res.data.length; i++)
                //    {

                //      if(entryDates[i] == thismonth)
                //      {
                //        costsum += costData[i];
                //      }
                //      localStorage.setItem("netsaless",costsum.toString())
                //    }

                //    //For the netDiff
                //    let diffsum = 0;
                //    for (let i = 0; i < res.data.length; i++)
                //    {

                //      if(entryDates[i] == thismonth)
                //      {
                //        diffsum += salesDifferenceData[i]
                //      }
                //      localStorage.setItem("netDiff",diffsum.toString())
                //    }

                // console.log("TOTAL SALES CHART", datas)
                // let chart1 = [];
                // const ctx1 = document.getElementById('myChart1SalesandRestock');

                // const myChart1 = new ChartJS(ctx1, {
                //     type: 'doughnut',
                //     data: {
                //          labels: ['Resotcks','Sales'],
                //         datasets: [

                //             {
                //                 label:'Sales',
                //                 data: [datasr,datas],
                //                 borderColor: ['#1976d2cc','#4ff68a'],
                //                 backgroundColor: ['#1976d2cc','#4ff68a'],
                //                 borderWidth: 1,
                //                 hoverBorderWidth: 3,
                //                 barThickness: 10,
                //                 borderRadius: 10
                //             },
                         
                //         ]
                //     },
                //     options: {
                //         responsive: true,

                //         plugins: {
                //             legend: {
                //                 display: true,
                //                 labels: {
                //                     color: 'black'
                //                 }
                //             }
                //         }
                //     }
                // })
                // myChart1.update();
            })
            .catch((err) => {
                console.log(err, "Unable to get user pay info");
            });
    }, [props.refresh])
    return (
        <>
        {data.length === 0 && dataRestock.length === 0?
        
            (<div className='no-srdata'>NO SALES OR RESTOCKS TODAY</div>)
            :
            (<div className='PieChart'>
            <Doughnut options={chartOptions} height={10} data={chartData} />
        </div>)
        }
        </>
    )
}

export default SalesRestockPieChart;