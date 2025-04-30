import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment, { min } from 'moment';
import './LineChartMonth.css'
import { Chart as ChartJS } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import './SalesRestockPieChast.css'
import './InProgressProjects.css'
import animationData from '../../assets/animations/89438-blue-loadingg.json'
import {
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import Lottie from 'react-lottie-player';
import { Button } from 'react-bootstrap';
import Bookkeeping from '../../Pages/Bookkeeping';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function ClientTaskProgress(props) {
    const weekArray = moment.weekdays();

    const [dataRestock, setdataRestock] = useState([]);
    const [loading, setloading] = useState(true);
    const [current, setCurrent] = useState(props.current)
    var totalSales = 0;
    var totalRestocks = 0;

    const [data, setData] = useState([]);
    const [chartData, setchartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
            setCurrent(props.current)
            var id = props.Id
            console.log('VENDOR PROP', id)

            axios.get(`${'GetPercentTasks/GetPercentages/' + id}`)
                .then((res) => {

                    // setProjectList(res.data.filter(proj => proj.progress != 100));
                    setData(res.data)
                    // const INPROGRESSDATA = res.data.filter(proj => proj.isDeleted == false && proj.isDeleted == false);
                    console.log('VENDOR PROP', id)
                    console.log("CLIENT CHART TASK DATA", res.data)
                    // console.log("VENDOR CHART DATA2", data)
                    setchartData({
                        labels: ['Completed Tasks', "Uncompleted Tasks"],
                        datasets: [
                            {
                                label: ["Completed Tasks", "Uncompleted Tasks"],
                                data: [res.data.CompletedTasks, res.data.UncompletedTasks],
                                borderColor: ['#1976d2cc', '#4ff68a'],
                                backgroundColor: ['#1976d2cc', '#4ff68a'],
                                barThickness: 35,
                                borderRadius: 5,
                            }
                        ]
                    });
                    setChartOptions({
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: "top",
                                labels: {
                                    color:'white'
                       
                                }
                            },

                            // title:{
                            //     display:true,
                            //     text: 'Inventory'
                            // }
                        }
                    })

                    // var costData = res.data.map((item) => (item.netCosts));
                    // var netSalesData = res.data.map((item) => (item.netSales));
                    // var salesDifferenceData = res.data.map((item) => (item.saleDifference));
                    // const maxDate = moment().format('MMM DD, YYYY');
                    // const minDate = moment().subtract(7, 'day').format('MMM DD, YYYY');
                    // const currmonth = new Date()
                    // var totalInprogress = 0;
                    // var datas;
                    // var total = 0;
                    // var datass;
                    // var totals = 0;
                    // var datasss;
                    // for (var i = 0; i < res.data.filter(proj => proj.progress != 100 && proj.isDeleted == false).length + 1; i++) {
                    //     totalInprogress += i;
                    //     // localStorage.setItem("totalSalestoday", totalSales.toString())
                    //     datas = i

                    // }

                    // for (var i = 0; i < res.data.filter(proj => proj.progress == 100 && proj.isDeleted == false).length + 1; i++) {
                    //     total += i;
                    //     // localStorage.setItem("totalSalestoday", totalSales.toString())
                    //     datass = i
                    // }
                    // for (var i = 0; i < res.data.filter(proj => proj.isDeleted == false).length + 1; i++) {
                    //     totals += i;
                    //     // localStorage.setItem("totalSalestoday", totalSales.toString())
                    //     datasss = i
                    //     setloading(false);
                    //     setData(i)
                    // }







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

                    // console.log("TOTAL IN PROGRESS CHART", datas)
                    // let chart1 = [];
                    // const ctx6 = document.getElementById('myChart1ClientInventory');

                    // console.log("CHART DATA",data.map(item =>item.NumofInventory),data.map(item =>item.InventoryName))
                    // const myChart1 = new ChartJS(ctx6, {
                    //     type: 'bar',
                    //     data: {
                    //         labels: data.map((item) =>item.InventoryName),
                    //         datasets: [

                    //             {
                    //                 label: 'Number',
                    //                 data: data.map((item) =>item.NumofInventory),
                    //                 borderColor: '#1976d2cc',
                    //                 backgroundColor: '#1976d2cc',
                    //                 // borderWidth: 1,
                    //                 // hoverBorderWidth: 3,
                    //                 // weight: 1,
                    //                 // borderRadius: 5
                    //             },

                    //         ]
                    //     },
                    //     // options: {
                    //     //     responsive: true,
                    //     //     scales: {
                    //     //         y: {
                    //     //             beginAtZero: true
                    //     //         }
                    //     //     },

                    //     //     plugins: {
                    //     //         legend: {
                    //     //             display: false,
                    //     //             labels: {
                    //     //                 color: 'black'
                    //     //             }
                    //     //         }
                    //     //     }
                    //     // },
                    //     // animation: {
                    //     //     duration: 1,
                    //     //     onComplete: function () {
                    //     //         var chartInstance = this.chart,
                    //     //             ctx = chartInstance.ctx;
                    //     //         ctx.font = myChart1.helpers.fontString(myChart1.defaults.global.defaultFontSize, myChart1.defaults.global.defaultFontStyle, myChart1.defaults.global.defaultFontFamily);
                    //     //         ctx.textAlign = 'center';
                    //     //         ctx.textBaseline = 'bottom';

                    //     //         this.data.datasets.forEach(function (dataset, i) {
                    //     //             var meta = chartInstance.controller.getDatasetMeta(i);
                    //     //             meta.data.forEach(function (bar, index) {
                    //     //                 var data = dataset.data[index];
                    //     //                 ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    //     //             });
                    //     //         });
                    //     //     }
                    //     // }
                    // })
                })
                .catch((err) => {
                    setData([])
                    console.log(err, "Unable to get user pay info");
                });
        }, 3500)
    }, [props.show,props.Id])
    // const constructor = (props) =>{
    //     super(props);
    //     this.state = {
    //        modal:true

    //     }
    //  }

    function goInv() {

        <Navigate to='bookkeeping/inventory' />
    }


    return (
        <div className='client-inventory-container-chart'>
            {loading == true ?

                (
                    <Lottie
                        loop
                        className='typing-animation-object'
                        animationData={animationData}
                        play
                        style={{ width: '20rem' }}
                    />
                )
                :
                (
                    <>
                        {data.CompletedTasks == 0 || data.length == 0?
                            (

                                <div  style={{ width: '20rem', height: '20rem' }} className='no-projdata'>
                                    Please Add Projects Related to the client by clicking <Button className='no-inv-button' href='project'>Go To Projects</Button>
                                </div>
                            )
                            :
                            (
                                <div style={{ width: '20rem', height: '20rem' }} className='PieChartClientTask'>
                                    <p className='project-client-percent'>{data.Percent}%</p>
                                    <Doughnut options={chartOptions} height={10} data={chartData} />
                                    <p  style={{color:'white'}}className='project-client-total'>{data.AllTasks} Tasks</p>
                                </div>
                            )

                        }
                    </>

                )

            }
        </div>
    )
}

export default ClientTaskProgress;