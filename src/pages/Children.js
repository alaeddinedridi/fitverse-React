import React from 'react'
import Layout from '../components/Layout'
import Products from '../components/Products'
const Children = () => {
    const data = "children";
    return (
        <Layout>
            <Products category={data} />
        </Layout>
    )
}

export default Children
