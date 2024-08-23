import React from 'react'
import {MdLanguage, MdOutlineLogout} from 'react-icons/md'
import {GrLocation} from 'react-icons/gr'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsHandbag} from 'react-icons/bs'
import {BiUser} from 'react-icons/bi'
import {FiSearch,FiHeart} from 'react-icons/fi'
import classes from '../styles/Layout.module.scss'
import { items } from '../utils/navbarItems'
import { Link,useNavigate } from 'react-router-dom'
import Product from './Product'
import { useDispatch,useSelector } from 'react-redux'
import {toggle} from '../redux/features/sidebarSlice'
import {searchForProduct,selectSearch} from '../redux/features/navbarSlice'
import { selectNbrItems,clear } from '../redux/features/cartSlice'
import { selectUser,logout } from '../redux/features/authSlice'
import {FaFacebookF,FaTwitter,FaYoutube,FaInstagram,FaLinkedinIn,FaWeibo} from 'react-icons/fa'
import {RiWechatFill} from 'react-icons/ri'
import { footerItems } from '../utils/footerItems'

const Layout = (props) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let nbrOfItems = useSelector(selectNbrItems)
    let whatWeAreSearchingFor= useSelector(selectSearch)
    const user = useSelector(selectUser)


    const logoutHandler=()=>{
        dispatch(logout())
        dispatch(clear())
        navigate('/')
    }
    return (
        <div>
            <header>
                <div className={classes.header}>
                    <div className={classes.header__left}>
                        <div><GrLocation className={classes.nav_item+" "+classes.header__icon} /></div>
                        <div className={classes.header__left__lang}><MdLanguage className={classes.nav_item+" "+classes.header__icon} /><div className={classes.header__item+" "+classes.nav_item}>English / Tunisia</div></div>
                    </div>
                    <div className={classes.header__center+" "+classes.nav_item}>SHOP THE SALE SELECTION: NOW UP TO 50% OFF</div>
                    <div className={classes.header__right}><AiOutlineQuestionCircle className={classes.nav_item+" "+classes.header__icon} /><div className={classes.header__item+" "+classes.nav_item}>Customer Service</div></div>
                </div>
                <nav className={classes.navbar}>
                    <div className={classes.navbar__left}>
                        <div className={classes.navbar__left__brand+" "+classes.nav_item}><Link style={{ textDecoration: 'none',color:'black' }} to="/"><img src={'/images/clothes/fitverse.png'} alt=""/></Link></div>
                        <div className={classes.navbar__left__toggle+" "+classes.nav_item}><GiHamburgerMenu onClick={()=>dispatch(toggle(true))}/></div>
                    </div>
                    <div className={classes.navbar__items}>
                        {items.map((item,index)=><div key={index} className={classes.navbar__item+" "+classes.navbar__items__item+" "+classes.nav_item}><Link style={{ textDecoration: 'none',color:'black' }} to={"/"+item}>{item}</Link></div>)}
                    </div>
                    <div className={classes.navbar__right}>
                        <div className={classes.navbar__right__search_wrapper}><div><FiSearch className={classes.navbar__right__icon+" "+classes.nav_item} /></div><input type="search" placeholder="Search" value={whatWeAreSearchingFor} onChange={(e)=> dispatch(searchForProduct(e.target.value))} className={classes.search} /></div>
                        <div className={classes.navbar__item}><Link style={{ textDecoration: 'none',color:'black' }} to={user != null ? "/admin/dashboard" : "/admin/login"}><BiUser className={classes.navbar__right__icon+" "+classes.nav_item} /></Link></div> 
                        {/* <div className={classes.navbar__item}><FiHeart className={classes.navbar__right__icon+" "+classes.nav_item} /></div> */}
                        <div className={classes.navbar__item}><MdOutlineLogout onClick={logoutHandler} className={classes.navbar__right__icon+" "+classes.nav_item} /></div>

                        <div className={classes.navbar__item+" "+classes.navbar_item__cart}>{nbrOfItems>0 && <div className={classes.nbr_items}>{nbrOfItems}</div>}<BsHandbag onClick={()=>navigate('/cart')} className={classes.navbar__right__icon+" "+classes.nav_item} /></div>
                    </div>
                </nav>
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <div className={classes.col_left + " " + classes.interline}>
                    {footerItems.map((item,index)=><span className={classes.word} key={index}>{item}</span>)}
                </div>
                <div className={classes.col_right}>
                    <div>
                        <div>Email: contact@fitverse.com</div>
                        <div>Phone: (+216) 26210996</div>
                    </div>
                    <div className={classes.icons}>
                        <FaFacebookF className={classes.icon}/>
                        <FaTwitter className={classes.icon}/>
                        <FaYoutube className={classes.icon}/>
                        <FaInstagram className={classes.icon}/>
                        <FaLinkedinIn className={classes.icon}/>
                        <FaWeibo className={classes.icon}/>
                        <RiWechatFill className={classes.icon}/>
                    </div>
                    
                </div>
            </footer>
        </div>
    )
}

export default Layout
