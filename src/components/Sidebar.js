import React,{useEffect} from 'react'
import classes from '../styles/Sidebar.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import { selectToggle} from '../redux/features/sidebarSlice'
import {toggle} from '../redux/features/sidebarSlice'
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
            <div>this is a sidebar</div>
            <div onClick={()=>dispatch(toggle(false))}>close</div>
        </aside>
    )
}

export default Sidebar
