import React from "react";

import { DataItem, Categories } from "../../dataUtilities";
import Identity from "./Identity";
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "./index.module.scss";

interface Props {
  data: Array<any>;
  categories: Array<Categories>;
  isIdentity: boolean;
}

const Table = (props: Props) => {
  const maxRows = 25;
  // regular table


  const rows = props.data
    .map((item: any, index) => (
      <tr key={index} className={styles.dataRows}>
        {props.categories.map((category: Categories, index) => (
          <td key={index} className={styles.dataField}>

            {item[category.field]}

          </td>
        ))}
      </tr>
    ))
    .slice(0, maxRows);

  return props.isIdentity ? (
    <Identity data={props.data} categories={props.categories} />
  ) : (
    <table className={styles.dataTable}>
      <thead className={styles.header}>
      </thead>
      <tbody className={styles.body}>{rows}</tbody>
    </table>
  );
};

Table.displayName = "Table";

export default Table;
