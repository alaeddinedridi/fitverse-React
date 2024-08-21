import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../../components/Product'
import classes from '../../styles/AllProducts.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'

import {searchForProduct,selectSearch} from '../../redux/features/navbarSlice'
import { readAllProducts, selectAllProductsData } from '../../redux/features/productSlice'


const AllProducts = (props) => {
    const [products, setproducts] = useState([])
    const [categoryProducts, setCategoryProducts] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([])
    let whatWeAreSearchingFor= useSelector(selectSearch)
    let productsdata= useSelector(selectAllProductsData)
    const dispatch=useDispatch()
    const read = async ()=>{
        const {data}=await axios.get('http://localhost:3001/products/read')
        setproducts(data)
        
    }

    
    const [idOfRemovedProduct, setIdOfRemovedProduct] = useState("");

    const handleCategoryFilter = async (category) =>{
        console.log("category: "+category)
        
        if (category==="all"){
            const {data}=await axios.get('http://localhost:3001/products/read')
            setproducts(data)
            //setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(whatWeAreSearchingFor)))
        }else{
            const {data}=await axios.get('http://localhost:3001/products/readbycategory/'+category)
            setproducts(data)
            //setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(whatWeAreSearchingFor)))
        }

        dispatch(searchForProduct(""))
      
        
    }

    const handleDataFromChild = (id) => {
        setIdOfRemovedProduct(id);
        console.log("this is the id of the removed product: "+id)
        setproducts(products.filter(product=> product._id != id))
    }

    useEffect(() => {
        document.title = "Admin Products - FitVerse"
        //read()
        console.log("call function")
        //dispatch(readAllProducts())
        read()

        //setproducts(productsdata)
        console.log("products : "+productsdata)
        console.log("products: "+products)
        //console.log("products: "+products)
        setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(whatWeAreSearchingFor)))
    }, [whatWeAreSearchingFor])

    return (
        <AdminLayout>
            <div className={classes.filter_wrapper}><label htmlFor='category'>Filter by:</label><select className={classes.filter} id="category" name="category" onChange={(e) => handleCategoryFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="watches">Watches</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="children">Children</option>
                </select></div>
            <div className={classes.container}>
                
                <div className={classes.container__grid}>
                {filteredProducts.length>0 ?
                filteredProducts.map((product,index)=><Product key={index} product={product} sendDataToParent={handleDataFromChild} />) 
                : 
                products.map((product,index)=><Product key={index} product={product} sendDataToParent={handleDataFromChild} />) } 
                </div>
                {/* <div className={open ? classes.bg : ''}><Sidebar /></div> */}
            </div> 
        </AdminLayout>
    )
}

export default AllProducts
