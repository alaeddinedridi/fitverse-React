import React from 'react'
import Layout from '../components/Layout'
import Products from '../components/Products'
const Men = () => {
    const data = "men";
    return (
        <Layout>
            <Products category={data} />
        </Layout>
    )
}

export default Men
