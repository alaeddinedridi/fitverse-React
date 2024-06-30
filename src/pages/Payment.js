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
    const shippingAddress = useSelector(selectShippingAddress)
    const dispatch=useDispatch()
    const [paymentMethod, setPaymentMethod] = useState("")
    const products = useSelector(selectCart);
    const user = useSelector(selectUser)
    useEffect(()=>{
        console.log(shippingAddress)
        if (!shippingAddress.address){
            navigate('/shipping')
        }else{
            setPaymentMethod(Cookies.get('paymentMethod') || '')
        }

    },[])
    const round = (num)=>{
        return Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    }
    const nbrCartItems = useSelector(selectNbrItems);
    const price = round(parseFloat(useSelector(selectTotal)));
    const shippingPrice=price > 100 ? 0 : 15
    const tax = round(price * 0.15)
    const total = round(price + shippingPrice + tax)
    const submitHandler=async(e)=>{
        e.preventDefault()
        if (!paymentMethod){
            toast.error("Payment method is required!")
        }else{
            dispatch(savePaymentMethod(paymentMethod))
            try{
                const { data } = await axios.post('http://localhost:3001/order/create', {
                    orderItems:products,
                    shippingAddress,
                    paymentMethod,
                    price,
                    shippingPrice,
                    tax,
                    total,
                },
                {
                    headers: {
                      authorization: `Bearer ${user.token}`,
                    },
                }
                );
                console.log(user.token)
                console.log("saved the order")
                navigate('/order')
            }catch(e){
                toast.error(e.message)
            }
            
        }  
      
    }
    return (
        <Layout>
            <Stepper activeStep={2} />
            <div className={classes.container}>
                <Toaster />
                <div className={classes.items}>
                    <form onSubmit={submitHandler}>
                        <div className={classes.title}>Payment Method</div>
                        <div>All transactions are safe and secure</div>
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
                    <Summary />
                </div>
            </div>
        </Layout>
    )
}

export default Payment
