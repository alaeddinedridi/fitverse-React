import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import classes from '../styles/Cart.module.scss'
import Stepper from '../components/Stepper'
import Summary from '../components/Summary'
import formClasses from '../styles/Form.module.scss'
import {BsTruck,BsShop,BsCheckCircleFill} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import {setShippingAddress,selectShippingAddress} from '../redux/features/checkoutSlice'
import { useSelector,useDispatch } from 'react-redux'
import {selectUser} from '../redux/features/authSlice'
const schema = yup.object({
    fullname: yup.string().required().min(2),
    address: yup.string().required().min(2),
    city: yup.string().required().min(2),
    pcode: yup.number().required().min(2),
    country: yup.string().required().min(2)
});

const Shipping = () => {
    // Use this to save data in redux
    const dispatch=useDispatch()

    // Get shippingAddress from redux "checkoutSlice"
    const shippingAddress = useSelector(selectShippingAddress)
    const [checked, setChecked] = useState(true)
    const [index, setIndex] = useState(1)
    const navigate=useNavigate()

    // Get user from redux "authSlice"
    let user= useSelector(selectUser)

    // We are using this (package : react-hook-form) to validate user inputs in form
    const {handleSubmit,register,formState: { errors },setValue} = useForm({
        resolver: yupResolver(schema)
    });

    const choose=(checked,ind)=>{
        setChecked(checked)
        setIndex(ind)
    }

    useEffect(() => {
        document.title = "Shipping Address - FitVerse"
        
        // When the page is loading, check if the user is logged in
        // if the user is logged in then display the shipping page, otherwise redirect him to login page to signin
        if (!user){
            navigate('/login?redirect=/shipping')
        }

        // Check if the user has already set a shipping address, then display those informations without making the user setting them again
        // We take the saved shipping address from redux "checkoutSlice"
        // Example: if the user set shipping address then go to the next page, then return to this page, he won't need to put the shipping address again
        if (shippingAddress!==null){
            setValue('fullname', shippingAddress.fullname);
            setValue('address', shippingAddress.address);
            setValue('city', shippingAddress.city);
            setValue('pcode', shippingAddress.pcode);
            setValue('country', shippingAddress.country);
        }
       
    }, [])
    const submitHandler=async(data)=>{
        // Take user input (shipping address informations) from the form
        const fullname=data.fullname;
        const address=data.address;
        const city=data.city;
        const pcode=data.pcode;
        const country=data.country;

        // Save shipping address in redux "checkoutSlice"
        dispatch(setShippingAddress({
            fullname,
            address,
            city,
            pcode,
            country
        }))

        // Then take the user to the payment page where he will choose the payment method, for now it will be Paypal
        try{
            // const { data } = await axios.post('http://localhost:3001/shipping', {
            //     fullname,
            //     address,
            //     city,
            //     pcode,
            //     country
            // });
            // console.log(data)
            navigate('/payment')
        }catch(e){
            toast.error(e.message, {
                duration: 10000,
            })
        }
    }

    return (
        <Layout>
            {/* In this page, the user puts the address where he wants to receive the products that he will buy */}
            {/* This is the second step */}
            <Stepper activeStep={1} />
            
            <div className={classes.container}>
                <Toaster />
                <div className={classes.items}>
                    {/* Call the "submitHandler" function to save shipping address set by the user */}
                    <form className={formClasses.form} onSubmit={handleSubmit(submitHandler)}>
                        <div className={formClasses.title}>Billing Address</div>
                        <div className={formClasses.form__element}>
                            <input type="text" className={formClasses.form__text_input} placeholder="Fullname" {...register("fullname")} />
                            <p className='message'>{errors.fullname?.message}</p>
                        </div>
                        <div className={formClasses.form__element}>
                            <input type="text" className={formClasses.form__text_input} placeholder="Address" {...register("address")}/>
                            <p className='message'>{errors.address?.message}</p>
                        </div>
                        <div className={formClasses.form__element}>
                            <input type="text" className={formClasses.form__text_input} placeholder="City" {...register("city")}/>
                            <p className='message'>{errors.city?.message}</p>
                        </div>
                        <div className={formClasses.form__element}>
                            <input type="number" className={formClasses.form__text_input} placeholder="Postal Code" {...register("pcode")}/>
                            <p className='message'>{errors.pcode?.message}</p>
                        </div>
                        <div className={formClasses.form__element}>
                            <input type="text" className={formClasses.form__text_input} placeholder="Country" {...register("country")}/>
                            <p className='message'>{errors.country?.message}</p>
                        </div>
                    
                    <div className={formClasses.title}>Delivery Options</div>
                    <div onClick={()=>choose(!checked,1)} className={checked && index ===1 ? `${formClasses.delivery_option} ${formClasses.active}`:`${formClasses.delivery_option}`}>
                        {checked && index ===1 && <div className={formClasses.check}><BsCheckCircleFill className={formClasses.icon} /></div>}
                        <div className={formClasses.option__header}>
                            <div className={formClasses.header__title}>Standard Delivery</div>
                            <div className={formClasses.header__label}>Free</div>
                        </div>
                        <div className={formClasses.option__body}><BsTruck className={formClasses.icon} /> Enter your address to see when you'll get your order.</div>
                    </div>
                    <div onClick={()=>choose(!checked,2)} className={checked && index ===2 ? `${formClasses.delivery_option} ${formClasses.active}`:`${formClasses.delivery_option}`}>
                    {checked && index ===2 && <div className={formClasses.check}><BsCheckCircleFill className={formClasses.icon} /></div>}
                        <div className={formClasses.option__header}>
                            <div className={formClasses.header__title}>Collect in store</div>
                            <div className={formClasses.header__label}>Free</div>
                        </div>
                        <div className={formClasses.option__body}><BsShop className={formClasses.icon} />Pay now, collect in store.</div>
                    </div>
                    <div className={formClasses.btns}>
                        <button className={formClasses.auth_btn+" "+formClasses.not_main} onClick={()=>navigate('/login')}>Back</button>
                        <button className={formClasses.auth_btn+" "+formClasses.main} type="submit">Next</button>
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

export default Shipping
