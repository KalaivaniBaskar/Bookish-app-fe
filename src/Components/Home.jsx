import axios from 'axios';
import { Box, Button, IconButton, Paper } from '@mui/material';
import {BASE_URL} from '../Services/APIServices.js'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastOptions, USER_ROLES } from '../utils.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {
    
  const [allProducts, setAllProducts] = useState([]); 
   const navigate = useNavigate();
   const [open, setOpen] = useState(false)
    const [modalMsg, setmodalMsg] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false)} 
  
    // make payment
    const initPayment = (data, item, email) => {
      const options= {
        key: process.env.REACT_APP_KEY,
        amount: data.amount,
        currency: data.currency,
        name : item.title,
        description : "testing payment",
        image: item.prod_pic_URL,
        order_id: data.id,
        handler: async(response) => {
          try {
            const token = localStorage.getItem('tokenAuth')
            const config = { headers : {"x-auth-token" : token}}
            const verifyURl = `${BASE_URL}/api/payment/verify`
            const resp = await axios.post(verifyURl, {...response, ...item, email}, config)
            //console.log("verify resp", resp)
            handleClose(); 
          } catch (error) {
            console.log(error)
            handleClose(); 
            toast.error("Error occured", toastOptions)
          }
        },
        theme : {
          color: "#3399cc"
        }
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open(); 
      rzp1.on('payment.failed', async(data) => {
        //console.log(data)
        try {
          const token = localStorage.getItem('tokenAuth')
          const config = { headers : {"x-auth-token" : token}}
          const failureURl = `${BASE_URL}/api/payment/failed`
          const resp = await axios.post(failureURl, {...data.error.metadata, ...item, email}, config)
          //console.log("failed resp", resp)
          handleClose(); 
          toast.error('Payment Failed', toastOptions)
        } catch (error) {
          console.log(error)
        }
      })
    }

    //get order ID 
    const handlePayment = async(item) => { 
        const token = localStorage.getItem('tokenAuth')
        const email = localStorage.getItem('email')
        if( !token || !email) {
          toast.error("Login to buy", toastOptions)
        }
        else {
          setmodalMsg("Placing order..", item)
          handleOpen();
          try {
            const config = { headers : {"x-auth-token" : token}}
            const {data} = await axios.post(`${BASE_URL}/api/payment/orders`,
            { amount: item.price}, config)
            //console.log(data)
            initPayment(data.data, item, email)
          } catch (error) {
            console.error(error);
            handleClose(); 
            toast.error("Error occured", toastOptions)
          }
      }
    }

    const getAllProducts = async() => {
        try {
          setmodalMsg("Fetching books..")
           handleOpen();
          const {data} = await axios.post(`${BASE_URL}/products/all`, {} )
          //console.log(data)
          setAllProducts([...data.allProducts])
          handleClose();

        } catch (error) {
          console.log(error, error.message);
          handleClose();
          toast.error(`Error occured`, toastOptions)
         }
        }
    
    useEffect( () => {
      getAllProducts();
    }, [])

    return (
      <>
      <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
  
      <div className='page-wrap'>
      <div className='card-wrap'> 
         {
          allProducts.length && 
          allProducts.map(el => 
            <Box className='book-card' key={el.product_ID} component={Paper}>
            <img src={el.prod_pic_URL} alt={el.title} />
            <p className='book-title'>{el.title}</p>
            <p className='book-author'> {`Author: ${el.author}`}</p>
            <p className='book-price'> MRP : <span>&#x20B9; {el.price}</span></p>
            { el.stock > 0 ?
            <Button variant='contained' onClick={() => handlePayment(el)}>BUY NOW</Button>
            :
            <Button variant='contained' disabled >SOLD OUT</Button> 
             
            }
            {
              localStorage.getItem('role') === USER_ROLES.Admin && 
              <Box>
              <IconButton sx={{margin : '0.5rem'}}
               onClick={() => navigate(`/edit-product/${el.product_ID}`)}>
                <EditIcon fontSize='medium'></EditIcon>
              </IconButton>
              <IconButton sx={{margin : '0.5rem'}}
               onClick={() => navigate(`/delete-product/${el.product_ID}`)}>
                <DeleteIcon fontSize='medium' />
              </IconButton>
              </Box>
            }
          </Box>
        
            )
         }
        
      </div>
      </div>

      <ToastContainer />
      </>
    );
  }

  export default Home;
  