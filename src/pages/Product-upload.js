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
    const user = useSelector(selectUser)
  

    const fetch=async()=>{
      if (id != "undefined"){
        const { data } = await axios.get('http://localhost:3001/product/'+id)
        console.log("fetched product"+data)
        setProduct(data)
        setProductExist(true)
        // for(var prop in product) {
        //   console.log("this is prop: "+prop)
        //   console.log("this is the product: "+product)
        //   if(product.hasOwnProperty(prop)){
        //     setProductExist(true)
        //   }else{
        //     setProductExist(false)
        //   }
        // }
        
      }else{
        setProductExist(false)
      }
      
    }

    useEffect( () => {
      document.title = "Admin Product Upload - FitVerse"

      console.log("this is the id: "+id)
      fetch()
     
      
      console.log("exist ?"+productExist)
    }, [])

    const submitHandler=async(formdata)=>{

      const name=formdata.name
      const category=formdata.category
      const brand=formdata.brand
      const price=formdata.price
      const stock=formdata.stock
      const description=formdata.description
      //const role=user.user.role
      let dataToBeSent={}

      if (files.length>0) {
        dataToBeSent = new FormData()
        dataToBeSent.append("name",formdata.name);
        dataToBeSent.append("category",formdata.category);
        dataToBeSent.append("brand",formdata.brand);
        dataToBeSent.append("price",formdata.price);
        dataToBeSent.append("stock",formdata.stock);
        dataToBeSent.append("description",formdata.description);
        dataToBeSent.append("role",user.user.role);
        console.log("those are files:"+Array.from(files))
        Array.from(files).forEach((file, i) => {
          dataToBeSent.append("files", file, file.name)
        })
     
        
      }else{
        dataToBeSent={
          name,
          category,
          brand,
          price,
          stock,
          description
        }
      }
    
      if (productExist){

        try{
          console.log("we are going to update the product")
          //console.log("this is the data to be sent: "+data)
          const { res } = await axios.put('http://localhost:3001/product/update/'+id,dataToBeSent,
          {
            headers: {
              authorization: `Bearer ${user.token}`
            }
          });
          console.log(res)
         
        }catch(e){
            console.log(e.message)
        }
      }else{

        try{
          const { res } = await axios.post('http://localhost:3001/product/upload', dataToBeSent,
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
