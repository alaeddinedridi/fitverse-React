import React,{useEffect} from 'react'
import classes from '../styles/Sidebar.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import { selectToggle} from '../redux/features/sidebarSlice'
import {toggle} from '../redux/features/sidebarSlice'
import { Link,useNavigate } from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import { items } from '../utils/navbarItems'

const Sidebar = (props) => {
    const dispatch=useDispatch()
    const open=useSelector(selectToggle)
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
            
        </aside>
    )
}

export default Sidebar
