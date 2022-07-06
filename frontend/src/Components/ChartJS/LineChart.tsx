import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment, { min } from 'moment';
import './LineChart.css'
import { Chart as ChartJS, registerables, CategoryScale } from 'chart.js';
import 'chartjs-adapter-moment';

import Button from "plaid-threads/Button";
import Note from "plaid-threads/Note";

import Table from "../Table";
import Error from "../Error";
import { DataItem, Categories, ErrorDataItem, Data } from "../../dataUtilities";

import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight,faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';



interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<any>;
}
interface TransTableProps {
  transactiondata: {
    transactions: {
      name: any;
      date: any;
      amount: any;
    }[];
  }
}

const Endpoint = (props: Props) => {

}

ChartJS.register(...registerables);
var data: any;
const LineChart = (props: Props) => {
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<any>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  // const costData = plaiddata.transactions.map((item: any) => item.namedata);

  // const TranTable = (props: TransTableProps) => {

  //   const { transactions } = props.transactiondata;

  //   return (
  //     <table className="table" >
  //       <tbody>



  //         {transformedData.map((e:any) => (

  //           <tr >
  //             <td>{e.name}</td>
  //             <td>
  //               {e.amount < 0 ? (
  //                 <FontAwesomeIcon className="positive-tran" style={{ color: "#00b700" }} icon={faCircleArrowUp} size='1x' />
  //               ) : (
  //                 <FontAwesomeIcon className="negative-tran" style={{ color: "#d10000" }} icon={faCircleArrowDown} size='1x' />
  //               )}
  //             </td>
  //             <td><FontAwesomeIcon icon={faDollarSign} size='1x' />{e.amount}</td>
  //             <td>{e.date.replace(/-/g, '/')}</td>
  //           </tr>
  //         ))}




  //       </tbody>
  //     </table>
  //   )
  // }
  const weekArray = moment.weekdays()
  const [fin, setFin] = useState([])

  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({});
  console.log("amount", transformedData)

  useEffect(() => {
    axios.get(`finance/financeData`)
      .then((res) => {
        const findata = res.data;
        setFin(findata);

        const getData = async () => {
          setIsLoading(true);
          const response = await fetch(`/api/transactions`, { method: "GET" });

          data = await response.json();
          if (data.error != null) {
            setError(data.error);
            setIsLoading(false);
            return;
          }
          setTransformedData(data.transactions); // transform data into proper format for each individual product
          if (data.pdf != null) {
            setPdf(data.pdf);
          }
          setShowTable(true);
          setIsLoading(false);
          console.log("data array:", data.transactions);


          const plaidamount: any = []
          for (let i = 0; i < data.transactions.length; i++) {
            plaidamount.push({ amount: data.transactions[i].amount, date: new Date(data.transactions[i].date).toLocaleDateString('en-US', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' }) })
          }



          const plaidgross: any = plaidamount.filter((obj: any) => obj.amount > 0)

          const plaidcost: any = transformedData.filter((obj: any) => obj.amount < 0)
          console.log("plaidcost", plaidamount)
          console.log("plaiddate", plaidamount.map((item: any) => item.date))


          // console.log("amountdata:",data.transactions.map((item:any)=>(item.amount)))
          console.log("timedata:", plaidamount.map((item: any) => new Date(item.date).toLocaleDateString('en-US', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' })))

          var entryDates = res.data.map((item: any) => new Date(item.entryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }));//.toLocaleDateString('en-US', {day: 'numeric',month:'short', year:'numeric'}));

          var costData = transformedData.map((item: any) => (item.transactions.amount));
          console.log()
          var netSalesData = res.data.map((item: any) => (item.netSales));
          var salesDifferenceData = res.data.map((item: any) => (item.saleDifference));
          const maxDate = moment().format('MMM DD, YYYY');
          const minDate = moment().subtract(7, 'day').format('MMM DD, YYYY');
          console.log(maxDate)

          console.log("newamount", transformedData);
          let chart1 = [];
          const ctx: any = document.getElementById('myChart');
          const myChart = new ChartJS(ctx, {
            type: 'bar',
            data: {
              labels: plaidamount.map((item: any) => item.date),
              datasets: [

                {
                  data: plaidamount.map((obj: any) => obj.amount).filter((item: any) => item.amount > 0),
                  borderColor: '#1976d2cc',
                  backgroundColor: '#1976d2cc',
                  borderWidth: 1,
                  hoverBorderWidth: 3,
                  label: 'Gross Profit',
                  barThickness: 50,
                  borderRadius: 30
                },
                {
                  data: plaidamount.map((obj: any) => obj.amount).filter((item: any) => item < 0),
                  borderColor: '#00000073',
                  backgroundColor: '#00000073',
                  borderWidth: 1,
                  hoverBorderWidth: 3,
                  label: 'Total Costs',
                  pointStyle: 'rectRot',
                  barThickness: 50,
                  borderRadius: 30
                },
                // {
                //   data: salesDifferenceData,
                //   borderColor: '#8abaff',
                //   backgroundColor: '#8abaff',
                //   borderWidth: 1,
                //   hoverBorderWidth: 3,
                //   label: 'Profit',
                //   pointStyle: 'rectRot',
                //   barThickness: 50,
                //   borderRadius: 30
                // },
              ]
            },
            options: {
              scales: {
                x: {
                  display: true,
                  type: 'time',
                  time: {
                    unit: 'day'
                  },
                  min: minDate,
                  max: maxDate


                },

                y: {
                  display: true,
                  max: 2000,
                  min: -500,
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
                    color: 'black',

                  }
                }
              }
            }
          })
        };
        getData();
      })
      .catch((err) => {
        console.log(err, "Unable to get user pay info");
      });

  }, [])
  return (
    <div className='BarChart'>
      {data !== null ? (
        <canvas height="400px" width="1300px" id="myChart"></canvas>
      ) : (
        <div className='connect-account-hero'>
          <div className="connect-account-group">
            <h2 className='connect-account-head'>Please connect your</h2>
            <h2 className='connect-account-head2'>bank account.</h2>
            <FontAwesomeIcon icon={faCircleArrowRight}  size='2x' />
          </div>
          <div className="connect-account-btn-group">
             <Link to='/bank'><button className="connect-account-btn">Connect<FontAwesomeIcon icon={faMoneyBillTransfer}  size='2x' /></button></Link>  
          </div>
        </div>

      )}
    </div>
  )
}

export default LineChart;