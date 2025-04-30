import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment, { min } from 'moment';
// import './LineChartMonth.css'
import { Chart as ChartJS } from 'chart.js';
import { Bar, Doughnut, } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
// import './SalesRestockPieChast.css'
// import './InProgressProjects.css'
import animationData from '../../assets/animations/89438-blue-loadingg.json'
import {
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);
function TaskGanttChart(props) {
    const weekArray = moment.weekdays();

    const [dataRestock, setdataRestock] = useState([]);
    const [loading, setloading] = useState(true);
    const [current, setCurrent] = useState(props.current)
    const [tasks, settasks] = useState([]);
    const [projectDateRange, setprojectDateRange] = useState([]);
    var totalSales = 0;
    var totalRestocks = 0;
    const [listlist, setlistlist] = useState([]);
    const [data, setData] = useState([]);
    const [chartData, setchartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    function generateDateList(from, to) {

        var getDate = function (date) { //Mysql Format
            var m = date.getMonth(), d = date.getDate();
            return date.getFullYear() + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
        }
        var fs = from.split('-'), startDate = new Date(fs[0], fs[1], fs[2]), result = [getDate(startDate)], start = startDate.getTime(), ts, end;

        if (typeof to == 'undefined') {
            end = new Date().getTime();
        } else {
            ts = to.split('-');
            end = new Date(ts[0], ts[1], ts[2]).getTime();
        }
        while (start < end) {
            start += 86400000;
            startDate.setTime(start);
            result.push(getDate(startDate));
        }
        setprojectDateRange(result)
        return result;
    }
    const todayLine = {
        id: 'todayLine',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;

            ctx.save();

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#4ff68a';
            ctx.setLineDash([6, 6]);
            ctx.moveTo(x.getPixelForValue(new Date('2022-07-05')), top);
            ctx.lineTo(x.getPixelForValue(new Date('2022-07-05')), bottom);
            ctx.stroke();
            ctx.restore();

            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#4ff68a';
            ctx.fillStyle = '#4ff68a';
            ctx.moveTo(x.getPixelForValue(new Date('2022-07-05')), top + 3);
            ctx.lineTo(x.getPixelForValue(new Date('2022-07-05')) - 6, top - 6);
            ctx.lineTo(x.getPixelForValue(new Date('2022-07-05')) + 6, top - 6);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();

            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = '#4ff68a';
            ctx.textAlign = 'center';
            ctx.fillText('Today', x.getPixelForValue(new Date('2022-07-05')), bottom + 15);
        }
    }

    //Assigned tasks
    // const assignedtasks = {
    //     id: 'assignedTasks',
    //     afterDatasetsDraw(chart, args, pluginOptions) {
    //         const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;

    //         ctx.font = 'bolder 12px sans-serif';
    //         ctx.fillStyle = '#4f86f6';
    //         ctx.textBaseline = 'middle';
    //         data.datasets[0].data.forEach((datapoint, index) => {
    //             ctx.fillText(datapoint.name, left - 180,flex, y.getPixelForValue(index));
    //         });

    //         // console.log(data.datasets[0].data[0].name)
    //     }

    // }
    //status plugin block
    // const complete = {
    //     id: 'complete',
    //     afterDatasetsDraw(chart, args, pluginOptions) {
    //         const { ctx, data, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;

    //         ctx.font = 'bolder 12px sans-serif';
    //         ctx.fillStyle = '#4f86f6';
    //         ctx.textBaseline = 'middle';
    //         ctx.textAlign = 'center';
    //         data.datasets[0].data.forEach((datapoint, index) => {
    //             ctx.fillText(datapoint.complete, right, y.getPixelForValue(index));

    //         });


    //     }

    // }


    useEffect(() => {
        setlistlist([])
        setloading(true)
        setTimeout(() => {
            setloading(false)

            var id = props.projectid
            console.log('ProjectID', id)
            axios.get(`getproject/getprojectList`)
                .then((res) => {



                    generateDateList(moment(...res.data.filter(i => i.projectID == id).map(item => item.projectBeginDate)).format('YYYY-MM-DD'), moment(...res.data.filter(i => i.projectID == id).map(item => item.projectDueDate)).format('YYYY-MM-DD'));






                    axios.get(`getTasks/getTaskList`)
                        .then((response) => {
                            // setData(response.data.filter)
                            var beginend = response.data.filter(i => i.projectID == id).map(item => ({ x: [moment(item.BeginDate).format('YYYY-MM-DD'), moment(item.DueDate).format('YYYY-MM-DD')], y: item.TaskName }))
                            // console.log("BETWEEEEEEN", response.data.filter(i => i.projectID == id).map(item => ({ x: [moment(item.BeginDate).format('YYYY-MM-DD'), moment(item.DueDate).format('YYYY-MM-DD')], y: item.TaskName, TaskID: item.TaskID, name: item.TaskAssignee, complete: item.TaskCompleted == true ? ('Completed') : ('Not Completed') })));

                            // setProjectList(res.data.filter(proj => proj.progress != 100));


                            // const INPROGRESSDATA = res.data.filter(proj => proj.isDeleted == false && proj.isDeleted == false);

                            // console.log("CLIENT CHART TASK DATA", res.data)
                            // console.log("VENDOR CHART DATA2", data)
                            setchartData({
                                labels: beginend.map(i => i.y),
                                datasets: [
                                    {

                                        data:
                                            response.data.filter(i => i.projectID == id).map(item => ({ TaskName: item.TaskName, x: [moment(item.BeginDate).format('YYYY-MM-DD'), moment(item.DueDate).format('YYYY-MM-DD')], y: item.TaskName, TaskID: item.TaskID, name: item.TaskAssignee, complete: item.TaskCompleted == true ? ('Completed') : ('Not Completed') }))
                                        ,

                                        backgroundColor: '#1976d2cc',
                                        barThickness: 35,
                                        borderSkipped: false,
                                        borderRadius: 10,
                                        barPrecentage: 0.7
                                    }
                                ],
                            });
                            setChartOptions({
                                responsive: true,
                                maintainAspectRatio: false,
                                type: 'bar',
                                layout: {
                                    padding: {
                                        bottom: 20,
                                    },

                                },
                                data,
                                indexAxis: 'y',
                                scales: {
                                    x: {
                                        position: 'top',
                                        type: 'time',
                                        time: {
                                            tooltipFormat: 'MM/DD/YYYY',
                                            unit: 'day',
                                            stepSize: 1
                                        },
                                        min: moment(...res.data.filter(i => i.projectID == id).map(item => item.projectBeginDate)).format('YYYY-MM-DD'),
                                        max: moment(...res.data.filter(i => i.projectID == id).map(item => item.projectDueDate)).format('YYYY-MM-DD')
                                    },
                                    y: {

                                        ticks: {
                                            source: 'data',
                                            autoSkip: false,
                                            color: "#4f86f6"
                                        }
                                    }

                                },
                                plugins: [todayLine],
                                plugins: {
                                    legend: {
                                        display: false
                                    },
                                    tooltip: {
                                        displayColors: false,
                                        displayLabel: false,
                                        callbacks: {
                                            title: (ctx) => {
                                                // console.log(ctx[0])
                                                const startDate = moment(ctx[0].raw.x[0]).format('LL')
                                                const endDate = moment(ctx[0].raw.x[1]).format('LL')
                                                const formattedStartDate = startDate.toLocaleString([], {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                });
                                                const formattedEndDate = endDate.toLocaleString([], {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                });
                                                return [`${'Task:' + ctx[0].raw.TaskName}`, ctx[0].raw.name, `Task Deadline: ${formattedStartDate} -${formattedEndDate}`];
                                            }
                                        }

                                    }
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
                            console.log(err, "Unable to get vendor time info");
                        });
                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });

        }, 3500)
    }, [props.projectid,props.show])
    // const constructor = (props) =>{
    //     super(props);
    //     this.state = {
    //        modal:true

    //     }
    //  }

    function goInv() {

        <Navigate to='bookkeeping/inventory' />
    }
    // console.log("GANTT", data)

    function getchartData() {
        // setProjectList(res.data.filter(proj => proj.progress != 100));
        setData([{ day: "Monday", amount: 1 }, { day: "Tuesday", amount: 2 }, { day: "Wednesday", amount: 3 }, { day: "Thursday", amount: 4 }, { day: "Friday", amount: 5 }, { day: "Saturday", amount: 6 }])

        // const INPROGRESSDATA = res.data.filter(proj => proj.isDeleted == false && proj.isDeleted == false);
        // console.log("GANTT", data)
        // console.log("CLIENT CHART TASK DATA", res.data)
        // console.log("VENDOR CHART DATA2", data)
        setchartData({
            // labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            datasets: [
                {
                    label: "Amount",
                    data: data.map(i => i.amount),
                    borderColor: '#1976d2cc',
                    backgroundColor: '#1976d2cc',
                    barThickness: 35,
                    borderRadius: 5,
                    barHeight: 30
                }
            ],
        });
        setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: '#1976d2cc'

                    }
                },


                // title:{
                //     display:true,
                //     text: 'Inventory'
                // }
            }
        })
    }

    // console.log('chart data', chartData)
    return (
        <div className='project-gantt-container-chart'>
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

                    (chartData.labels != "" ?

                        (
                            <div style={{ overflowX: 'scroll', overflowY: 'scroll' }} className='GanttClientProject'>
                                {/* <p style={{color:'black'}} className='project-client-percent'>{data.ProjectPercent}%</p> */}
                                <div className='gantt-container'>
                                    <div className='gantt-container-body'>
                                        <Bar height={'1000rem'} options={chartOptions} data={chartData} plugins={[todayLine]} />
                                    </div>
                                </div>
                                {/* <p  style={{color:'black'}}className='project-client-total'>{data.AllProjects} Projects</p> */}
                            </div>
                        )
                        :
                        (
                            'No Tasks Associated with the project'
                        )

                    )






                )

            }
        </div>
    )
}

export default TaskGanttChart;