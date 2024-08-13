import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import classes from '../styles/Product.module.scss'
import {toggle} from '../redux/features/sidebarSlice'
import {addItem,selectCart} from '../redux/features/cartSlice'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import { selectUser } from '../redux/features/authSlice'

const Product = (props) => {
    const {_id,name,slug,images,price,brand,countInStock,description}=props.product;
    const [show,setShow]=useState(false)
    const dispatch=useDispatch()
    console.log(images)
    const [isAdmin,setIsAdmin]=useState(false)
    const user = useSelector(selectUser)


    const remove =async (id)=>{
    
        try{
            const { res } = await axios.delete('http://localhost:3001/product/delete/'+id)
            console.log(res)

           
        }catch(e){
            console.log(e.message)
        }
    }

    useEffect(()=>{
        
        if (user!=null){
            console.log("this is the role :"+user.user.role)
            if (user.user.role === "admin"){
                setIsAdmin(true)
            }else{
                setIsAdmin(false)
            }
        }
        

    },[])

    return (
        
        <article className={classes.product} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
            <Link to={`/${brand}/${_id}`} style={{ textDecoration: 'none',color:'black' }}>
            <div><img src={`http://localhost:3001/uploads/${images[0]}`} className={classes.img} alt={images[0]} /></div>
            <h1 className={classes.title}>{name}</h1>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>$ {price}</div>
            </Link>
            { !isAdmin && <button onClick={()=> dispatch(addItem(props.product))} className={show ? `${classes.btn} ${classes.btn_show}`:classes.btn}>ADD TO CART</button>}
            { isAdmin && <button onClick={()=> remove(_id)} className={classes.deleteBtn}>Delete</button>}
            { isAdmin && <Link to={"/admin/product/update/"+_id}><button className={classes.updateBtn}>Update</button></Link>}
        </article>

    )
}

export default Product
