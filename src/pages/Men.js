import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import Products from '../components/Products'
const Men = () => {
    const data = "men";
    useEffect(() => {
        document.title = "Men - FitVerse"

    }, [])
    return (
        <Layout>
            <Products category={data} />
        </Layout>
    )
}

export default Men
