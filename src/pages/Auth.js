import React,{useState} from 'react'
import Stepper from '../components/Stepper'
import Login from '../components/Login'
import Layout from '../components/Layout'
import Summary from '../components/Summary'
import classes from '../styles/Cart.module.scss'
import formClasses from '../styles/Form.module.scss'
import Register from '../components/Register'
const Auth = () => {
    const [register, setRegister] = useState(false)
    return (
        <Layout>
            <Stepper activeStep={0} />
            
            <div className={classes.container}>
                <div className={classes.cols}>
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
