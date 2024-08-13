import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import Products from '../components/Products'
const Children = () => {
    const data = "children";
    useEffect(() => {
        document.title = "Children - FitVerse"

    }, [])
    return (
        <Layout>
            <Products category={data} />
        </Layout>
    )
}

export default Children
