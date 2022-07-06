import React, { useEffect, useState } from "react";
import Button from "plaid-threads/Button";
import Note from "plaid-threads/Note";

import Table from "../Table";
import Error from "../Error";
import { DataItem, Categories, ErrorDataItem, Data } from "../../dataUtilities";

import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faCircleArrowUp, faDollarSign, faPlus } from "@fortawesome/free-solid-svg-icons";
import Transactionrow from "./transactionrow";


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
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<any>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/transactions`, { method: "GET" });

      const data = await response.json();
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
      console.log(data.transactions);
    };

    getData();
  }, []);



  //moving the plaid data into individual fields
  const plaiddata: any = {
    transactions: [{
      name: transformedData.name,
      date: transformedData.date,
      amount: transformedData.amount,
    }
    ],

  }


  // const costData = plaiddata.transactions.map((item: any) => item.namedata);

  const TranTable = (props: TransTableProps) => {

    const { transactions } = props.transactiondata;

    return (
      <table className="table" >
        <tbody>



          {transformedData.map((e: any) => (

            <tr >
              <td>{e.name}</td>
              <td>
                {e.amount > 0 ? (
                  <FontAwesomeIcon className="positive-tran" style={{ color: "#00b700" }} icon={faCircleArrowUp} size='1x' />
                ) : (
                  <FontAwesomeIcon className="negative-tran" style={{ color: "#d10000" }} icon={faCircleArrowDown} size='1x' />
                )}
              </td>
              <td><FontAwesomeIcon icon={faDollarSign} size='1x' />{e.amount}</td>
              <td>{e.date.replace(/-/g, '/')}</td>
            </tr>
          ))}




        </tbody>
      </table>
    )
  }

  return (

    <div>
      <TranTable transactiondata={plaiddata} />
    </div>


  );
};

Endpoint.displayName = "Endpoint";

export default Endpoint;
