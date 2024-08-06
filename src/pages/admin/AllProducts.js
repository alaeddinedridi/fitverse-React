import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../../components/Product'
import classes from '../../styles/AllProducts.module.scss'

import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
const AllProducts = (props) => {
    const [products, setproducts] = useState([])
    const read = async ()=>{
        const {data}=await axios.get('http://localhost:3001/products/read')
        setproducts(data)
    }
    useEffect(() => {
        read()
    }, [])

    return (
        <AdminLayout>

            <div className={classes.container}>
                
                <div className={classes.container__grid}>
                    {products && products.map((product,index)=><Product key={index} product={product} />)} 
                </div>
                {/* <div className={open ? classes.bg : ''}><Sidebar /></div> */}
            </div> 
        </AdminLayout>
    )
}

export default AllProducts
