import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import classes from '../../styles/Dashboard.module.scss'
import { selectUser } from '../../redux/features/authSlice'
import { useDispatch,useSelector } from 'react-redux'

const Dashboard = (props) => {
    const [products,setProducts]=useState([])
    const [nbrOfProducts,setNbrOfProducts]=useState(0)
    const [nbrOfOrders,setNbrOfOrders]=useState(0)
    const [nbrOfUsers,setNbrOfUsers]=useState(0)
    const [orders,setOrders]=useState([])
    const [users,setUsers]=useState([])
    const [dailySales, setDailySales]=useState(0)
    const [monthlySales, setMonthlySales]=useState(0)
    const [yearlySales, setYearlySales]=useState(0)

    const user = useSelector(selectUser)
    const read = async ()=>{
        
        // const {orders}=await axios.get('http://localhost:3001/orders/read')
        // setOrders(orders)
        // const {users}=await axios.get('http://localhost:3001/users/read')
        // setUsers(users)
    }

  
    useEffect(async () => {
        document.title = "Admin Dashboard - FitVerse"
        try{
            // Make multiple API calls at the same time
            const [productsData, ordersData, usersData] = await Promise.all([
                await axios.get('http://localhost:3001/products/read'),
                await axios.get('http://localhost:3001/orders/read',{
                    headers: {
                    authorization: `Bearer ${user.token}`,
                    },
                }),
                await axios.get('http://localhost:3001/users/read',{
                    headers: {
                    authorization: `Bearer ${user.token}`,
                    },
                })

            ])
           
            setProducts(productsData.data)
            console.log(productsData.data)
          
            setOrders(ordersData.data)
           
            setUsers(usersData.data)
            

            setNbrOfProducts(products.length)

            setNbrOfOrders(orders.length)
            setNbrOfUsers(users.length)

            // let dateAndPriceOrders= orders.map(order=> {
            //     const date = order.createdAt.substring(0,order.createdAt.indexOf('T'))
            //     const price = order.total
            //     return {date,price}
            // })
            // console.log(dateAndPriceOrders)

            // const firstItemDate=dateAndPriceOrders[0].date
            // let dailyOrderPrice=dateAndPriceOrders[0].price

            // for (let i=1;i<dateAndPriceOrders;i++){
            //     if (firstItemDate === dateAndPriceOrders[i].date){
            //         dailyOrderPrice+=dateAndPriceOrders[i].price
            //     }
            // }
            // setDailySales(dailyOrderPrice)
            
           
        }catch(e){
            console.log(e.message)
        }
        
    }, [])

    return (
        <AdminLayout>
            
            <div className={classes.container}>
                <div className={classes.card}>Number of products <div>{nbrOfProducts}</div></div>
                <div className={classes.card}>Number of Orders <div>{nbrOfOrders}</div></div>
                <div className={classes.card}>Number of Users <div>{nbrOfUsers}</div></div>
                <div className={classes.card}>Daily Sales <div>$249.95</div></div>
                <div className={classes.card}>Monthly Sales <div>$2.942.32</div></div>
                <div className={classes.card}>Yearly Sales <div>$8.638.32</div></div>
            </div>
            
        </AdminLayout>
    )
}

export default Dashboard
