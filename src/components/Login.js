import React from 'react'
import classes from '../styles/Form.module.scss'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {login,selectUser} from '../redux/features/authSlice'


const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
});

const Login = () => {
    const dispatch = useDispatch()
    let user= useSelector(selectUser)
    const navigate = useNavigate()
    // const { redirect } = navigate.query;
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect')
    console.log(searchParams.get('redirect'))
    console.log('this is ther redirect :'+location.search)
    
    const {handleSubmit,register,formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const submitHandler=async(data)=>{
        const email=data.email;
        const password=data.password;
        try{
            // Send email and password to backend so user can login
            const { data } = await axios.post('http://localhost:3001/auth/login', {
                email,
                password,
            });
            console.log(data)
            dispatch(login(data))
            // if the user is user redirect him to shipping page
            if (data.user.role == "user"){
                navigate(redirect || '/shipping')
            }else if (data.user.role === "admin"){
                // if user is admin redirect him to admin dashboard page after login
                navigate(redirect || '/admin/dashboard')
            }
            
        }catch(e){
            // if login was not successful then display an error notification
            toast.error(e.message, {
                duration: 10000,
            });
        }
    }
    return (
        <div className={classes.wrapper}>
            <Toaster />
            <div className={classes.title}>Login</div>
            <div className={classes.subtitle}>If you are a registered user, please enter your email and password.</div>
            <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
                <div className={classes.form__element}>
                    <input type="text" className={classes.form__text_input} placeholder="Email" {...register("email")} />
                    <p className='message'>{errors.email?.message}</p>
                </div>
                <div className={classes.form__element}>
                    <input type="password" className={classes.form__text_input} placeholder="Password" {...register("password")} />
                    <p className='message'>{errors.password?.message}</p>
                </div>
                <div className={classes.form__element}>
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <div className={classes.form__element}>
                    <button className={classes.auth_btn+" "+classes.main} type="submit">Login</button>
                </div>
                
            </form>
            <button className={classes.forgot}>Forgot my password</button>
        
        </div>
    )
}

export default Login
