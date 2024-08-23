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
    const dispatch=useDispatch()
    const shippingAddress = useSelector(selectShippingAddress)
    const [checked, setChecked] = useState(true)
    const [index, setIndex] = useState(1)
    const navigate=useNavigate()
    let user= useSelector(selectUser)
    const {handleSubmit,register,formState: { errors },setValue} = useForm({
        resolver: yupResolver(schema)
    });

    const choose=(checked,ind)=>{
        setChecked(checked)
        setIndex(ind)
    }

    useEffect(() => {
        document.title = "Shipping Address - FitVerse"
        if (!user){
            navigate('/login?redirect=/shipping')
        }

        if (shippingAddress!==null){
            setValue('fullname', shippingAddress.fullname);
            setValue('address', shippingAddress.address);
            setValue('city', shippingAddress.city);
            setValue('pcode', shippingAddress.pcode);
            setValue('country', shippingAddress.country);
        }
       
    }, [])
    const submitHandler=async(data)=>{
        const fullname=data.fullname;
        const address=data.address;
        const city=data.city;
        const pcode=data.pcode;
        const country=data.country;
        dispatch(setShippingAddress({
            fullname,
            address,
            city,
            pcode,
            country
        }))
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
            toast.error(e.message)
        }
    }

    return (
        <Layout>
            <Stepper activeStep={1} />
            
            <div className={classes.container}>
                <Toaster />
                <div className={classes.items}>
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
                            <input type="text" className={formClasses.form__text_input} placeholder="Postal Code" {...register("pcode")}/>
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
