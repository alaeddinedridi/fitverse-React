import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../components/Product'
import classes from '../styles/Products.module.scss'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectToggle} from '../redux/features/sidebarSlice'
import {items} from '../utils/navbarItems'
import {filterItems} from '../utils/filterItems'
import {FiChevronDown} from 'react-icons/fi'
import {BsChevronDown,BsChevronUp} from 'react-icons/bs'
import axios from 'axios'
import {searchForProduct,selectSearch} from '../redux/features/navbarSlice'

const Products = (props) => {
    const linksContainerRef = useRef([]);
    const linksRef = useRef([]);
    const [show, setShow] = useState(true)
    const [products, setproducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    let whatWeAreSearchingFor= useSelector(selectSearch)

    const read = async ()=>{
        const {data}=await axios.get('http://localhost:3001/products/readbycategory/'+props.category)
        setproducts(data)
    }

    const [idOfRemovedProduct, setIdOfRemovedProduct] = useState("");

    const handleDataFromChild = (id) => {
        setIdOfRemovedProduct(id);
        console.log("this is the id of the removed product: "+id)
        setproducts(products.filter(product=> product._id != id))
    }

    useEffect(() => {
        read()
        if (whatWeAreSearchingFor.length>0 && products.length>0){
            setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(whatWeAreSearchingFor)))
            console.log("filtered products: "+filteredProducts)
            console.log("this is whatWeAreSearchingFor: "+whatWeAreSearchingFor)
        }
        
    }, [whatWeAreSearchingFor])

    const toggleItems =(index)=>{
        console.log('this is the index '+index)
        const linksHeight = linksRef.current[index].getBoundingClientRect().height;
        console.log(linksHeight)
        setShow(!show)
        
        console.log('ater setshow'+show)
      
        if (show) {
            console.log('inside show is true')
            linksContainerRef.current[index].style.height = `${linksHeight}px`;
            console.log(linksHeight)
        } else {
            console.log('inside show is false')
            linksContainerRef.current[index].style.height = '0px';
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.container__left}>
                <div className={classes.filter}>Filter by</div>
                <div className={classes.m_top}>
                    <input type="checkbox" id="available" name="available" value="available" className={classes.checkbox} />
                    <label htmlFor="available">Available online</label>
                </div>
                <div className={classes.m_top}>
                    <input type="checkbox" id="novelty" name="novelty" value="novelty" className={classes.checkbox} />
                    <label htmlFor="novelty">Novelty</label>
                </div>
                <div className={classes.m_top}>
                    <input type="checkbox" id="essential" name="essential" value="essential" className={classes.checkbox} />
                    <label htmlFor="essential">Essential</label>
                </div>
                {filterItems.map((filterItem,filterIndex)=>(
                <div key={filterIndex} className={classes.m_top}>
                    <div className={classes.left__filter} onClick={()=>toggleItems(filterIndex)}><div className={classes.filter}>{filterItem.name}</div>{show ?<BsChevronDown />:<BsChevronUp />}</div>
                    <div className={classes.links_container} ref={container => linksContainerRef.current[filterIndex] = container}>
                        <div className={classes.links} ref={link => linksRef.current[filterIndex] = link}>
                            {filterItem.subitems.map((link,index) => {
                            return (
                                <div key={index} className={classes.subItem}>
                                {link}
                                </div>
                            );
                            })}
                        </div>
                    </div>
                </div>
                ))}
                <div className={classes.filter+" "+classes.m_top}>Sort by</div>
                <div className={classes.m_top}>
                    <input type="radio" id="low" name="sort" value="low" className={classes.radio} />
                    <label htmlFor="low">Price low to high</label>
                </div>
                <div className={classes.m_top}>
                    <input type="radio" id="high" name="sort" value="high" className={classes.radio} />
                    <label htmlFor="high">Price high to low</label>
                </div>
                <div className={classes.m_top}>
                    <input type="radio" id="recommended" name="sort" value="recommended" className={classes.radio} />
                    <label htmlFor="recommended">Recommended</label>
                </div>
                
            </div>
            <div className={classes.container__grid}>
                {whatWeAreSearchingFor.length>0 ? filteredProducts.map((product,index)=><Product key={index} product={product} sendDataToParent={handleDataFromChild} />) : products.map((product,index)=><Product key={index} product={product} sendDataToParent={handleDataFromChild} />) } 
            </div>
            {/* <div className={open ? classes.bg : ''}><Sidebar /></div> */}
        </div> 
    )
}

export default Products
