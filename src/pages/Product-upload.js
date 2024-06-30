import React,{useEffect,useState} from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout'
import axios from 'axios'
import classes from '../styles/Product-upload.module.scss'

const ProductUpload = () =>{
    const [files, setFiles] = useState([])

    const handleUploadClick= async()=>{
        if (files.length>0) {
            const data = new FormData()
            console.log("those are files:"+Array.from(files))
            Array.from(files).forEach((file, i) => {
                data.append("files", file, file.name)
            })
        
            try{
                const {res} = await axios.post('http://localhost:3001/product/upload',data,
                {
                  "Content-Type": "multipart/form-data"
                })
                console.log(res)
            }catch(e){
                console.log(e.message)
            }
            
        }
    }

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.form__element}>
            <input type="text" className={classes.form__text_input} placeholder="Name" />
      
        </div>
        <input type="file" accept="image/*" multiple onChange={(e)=> setFiles(e.target.files)} />
        <button onClick={handleUploadClick}>Upload</button>
      </div>
    </Layout>
  )
}

export default ProductUpload
