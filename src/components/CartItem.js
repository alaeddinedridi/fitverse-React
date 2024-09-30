import React from 'react'
import classes from '../styles/Cart.module.scss'
import {GrClose} from 'react-icons/gr'
import {FiHeart} from 'react-icons/fi'
import {removeItem,selectCart} from '../redux/features/cartSlice'
import { useDispatch,useSelector } from 'react-redux'
const CartItem = (props) => {
    const dispatch = useDispatch()
    const {images,name,price,description}=props.item
    return (
        <div className={classes.cart_item}>
            <div className={classes.cart_item__img}>
                <img className={classes.img} src={`http://localhost:3001/uploads/${images[0]}`} alt="" />
            </div>
            <div className={classes.cart_item__content}>
                <div className={classes.header}>
                    <div className={classes.title}>{name}</div>
                    <div className={classes.price}>{"$"+price}</div>
                    <div><GrClose className={classes.remove} onClick={()=> dispatch(removeItem(props.item))} /></div>
                </div>
                
                <div className={classes.description}>36mm, hand-wound mechanical movement, rose gold, diamonds, leather</div>
                <div className={classes.footer}>
                    <div className={classes.footer__wishlist}><FiHeart /> Move to wishlist</div>
                </div>
                
            </div>
        </div>
    )
}

export default CartItem
