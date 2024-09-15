import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import classes from '../styles/Product-details.module.scss'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {MdPlace} from 'react-icons/md'
import {addItem,selectCart} from '../redux/features/cartSlice'
import { useDispatch,useSelector } from 'react-redux'
const ProductDetails = () => {
    const [product, setProduct] = useState({})
    let { id } = useParams();
    const dispatch=useDispatch()
    const [featured, setFeatured] = useState(0)

    // When we click on a product, a request is sent to the backend to get that product from database and display all product's informations
    const fetch=async()=>{
        const { data } = await axios.get('http://localhost:3001/product/'+id)
        console.log(data)
        setProduct(data)
    }
    useEffect(() => {
        document.title = "Product Details - FitVerse"
        console.log(id)
        // call the fetch function while page is loading
        fetch()

    }, [])
    return (
        <Layout>
            <div className={classes.container}>
                <div className={classes.container__left}>
                    <div className={classes.left__img_list}>
                        <div><img src="" alt="" /></div>
                    </div>
                    
                    <div className={classes.left__img}>{product.images && <img className={classes.img} src={"http://localhost:3001/uploads/"+product.images[featured]} alt="" />}</div>
                </div>
                <div className={classes.container__right}>
                    <h1 className={classes.right__title}>{product.name}</h1>
                    <div className={classes.right__description}>{product.description}</div>
                    <div className={classes.right__price}>$ {product.price}</div>
                    <div className={classes.right__stock}>In stock</div>
                    <div className={classes.imgs_wrapper}>
                        {product.images && product.images.map((image,index)=><div key={index} className={classes.right__img}><img className={classes.img} onClick={()=>setFeatured(index)} src={"http://localhost:3001/uploads/"+image} alt="" /></div>)}
                        
                    </div>
                    <div className={classes.btns}>
                        <button onClick={()=> dispatch(addItem(product))} className={classes.btn+" "+classes.btn_black}>Add to cart</button>
                        <button className={classes.btn+" "+classes.btn_white}><MdPlace className={classes.icon}/>Store availability </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails