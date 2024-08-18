import React from 'react'
import classes from '../styles/Card.module.scss'
const Card = (props) => {
    const {title,children} = props;

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.content}>{children}</div>
            
        </div>
    )
}

export default Card
