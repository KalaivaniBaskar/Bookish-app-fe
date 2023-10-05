import axios from 'axios';
import { Box, Button, Paper } from '@mui/material';
import {BASE_URL} from '../Services/APIServices.js'
import { useEffect, useState } from 'react';
import { toastOptions } from '../utils.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
    const [allOrders, setAllOrders] = useState([]); 
     const [open, setOpen] = useState(false)
     const [modalMsg, setmodalMsg] = useState("")
     const handleOpen = () => setOpen(true);
     const handleClose = () => { setOpen(false)} 
     
     const getAllOrders = async() => {
        try {
          setmodalMsg("Getting your orders..")
           handleOpen();
          const token = localStorage.getItem('tokenAuth')
          const email = localStorage.getItem('email')
          const config = { headers : {"x-auth-token" : token}}
          const {data} = await axios.post(`${BASE_URL}/api/payment/get-orders`,
           {email : email}, config)
          //console.log(data)
          setAllOrders([...data.allOrders])
          handleClose();

        } catch (error) {
          console.log(error, error.message);
          handleClose();
          toast.error(`Error occured`, toastOptions)
         }
      }
    
    useEffect( () => {
      getAllOrders();
    }, [])

  return (
    <>
      <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
  
      <div className='page-wrap'>
      <div className='card-wrap'> 
         {
          allOrders.length && 
          allOrders.map(el => 
            <Box className='book-card' key={el.order_ID} component={Paper}>
            <img src={el.prod_pic_URL} alt={el.title} />
            <p className='book-title'>{el.title}</p>
            <p className='book-author'> {`OrderID: ${el.order_ID}`}</p>
            <p > Product ID :  {el.product_ID}</p>
            <p className='book-price'> MRP : <span>&#x20B9; {el.amount}</span></p>
             <p>Payment ID: {el.payment_ID}</p>
             <p> {el.order_Status}</p>
             <p>Date: {el.order_created.substring(0,10) }</p> 
          </Box>
        
            )
         }
        
      </div>
      </div>

      <ToastContainer />
      </>
  )
}

export default MyOrders