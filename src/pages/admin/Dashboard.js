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
    const [fetched,setFetched]=useState(false)
    const [orders,setOrders]=useState([])
    const [users,setUsers]=useState([])
    const [averageDailySales, setAverageDailySales]=useState(0)
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

            // calculate daily sales
            let dateAndPriceOrders= orders.map(order=> {
                const date = order.createdAt.substring(0,order.createdAt.indexOf('T'))
                const price = order.total
                return {date,price}
            })
            console.log("those are dateAndPriceOrders: "+dateAndPriceOrders)
            
            let dailyAvgPrices=[]
            dateAndPriceOrders.map((elementI,i)=>{
                console.log("this is i: "+i)
                let similarDates=[]
                // console.log("inside i")
                dateAndPriceOrders.map((elementJ,j)=>{
                    console.log("this is j: "+j)
                    // console.log("the i date:"+elementI.date)
                    // console.log("the j date:"+elementJ.date)
                    if (elementI.date === elementJ.date){
                        similarDates.push(elementJ)
                        dateAndPriceOrders.splice(j, 1);
                        console.log("those are similar dates: elementI.date = "+elementI.date+" and elementJ.date = "+elementJ.date)
                        //dailyOrderPrice+=dateAndPriceOrders[i].price
                    }
                })
                
                let dailySales=0

                similarDates.map(similarDate=>console.log(similarDate.date))
                similarDates.map(similarDate=>{
                    dailySales+=similarDate.price
                })
                
                let currentElement=elementI
                dailyAvgPrices.push(dailySales/similarDates.length)
                
            })
            console.log("those are daily dates:")
            let totalDailyAvgPrice=0
            dailyAvgPrices.map(dailyAvgPrice=>{
                totalDailyAvgPrice+=dailyAvgPrice
            })
            //setDailySales(dailyOrderPrice)
            setAverageDailySales((totalDailyAvgPrice/dailyAvgPrices.length).toFixed(2))

            // calculate monthly sales

            let today = new Date();
            let year = today.getFullYear();
            console.log("this is year:"+year)
            let monthlyAvgPrices=0
            let monthlyPrices=0

            dateAndPriceOrders.map(dateAndPriceOrder=>{
                console.log("this is sub year:"+dateAndPriceOrder.date.substring(0,4))
                if (dateAndPriceOrder.date.substring(0,4) == year){
                    monthlyPrices+=dateAndPriceOrder.price
                    console.log("monthly prices: "+monthlyPrices)
                }
            })

            monthlyAvgPrices=monthlyPrices/12
            console.log("monthly average: "+monthlyAvgPrices)
            setMonthlySales(monthlyAvgPrices.toFixed(2))


            // yearly sales
            setYearlySales(monthlyPrices.toFixed(2))

            //console.log("try daily another way: "+monthlyAvgPrices/30)


           if (!fetched){
            setFetched(true)
           }
        }catch(e){
            console.log(e.message)
        }
        
    }, [fetched])

    return (
        <AdminLayout>
            
            <div className={classes.container}>
                <div className={classes.card}>Number of products <div>{products && nbrOfProducts}</div></div>
                <div className={classes.card}>Number of Orders <div>{orders && nbrOfOrders}</div></div>
                <div className={classes.card}>Number of Users <div>{users && nbrOfUsers}</div></div>
                <div className={classes.card}>Daily Sales <div>${averageDailySales}</div></div>
                <div className={classes.card}>Monthly Sales <div>${monthlySales}</div></div>
                <div className={classes.card}>Yearly Sales <div>${yearlySales}</div></div>
            </div>
            
        </AdminLayout>
    )
}

export default Dashboard
