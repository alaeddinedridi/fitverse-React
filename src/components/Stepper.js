import React from 'react'
import classes from '../styles/Stepper.module.scss'
import {AiOutlineCheck} from 'react-icons/ai'
import { Link } from 'react-router-dom'
const Stepper = (props) => {
    
    
    const not_active=classes.not_active
    
    const steps=["Login","Shipping","Payment Method","Order confirmation"]
    const locations=["login","shipping","payment","order"]
    console.log(steps)
    
    return (
        
            <div className={classes.wrapper}>
                {steps.map((step,index)=><Link to={"/"+locations[index]} style={{textDecoration:"none",color:'black'}} key={index}><div className={index === props.activeStep ?`${classes.step} ${classes.active}` : `${classes.step}`}>
                    <div className={index> props.activeStep ?`${classes.index} ${not_active}` : `${classes.index}`}>{index+1}</div>
                    <div className={classes.label}>{step}</div>
                </div></Link>)}
    
            </div>
        
      
        
    )
}

export default Stepper