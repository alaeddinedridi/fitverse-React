import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../../components/Product'
import classes from '../../styles/Form.module.scss'
import { selectUser } from '../../redux/features/authSlice'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import { useSelector,useDispatch } from 'react-redux'
import Login from '../../components/Login'
import Layout from '../../components/Layout'
const Orders = (props) => {
    const [orders, setorders] = useState([])
    const user = useSelector(selectUser)
    const read = async ()=>{
        const {data}=await axios.get('http://localhost:3001/orders/read',{
            headers: {
              authorization: `Bearer ${user.token}`,
            },
        })
        setorders(data)
    }
    useEffect(() => {
        read()
    }, [])

    return (
            <Layout>
               
                <Login />
                   
            </Layout>
    
    )
}

export default Orders