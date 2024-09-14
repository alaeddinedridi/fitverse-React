import { PayPalButtons ,usePayPalScriptReducer  } from '@paypal/react-paypal-js'
import React,{useEffect,useState} from 'react'
import classes from '../styles/Summary.module.scss'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {clear,selectNbrItems,selectCart,selectTotal} from '../redux/features/cartSlice'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { selectUser } from '../redux/features/authSlice'
import {selectShippingAddress,savePaymentMethod} from '../redux/features/checkoutSlice'
import Cookies from 'js-cookie'

const Summary = () => {
    const user = useSelector(selectUser)
    const location = useLocation()
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const products = useSelector(selectCart);
    const [paymentMethod, setPaymentMethod] = useState("")
    const shippingAddress = useSelector(selectShippingAddress)

    useEffect(()=>{
        const loadPaypalScript = async () => {
          setPaymentMethod(Cookies.get('paymentMethod') || '')
          // Get PAYPAL_CLIENT_ID from the backend 
          const { data: clientId } = await axios.get('http://localhost:3001/paypal/key');
          console.log('this is the clientId:'+clientId)

          // Set PAYPAL_CLIENT_ID and the currency to be used
          paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': clientId,
                currency: 'USD',
              },
          });
          console.log('this is after first paypal dispatch')
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          console.log('this is after second paypal dispatch = pending'+isPending)
            

        }
        // Call loadPaypalScript function to configure paypal
        loadPaypalScript()
    },[])

    // Prepare the order by setting the total price of products to be paid in paypal
    function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: total },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
    }

    // In case there's an error, show a notification
    const onError=()=> {
        toast.error("error");
    }

    const round = (num)=>{
      return Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    }
    const nbrCartItems = useSelector(selectNbrItems);
    const price = round(parseFloat(useSelector(selectTotal)));
    const shippingPrice=price > 100 ? 0 : 15
    const tax = round(price * 0.15)
    const total = round(price + shippingPrice + tax)


    // When the order is paid, show a notification
    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            // dispatch({ type: 'PAY_REQUEST' });
            // dispatch({ type: 'PAY_SUCCESS', payload: data });


            // Save the order in database, including saving picked products, shippingAddress, payment method, price of products without tax,shipping price, tax and total price paid
            // Use axios to send a request
          
            const { data } = await axios.post('http://localhost:3001/order/create', {
                orderItems:products,
                shippingAddress,
                paymentMethod,
                price,
                shippingPrice,
                tax,
                total,
            },
            // Inside the save order request, send the user token, so in the backend, it can check if the user is logged in and his role is user
            {
                headers: {
                  authorization: `Bearer ${user.token}`,
                },
            }
            );
            console.log(user.token)
            // if the order was successfully saved then take the user to order page so he can pay the order
            console.log("saved the order")
              
          

            toast.success('Order is paid');
            console.log('order is paid')
          } catch (err) {
            // dispatch({ type: 'PAY_FAIL', payload: getError(err) });
            toast.error("not working");
          }
        });
      }

    const navigate=useNavigate()

   

    return (
        <div className={classes.wrapper}>
            <Toaster />
            <div className={classes.title}>Order summary</div>
            <div className={classes.item}><span>{nbrCartItems} Item(s)</span><span>{`$${price}`}</span></div>
            <div className={classes.item}><span>Shipping</span><span>{`$${nbrCartItems >0 ? shippingPrice:0}`}</span></div>
            <div className={classes.item}><span>Tax</span><span>{`$${tax}`}</span></div>
            <div className={classes.total}><span>Total</span><span>{`$${nbrCartItems >0 ? total : 0}`}</span></div>
            <button className={location.pathname==="/cart" ? classes.checkout : classes.checkout+" "+classes.disabled} onClick={()=>navigate('/shipping')}>Checkout</button>
            
            {/* Check if we are in order page then show paypal buttons */}
            {location.pathname==="/order"&& <PayPalButtons
             createOrder={createOrder}
             onApprove={onApprove}
             onError={onError}></PayPalButtons>}
        </div>
    )
}

export default Summary
