import React,{useRef,useState,useEffect} from 'react'
// import { products } from '../utils/products'
import Product from '../../components/Product'
import classes from '../../styles/User.module.scss'
import { selectUser } from '../../redux/features/authSlice'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import { useSelector,useDispatch } from 'react-redux'
import Login from '../../components/Login'
import Layout from '../../components/Layout'
import User from '../../components/User'
const Users = (props) => {
    const [users, setUsers] = useState([])
    const user = useSelector(selectUser)
    const read = async ()=>{
        const {data}=await axios.get('http://localhost:3001/users/read',{
            headers: {
              authorization: `Bearer ${user.token}`,
            },
        })
        setUsers(data)
    }
    useEffect(() => {
        document.title = "Users - FitVerse"

        read()
    }, [])

    return (
            <AdminLayout>
                <div className={classes.wrapper}>
                    <table>
                    <tr>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                
                    {users.map(user=> <User user={user} />)}
                        

                </table>
                </div>
               
                   
            </AdminLayout>
    
    )
}

export default Users