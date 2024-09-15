import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../../components/Product'
import classes from '../../styles/Orders.module.scss'

import { selectUser } from '../../redux/features/authSlice'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import CartItem from '../../components/CartItem'
import Card from '../../components/Card'
import {GrClose} from 'react-icons/gr'
import {FiHeart} from 'react-icons/fi'
import { useDispatch,useSelector } from 'react-redux'
import Order from '../Order'
const Orders = (props) => {
    const [orders, setorders] = useState([])
    const user = useSelector(selectUser)

    // Read all orders from the database
    const read = async ()=>{
        const {data}=await axios.get('http://localhost:3001/orders/read',{
            headers: {
              authorization: `Bearer ${user.token}`,
            },
        })
        setorders(data)
    }
    useEffect(() => {
        document.title = "Admin Orders - FitVerse"

        read()
    }, [])

    return (
        <AdminLayout>

            <div className={classes.container}>
                  
                {/* Display orders here */}
                {orders.map((order,index)=>
                    <Card title={"Order - Payment Method: "+order.paymentMethod}>
                        {order.orderItems.map((item,index)=>
                    <div className={classes.cart_item}>
                        <div className={classes.cart_item__img}>
                            <img className={classes.img} src={`http://localhost:3001/uploads/${item.images[0]}`} alt="" />
                        </div>
                        <div className={classes.cart_item__content}>
                            <div className={classes.header}>
                                <div className={classes.title}>{item.name}</div>
                                <div className={classes.price}>{"$"+item.price}</div>
                            </div>
                            
                            <div className={classes.description}>36mm, hand-wound mechanical movement, rose gold, diamonds, leather</div>
                            
                        </div>
                    </div>)}
                    <div className={classes.footer}>
                        <div>
                            <div className={classes.footer__elm}><b>Fullname :</b> {order.shippingAddress.fullname}</div>
                            <div className={classes.footer__elm}><b>Address :</b> {order.shippingAddress.address}</div>
                            <div className={classes.footer__elm}><b>City :</b> {order.shippingAddress.city}</div>
                            <div className={classes.footer__elm}><b>Postal Code :</b> {order.shippingAddress.pcode}</div>
                            <div className={classes.footer__elm}><b>Country :</b> {order.shippingAddress.country}</div>
                        </div>
                        <div className={classes.total}><b>Total : </b> ${order.price}</div>
                    </div>
                    </Card>)}
                
           
            </div>
        </AdminLayout>
    )
}

export default Orders
