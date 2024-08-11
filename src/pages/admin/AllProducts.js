import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../../components/Product'
import classes from '../../styles/AllProducts.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'

import {searchForProduct,selectSearch} from '../../redux/features/navbarSlice'

const AllProducts = (props) => {
    const [products, setproducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    let whatWeAreSearchingFor= useSelector(selectSearch)
    
    const read = async ()=>{
        const {data}=await axios.get('http://localhost:3001/products/read')
        setproducts(data)
        
    }
    useEffect(() => {
        read()
        setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(whatWeAreSearchingFor)))
    }, [whatWeAreSearchingFor])

    return (
        <AdminLayout>

            <div className={classes.container}>
                
                <div className={classes.container__grid}>
                    {filteredProducts && filteredProducts.map((product,index)=><Product key={index} product={product} />)} 
                </div>
                {/* <div className={open ? classes.bg : ''}><Sidebar /></div> */}
            </div> 
        </AdminLayout>
    )
}

export default AllProducts
