import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import classes from '../styles/Product.module.scss'
import {toggle} from '../redux/features/sidebarSlice'
import {addItem,selectCart} from '../redux/features/cartSlice'
import { useDispatch,useSelector } from 'react-redux'

const Product = (props) => {
    const {_id,name,slug,images,price,brand,countInStock,description}=props.product;
    const [show,setShow]=useState(false)
    const dispatch=useDispatch()
    console.log(images)
    return (
        
        <article className={classes.product} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
            <Link to={`${brand}/${_id}`} style={{ textDecoration: 'none',color:'black' }}>
            <div><img src={`/images/${images[0]}`} className={classes.img} alt={images[0]} /></div>
            <h1 className={classes.title}>{name}</h1>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>$ {price}</div>
            </Link>
            <button onClick={()=> dispatch(addItem(props.product))} className={show ? `${classes.btn} ${classes.btn_show}`:classes.btn}>ADD TO CART</button>
        </article>

    )
}

export default Product
