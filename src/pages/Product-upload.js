import React,{useEffect,useState} from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout'
import axios from 'axios'
import classes from '../styles/Product-upload.module.scss'
import { useDispatch,useSelector } from 'react-redux'
import {selectUserRole} from '../redux/features/authSlice'
import { selectUser } from '../redux/features/authSlice'
import AdminLayout from '../components/AdminLayout';
import {useParams} from 'react-router-dom'

const addProductSchema = yup.object({
  name: yup.string().required().min(3),
  category: yup.string().required().min(3),
  brand: yup.string().required().min(2),
  price: yup.number().required().min(1),
  stock: yup.number().required().min(1),
  description: yup.string().required().min(6),
});

const ProductUpload = () =>{

    const {handleSubmit,register,formState: { errors }} = useForm({
      resolver: yupResolver(addProductSchema)
    });

    const [files, setFiles] = useState([])
    const [product, setProduct] = useState({})
    const [productExist, setProductExist]= useState(false)
    const [pictures, setPictures] = useState([])
    let { id } = useParams();
    const role = useSelector(selectUserRole);
    const user = useSelector(selectUser)
    console.log("this is the role of the user: "+role)

    const fetch=async()=>{
      const { data } = await axios.get('http://localhost:3001/product/'+id)
      console.log("fetched product"+data)
      setProduct(data)
    }

    useEffect(async () => {
      let exist
      console.log(id)
      await fetch()
      for(var prop in product) {
        console.log("this is prop: "+prop)
        console.log("this is the product: "+product)
        if(product.hasOwnProperty(prop)){
          exist=true
        }else{
          exist=false
        }
        
      }
      setProductExist(exist)
      console.log("exist ?"+productExist)
    }, [productExist])
    const submitHandler=async(formdata)=>{


      const data = new FormData()
  
      data.append("name",formdata.name);
      data.append("category",formdata.category);
      data.append("brand",formdata.brand);
      data.append("price",formdata.price);
      data.append("stock",formdata.stock);
      data.append("description",formdata.description);
      data.append("role",role);
  
     
    
    
      if (productExist){
        try{
          console.log("we are going to update the product")
          console.log("this is the data to be sent: "+data)
          const { res } = await axios.put('http://localhost:3001/product/update/'+id, data,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            }
          });
          console.log(res)
         
        }catch(e){
            console.log(e.message)
        }
      }else{
        if (files.length>0) {
          console.log("those are files:"+Array.from(files))
          //setProducts(Array.from(files))
          Array.from(files).forEach((file, i) => {
            data.append("files", file, file.name)
          })
        }
        try{
          const { res } = await axios.post('http://localhost:3001/product/upload', data,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            }
          });
          console.log(res)
         
        }catch(e){
            console.log(e.message)
        }
      }
      
    }


    



  return (
    <AdminLayout>
      <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.left_wrapper}>

          <div className={classes.form__element}>
              <input type="text" defaultValue={productExist? product.name:""} className={classes.form__text_input} placeholder="Name" {...register("name")} />
          </div>
        
          <div className={classes.form__element}>
            <select name="category" defaultValue={productExist? product.category:""} className={classes.form__text_input} id="category" {...register("category")}>
              <option value="watches">Watches</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="children">Children</option>
            </select>

          </div>
          <div className={classes.form__element}>
              <input type="text" defaultValue={productExist? product.brand:""} className={classes.form__text_input} placeholder="Brand" {...register("brand")} />
          </div>
          <div className={classes.form__element}>
              <input type="text" defaultValue={productExist? product.price:""} className={classes.form__text_input} placeholder="Price" {...register("price")} />
          </div>
          <div className={classes.form__element}>
              <input type="text" defaultValue={productExist? product.countInStock:""} className={classes.form__text_input} placeholder="Stock" {...register("stock")} />
          </div>
          <div className={classes.form__element}>
            <textarea className={classes.form__text_area} defaultValue={productExist? product.description:""} name="description" placeholder="Write a description" rows="4" cols="50" {...register("description")}></textarea>
          </div>
        </div>
        <div className={classes.upload_wrapper}>

          <label htmlFor="file">
            <input type="file" accept="image/*" id="file" multiple onChange={(e)=> setFiles(e.target.files)} />
            <div className={classes.image_upload}>Select product pictures</div>
          </label>
          
          <button className={classes.upload_btn} type="submit">{productExist? "Update":"Upload"}</button>
          

        </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default ProductUpload
