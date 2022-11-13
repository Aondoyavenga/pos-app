import { Button } from "@mui/material";
import React, {useEffect} from "react";
import { useState } from "react";
import ReactExport from "react-export-excel";
import { useSelector } from "react-redux";
import { selectOrders } from "../app/slices/orderSlice";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelDownload = ({}) => {
    const orders = useSelector(selectOrders)
    const [dataSet1, setDataSet1] = useState([])

    // useEffect(() => {
      
    //     const dataset = orders?.map(item =>{
    //         const {orderId,orderOn,orderType,status,customerRef, userRef, amount, totalPaid} = item
    //         return ({
    //             orderId,
    //             orderOn,
    //             orderType,
    //             status,
    //             customerRef,
    //             userRef,
    //             amount,
    //             totalPaid
    //         })
    //     })
    //     return setDataSet1(dataset)
    // }, [orders])
  
    return (
        <ExcelFile
            filename ={`POS Report`} 
            element={
                <button
                    className='px-5 bg-pos_color-green text-white'
                >
                Export to Excel
                </button>
            }
        > 
            <ExcelSheet data={dataSet1} name={ `POS Orders` }>
                <ExcelColumn label="Order ID" value='orderId' />
                <ExcelColumn label="Order On" value={(col) => new Date(col.orderOn).toLocaleDateString()}/>
                <ExcelColumn label="Type" value="orderType"/>
                <ExcelColumn label="Status" value='status' />
                <ExcelColumn label="Customer/ Vendor"
                    value={(col) => `${col.customerRef?.firstName} ${col.customerRef?.lastName}`}/>
                <ExcelColumn label="User"
                    value={(col) => `${col.userRef?.firstName} ${col.userRef?.lastName}`}/>
                <ExcelColumn label="Amount"
                    value={(col) => col.amount}/>
                <ExcelColumn label="Total Paid" value={(col) =>col.totalPaid}/>
                <ExcelColumn label="Balance" value={(col) => parseInt(col.amount) - parseInt(col.totalPaid)} />

                
            </ExcelSheet>
           
        </ExcelFile>
    );
    
}


export default ExcelDownload