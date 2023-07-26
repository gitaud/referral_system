import React, { useState, useLayoutEffect } from 'react';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../context/AuthContext';
import DatePickerView from '../../../common-components/date-picker/DatePickerView';
import { DateFilterContextProvider, useDateFilterContext } from '../../../context/DateFilterContext';
import { getAllTransactions } from '../../../apiCalls/transactionApiCalls';
import useSetDocumentTitle from '../../../common-hooks/setDocumentTitle';
import styles from "./TransactionList.module.css";


const InnerTransactionListContainer = () => {
  useSetDocumentTitle("Transaction History")
  const { user } = useAuthContext();
  const { dates } = useDateFilterContext();
  const [transactions, setTransactions] = useState([]);

  useLayoutEffect(() => {
    const getTransactions = async () => {
      try {
        const filterParams = `date_gte=${dates.date_gte}&date_lte=${dates.date_lte}`
        const transactionsFound = await getAllTransactions(user.authToken, filterParams);
        setTransactions(transactionsFound);
      } catch (error) {
        console.log(error.cause);
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: error?.cause?.response?.data || 'Could not fetch transactions'
        })
      }
    }
    if (dates.date_gte && dates.date_lte) {
      getTransactions();
    }
  }, [dates, user])

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 0.40,
      renderCell: (params) => {
        return (
          <>
            {new Date(params.row.createdAt).toString().slice(0, 25)}
          </>
        )
      }
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.20,
      renderCell: (params) => {
        return (
          <>
            Ksh {params.row.amount}
          </>
        )
      }
    },
    {
      field: "commission",
      headerName: "Commission",
      flex: 0.20,
      renderCell: (params) => {
        return (
          <>
            Ksh {params.row.commission || 0}
          </>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.20,
      renderCell: (params) => {
        return (
          <Link to={"/transaction/" + params.row._id}>
            <button className={styles.transactionListEdit}>View</button>
          </Link>
        )
      }
    }
  ];

  return (
    <div className={styles.transactionList}>
      <span className={styles.title}>Transaction History </span>
      <DatePickerView />
      {transactions.length === 0 && <span className={styles.hint}>Hint: Set the date range first </span>}
      <DataGrid
        rows={transactions}
        disableSelectionOnClick
        columns={columns}
        autoPageSize
        pagination
        getRowId={row => row._id}
      />
    </div>
  )
}


export default function TransactionList() {
  return(
    <DateFilterContextProvider>
      <InnerTransactionListContainer />
    </DateFilterContextProvider>
  )
}