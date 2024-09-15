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
import toast, { Toaster } from 'react-hot-toast';

const addProductSchema = yup.object({
  name: yup.string().required().min(3),
  category: yup.string().required().min(3),
  brand: yup.string().required().min(2),
  price: yup.number().required().min(1),
  stock: yup.number().required().min(1),
  description: yup.string().required().min(6),
});

const ProductUpload = () =>{

    const {handleSubmit,register,reset,formState: { errors }} = useForm({
      resolver: yupResolver(addProductSchema)
    });

    const [files, setFiles] = useState([])
    const [product, setProduct] = useState({})
    const [productExist, setProductExist]= useState(false)
    const [pictures, setPictures] = useState([])
    let { id } = useParams();
    const user = useSelector(selectUser)
  

    const fetch=async()=>{
      // if id is not undefined, then we are on update product page
      if (id != undefined){
        console.log("this is the id not undefined: "+id)
        // Get the product that we want to update from database
        const { data } = await axios.get('http://localhost:3001/product/'+id)
        console.log("fetched product"+data)
        setProduct(data)
        setProductExist(true)
      }else{
        setProductExist(false)
      }
      
    }

    // useForm({
    //   defaultValues: {
    //     name: 'a',
    //     category: 'd',
    //     brand: '',
    //     price: '',
    //     stock: '',
    //     description: ''
    //   }
    // })

    
    useEffect( () => {
      document.title = "Admin Product Upload - FitVerse"

      console.log("this is the id: "+id)
      // Call the fetch function to check if we are on the update product page or on the upload product page
      fetch()
      
      console.log("exist ?"+productExist)
    }, [])


    let defaultProduct={
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      stock: product.countInStock,
      description: product.description
    }


    useEffect( ()=> {
      // if we are on update product page, then fill the form fields with the acutal product informations
      if (productExist){
        reset({...defaultProduct});
      }
    },[productExist])

    const submitHandler=async(formdata)=>{

      
      //const role=user.user.role
      let dataToBeSent={}

      // If there are pictures selected then we have to set then in a FormData so we can send them to the backend
      // but we will also need to put product's informations also in FormData so we can send them together
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
        // Otherwise if we don't have pictures selected, then just Get the new product's informations from the form fields

        const name=formdata.name
        const category=formdata.category
        const brand=formdata.brand
        const price=formdata.price
        const stock=formdata.stock
        const description=formdata.description

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
        // if we are on update product page 
        try{
          console.log("we are going to update the product")
       
          // update the product with new informations
          // We send the token in the request, so in the backend we confirm that the request comes from admin
          const { res } = await axios.put('http://localhost:3001/product/update/'+id,dataToBeSent,
          {
            headers: {
              authorization: `Bearer ${user.token}`
            }
          });
          console.log(res)
          // Display a notification with message "Product updated!"
          toast.success('Product updated!', {
            duration: 10000,
          });
         
        }catch(e){
            // if there's an error then display "Failed to update the product!"
            console.log(e.message)
            toast.error('Failed to update the product!', {
              duration: 10000,
            });
        }
      }else{
        // if we are on upload new product page 
        try{
          // Upload the new product
          // We send the token in the request, so in the backend we confirm that the request comes from admin
          const { res } = await axios.post('http://localhost:3001/product/upload', dataToBeSent,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            }
          });
          console.log(res)
          // Display a notification with message "Product uploaded!"
          toast.success('Product uploaded!', {
            duration: 10000,
          });
         
        }catch(e){
            console.log(e.message)
            // if there's an error then display "Failed to upload the product!"
            toast.error('Failed to upload the product!', {
              duration: 10000,
            });
        }
      }
      
    }


    



  return (
    <AdminLayout>
      <div className={classes.container}>
        {/* Toaster is used to show notifications */}
      <Toaster />
      {/* When we click on Update or upload button then call the function "submitHandler" to update or upload new product */}
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.left_wrapper}>

          <div className={classes.form__element}>
              <input type="text" className={classes.form__text_input} placeholder="Name" {...register("name")} />
          </div>
        
          <div className={classes.form__element}>
            <select name="category" className={classes.form__text_input} id="category" {...register("category")}>
              <option value="watches">Watches</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="children">Children</option>
            </select>

          </div>
          <div className={classes.form__element}>
              <input type="text" className={classes.form__text_input} placeholder="Brand" {...register("brand")} />
          </div>
          <div className={classes.form__element}>
              <input type="number" step="0.001" className={classes.form__text_input} placeholder="Price" {...register("price")} />
          </div>
          <div className={classes.form__element}>
              <input type="number" className={classes.form__text_input} placeholder="Stock" {...register("stock")} />
          </div>
          <div className={classes.form__element}>
            <textarea className={classes.form__text_area} name="description" placeholder="Write a description" rows="4" cols="50" {...register("description")}></textarea>
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
