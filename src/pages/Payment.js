import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import Stepper from '../components/Stepper'
import Summary from '../components/Summary'
import classes from '../styles/Payment.module.scss'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import {selectShippingAddress,savePaymentMethod} from '../redux/features/checkoutSlice'
import { useSelector,useDispatch } from 'react-redux'
import {clear,selectNbrItems,selectCart,selectTotal} from '../redux/features/cartSlice'
import Cookies from 'js-cookie'
import formClasses from '../styles/Form.module.scss'
import axios from 'axios'
import { selectUser } from '../redux/features/authSlice'

const Payment = () => {
    const navigate = useNavigate()

    // Get shippingAddress from redux "checkoutSlice"
    const shippingAddress = useSelector(selectShippingAddress)

    // Use this to save data in redux
    const dispatch=useDispatch()

    const [paymentMethod, setPaymentMethod] = useState("")

    // Get the products from cart (from redux "cartSlice")
    const products = useSelector(selectCart);
    
    // Get user from redux "authSlice"
    const user = useSelector(selectUser)

    useEffect(()=>{
        document.title = "Payment Methods - FitVerse"
        console.log(shippingAddress)
        // While page is loading, check if the shipping address is set or not, if not redirect back user to shipping page 
        // if the shipping address was saved in redux, then display this page to choose the payment method
        if (!shippingAddress.address){
            navigate('/shipping')
        }else{
            setPaymentMethod(Cookies.get('paymentMethod') || '')
        }

    },[])

    // round is used to round a float number 123.456 => 123.46
    const round = (num)=>{
        return Math.round(num * 100 + Number.EPSILON) / 100; 
    }

    // Get the number of products in cart, we get it from redux "cartSlice"
    const nbrCartItems = useSelector(selectNbrItems);
    // Get the total price of products without tax .. from redux "cartSlice"
    const price = round(parseFloat(useSelector(selectTotal)));
    // Calculate the shipping price, is the total price of products without tax is more than 100$ then the shipping is free otherwise user has to pay 15$ for shipping
    const shippingPrice=price > 100 ? 0 : 15
    // Calculate the tax, it's 15% of total price of products
    const tax = round(price * 0.15)
    // Calculate the final price that user will pay
    const total = round(price + shippingPrice + tax)

    const submitHandler=async(e)=>{
        e.preventDefault()
        // Check if user choosed a payment method, otherwise display an error message
        if (!paymentMethod){
            toast.error("Payment method is required!")
        }else{
            // If user choosed the payment method, then save it in redux "checkoutSlice"
            dispatch(savePaymentMethod(paymentMethod))
            navigate('/order')
        }  
      
    }
    return (
        <Layout>
            {/* This is the third step */}
            {/* In this page, user will choose the payment method */}
            <Stepper activeStep={2} />
            <div className={classes.container}>
                <Toaster />
                <div className={classes.items}>
                    {/* Call the "submitHandler" function to create the order */}
                    <form onSubmit={submitHandler}>
                        <div className={classes.title}>Payment Method</div>
                        <div className={classes.subtitle}>All transactions are safe and secure</div>
                        <div className={classes.method}>
                            <div>
                                <input type="radio" id="card" name="method" value="card" onChange={(e)=>setPaymentMethod(e.target.value)}/>
                                <label htmlFor="card" className={classes.label}>Credit/Debit Card</label>
                            </div>
                            <div className={classes.logo}><img className={classes.img} src="/images/mastercard.png" alt="" /></div>
                        </div>

                        <div className={classes.method}>
                            <div>
                                <input type="radio" id="Paypal" name="method" value="Paypal" onChange={(e)=>setPaymentMethod(e.target.value)}/>    
                                <label htmlFor="Paypal" className={classes.label}>Paypal</label>
                            </div>
                            
                            <div className={classes.logo}><img className={classes.img} src="/images/paypal.png" alt="" /></div>
                        </div>
                        <div className={classes.method}>
                            <div>
                                <input type="radio" id="Stripe" name="method" value="Stripe" onChange={(e)=>setPaymentMethod(e.target.value)}/>
                                <label htmlFor="Stripe" className={classes.label}>Stripe</label>
                            </div>
                            
                            <div className={classes.logo}><img className={classes.img} src="/images/stripe.png" alt="" /></div>
                        </div>
                        <div className={classes.btns}>
                            <button className={classes.btn+" "+classes.not_main} onClick={()=>navigate('/shipping')}>Back</button>
                            <button className={classes.btn+" "+classes.main} type="submit">Next</button>
                        </div>
                        
                    </form>
                </div>
                <div className={classes.summary}>
                    {/* The prices will be recalculated and displayed in the "Summary" component */}
                    <Summary />
                </div>
            </div>
        </Layout>
    )
}

export default Payment
