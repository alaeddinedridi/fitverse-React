import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import Products from '../components/Products'
const Women = () => {
    const data = "women";
    useEffect(() => {
        document.title = "Women - FitVerse"

    }, [])
    return (
        <Layout>
            <Products category={data} />
        </Layout>
    )
}

export default Women
