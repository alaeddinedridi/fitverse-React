import React from 'react'
import Layout from '../components/Layout'
import Products from '../components/Products'
const Women = () => {
    const data = "women";
    return (
        <Layout>
            <Products category={data} />
        </Layout>
    )
}

export default Women
