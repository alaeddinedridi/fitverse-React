import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import Products from '../components/Products'
const Watches = () => {
    const data = "watches";
    useEffect(() => {
        document.title = "Watches - FitVerse"

    }, [])
    return (
        <Layout>
            <Products category={data} />
        </Layout>
    )
}

export default Watches
