import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../app/slices/orderSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
);



const Chartview = () =>{
    const [labels, setLabels] = useState([])
    const orders = useSelector(selectOrders)
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Point of Sales / Purchase',
          },
        },
      };
      
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Paid Sales',
            data: orders?.map(item =>{
                if(item.status == 'Paid0' && item.orderType =='SALE') return item.amount
            }),
            borderColor: '#20c997',
            backgroundColor: '#20c997',
          },
          {
            label: 'Open Sales',
            data: orders?.map(item =>{
                if(item.status == 'Open' && item.orderType == 'SALE') return item.amount
            }),
            borderColor: 'red',
            backgroundColor: 'red',
          },
          {
            label: 'Paid Purchase',
            data: orders?.map(item =>{
                if(item.status == 'Paid' && item.orderType == 'PURCHASE') return item.amount
            }),
            borderColor: '#2a3f54',
            backgroundColor: '#2a3f54',
          },
          {
            label: 'Open Purchase',
            data: orders?.map(item =>{
                if(item.status == 'Open' && item.orderType == 'PURCHASE') return item.amount
            }),
            borderColor: 'orange',
            backgroundColor: 'orange',
          },
        ],
      };
    const dates = (current) =>{
        var week= new Array(); 
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay()));
        for (var i = 0; i < 7; i++) {
            week.push(
                new Date(current).toLocaleDateString()
            ); 
            current.setDate(current.getDate() +1);
        }
        return week; 
    }
    useEffect(() => {
        setLabels(dates(new Date()))
    }, [])
    ;
  return <Line options={options} data={data} />;
}


export default Chartview