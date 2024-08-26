import React,{useEffect} from 'react'
import classes from '../styles/Sidebar.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import { selectToggle} from '../redux/features/sidebarSlice'
import {toggle} from '../redux/features/sidebarSlice'
import { Link,useNavigate } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import { items } from '../utils/navbarItems'
import { selectNbrItems,clear } from '../redux/features/cartSlice'
import { selectUser,logout } from '../redux/features/authSlice'
import {BsHandbag} from 'react-icons/bs'
import {BiUser} from 'react-icons/bi'
import {MdLanguage, MdOutlineLogout} from 'react-icons/md'

const Sidebar = (props) => {
    const dispatch=useDispatch()
    const open=useSelector(selectToggle)
    const navigate=useNavigate()
    let nbrOfItems = useSelector(selectNbrItems)
    const user = useSelector(selectUser)


    const logoutHandler=()=>{
        dispatch(logout())
        dispatch(clear())
        navigate('/')
    }

    useEffect(() => {
        if (open){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'visible';
        }
    }, [open])
       
    return (
        <aside className={open ? `${classes.container} ${classes.show_sidebar}` : classes.container}>
            {/* <div>this is a sidebar</div>
            <div onClick={()=>dispatch(toggle(false))}>close</div> */}
            <div className={classes.navbar}>
                <div className={classes.navbar__left__brand+" "+classes.nav_item}><Link onClick={()=>dispatch(toggle(false))} style={{ textDecoration: 'none',color:'black' }} to="/"><img src={'/images/clothes/fitverse.png'} alt=""/></Link></div>
                <div className={classes.navbar__left__toggle+" "+classes.nav_item}>
                    <p onClick={()=>dispatch(toggle(false))}>X</p>
                </div>
            </div>

            <div className={classes.navbar__items}>
                {items.map((item,index)=><div key={index} className={classes.navbar__item+" "+classes.navbar__items__item+" "+classes.nav_item}><Link onClick={()=>dispatch(toggle(false))} style={{ textDecoration: 'none',color:'black' }} to={"/"+item}>{item}</Link></div>)}
            </div>

            <div>
                <div className={classes.navbar__item}><Link style={{ textDecoration: 'none',color:'black' }} to={user != null ? "/admin/dashboard" : "/admin/login"}><BiUser className={classes.navbar__right__icon+" "+classes.nav_item} /></Link></div> 
                        {/* <div className={classes.navbar__item}><FiHeart className={classes.navbar__right__icon+" "+classes.nav_item} /></div> */}
                <div className={classes.navbar__item}><MdOutlineLogout onClick={logoutHandler} className={classes.navbar__right__icon+" "+classes.nav_item} /></div>

                <div className={classes.navbar__item+" "+classes.navbar_item__cart}>{nbrOfItems>0 && <div className={classes.nbr_items}>{nbrOfItems}</div>}<BsHandbag onClick={()=>navigate('/cart')} className={classes.navbar__right__icon+" "+classes.nav_item} /></div>
            </div>
            
        </aside>
    )
}

export default Sidebar
