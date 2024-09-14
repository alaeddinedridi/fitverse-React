import React,{useEffect,useState} from 'react'
import Stepper from '../components/Stepper'
import Login from '../components/Login'
import Layout from '../components/Layout'
import Summary from '../components/Summary'
import classes from '../styles/Cart.module.scss'
import formClasses from '../styles/Form.module.scss'
import Register from '../components/Register'
const Auth = () => {
    const [register, setRegister] = useState(false)

    useEffect(() => {
        document.title = "Authentication - FitVerse"

    }, [])

    return (
        <Layout>
            {/* In order to purshase products, the user first have to login and if he does not have an account, he has to create one */}
            {/* This is the first step */}
            <Stepper activeStep={0} />
            
            <div className={classes.container}>
                <div className={formClasses.cols}>
                    <div className={formClasses.left}>
                        {register ? <Register />:<Login />}
                        
                    </div>
                    <div className={formClasses.right}>
                        {!register && <div>
                        <div className={formClasses.title}>Get an account now</div>
                            <button onClick={()=>setRegister(true)} className={formClasses.auth_btn+" "+formClasses.not_main}>Register now</button>
                        </div>}
                        {register && <div>
                        <div className={formClasses.title}>Login to your account now</div>
                            <button onClick={()=>setRegister(false)} className={formClasses.auth_btn+" "+formClasses.not_main}>Login now</button>
                        </div>}
                    </div>
                </div>
                <div className={classes.summary}>
                    <Summary />
                </div>
            </div>
        </Layout>
    )
}

export default Auth
