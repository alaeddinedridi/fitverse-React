import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import classes from '../../styles/Dashboard.module.scss'
const Dashboard = (props) => {
    const [products,setProducts]=useState([])
    const [nbrOfProducts,setNbrOfProducts]=useState(0)
    const [orders,setOrders]=useState([])
    const [users,setUsers]=useState([])

    const read = async ()=>{
        const {productsData}=await axios.get('http://localhost:3001/products/read')
        setProducts(productsData)
        // const {orders}=await axios.get('http://localhost:3001/orders/read')
        // setOrders(orders)
        // const {users}=await axios.get('http://localhost:3001/users/read')
        // setUsers(users)
    }

  
    useEffect(() => {
        const {productsData}= axios.get('http://localhost:3001/products/read')
        setProducts(productsData)
        //setNbrOfProducts(products.length)
        //console.log(nbrOfProducts)
        console.log(products)
        // nbrOfOrders=orders.length
        // nbrOfUsers=users.length
    }, [products])

    return (
        <AdminLayout>
            <div className={classes.container}>
                <div className={classes.card}>Number of products <div>{nbrOfProducts}</div></div>
                <div className={classes.card}>Number of Orders <div>{nbrOfProducts}</div></div>
                <div className={classes.card}>Number of Users <div>{nbrOfProducts}</div></div>
                <div className={classes.card}>Daily Sales <div>$249.95</div></div>
                <div className={classes.card}>Monthly Sales <div>$2.942.32</div></div>
                <div className={classes.card}>Yearly Sales <div>$8.638.32</div></div>
            </div>
            
        </AdminLayout>
    )
}

export default Dashboard
