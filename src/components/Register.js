import React from 'react'
import classes from '../styles/Form.module.scss'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
const registerSchema = yup.object({
    fullname: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().min(6),
});

const Register = () => {

    const {handleSubmit,register,formState: { errors }} = useForm({
        resolver: yupResolver(registerSchema)
    });

    const submitHandler=async(data)=>{
        // Get user account informations from the register form
        const fullname=data.fullname;
        const email=data.email;
        const password=data.password;
        const confirmPassword=data.confirmPassword;
        console.log(fullname+""+email+""+password)
        // check if the passwords are equal
        if (password !== confirmPassword){
            toast.error("passwords doesn't match", {
                duration: 10000,
            })
            return;
        }
        try{
            // Create the account by saving it in the database
            const { data } = await axios.post('http://localhost:3001/auth/register', {
                fullname,
                email,
                password,
            });
            console.log(data)

            // Show a success message in notification
            toast.success('Account created!', {
                duration: 10000,
            });
        
        }catch(e){
            // if there's any issue creating the account, then display a notification containing the error message
            toast.error(e.message, {
                duration: 10000,
            });
        }
    }
    return (
        <div>
            {/* Toaster is used to display notifications */}
            <Toaster />
            <div className={classes.title}>Register</div>
            <div className={classes.subtitle}>If you don't have an account, create one here.</div>
            <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
                <div className={classes.form__element}>
                    <input type="text" className={classes.form__text_input} placeholder="Fullname" {...register("fullname")} />
                    <p className='message'>{errors.fullname?.message}</p>
                </div>
                <div className={classes.form__element}>
                    <input type="text" className={classes.form__text_input} placeholder="Email" {...register("email")}/>
                    <p className='message'>{errors.email?.message}</p>
                </div>
                <div className={classes.form__element}>
                    <input type="password" className={classes.form__text_input} placeholder="Password" {...register("password")} />
                    <p className='message'>{errors.password?.message}</p>
                </div>
                <div className={classes.form__element}>
                    <input type="password" className={classes.form__text_input} placeholder="Repeat Password" {...register("confirmPassword")} />
                    <p className='message'>{errors.confirmPassword?.message}</p>
                </div>
                <div className={classes.form__element}>
                    <input type="checkbox" name="agree" id="agree" />
                    <label htmlFor="agree">Yes, I am 13+ years old.</label>
                </div>
                <div className={classes.agree}>By clicking 'Submit' you agree to the Creators Club Terms & Conditions, adidas Terms & Conditions and the adidas Privacy Policy</div>
                <div className={classes.form__element}>
                    <button className={classes.auth_btn+" "+classes.main} type="submit">Register</button>
                </div>
                
            </form>
        
        </div>
    )
}

export default Register
