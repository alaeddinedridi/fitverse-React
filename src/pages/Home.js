import React from 'react'
import Layout from '../components/Layout'
import classes from '../styles/Home.module.scss'
const Home = () => {
    return (
        <Layout>
            <section className={classes.container}>
                <video src="videos/5.mp4" type="video/mp4" 
                className={classes.video} muted={true} autoPlay={true} playsInline={true} loop={true} preload='true'></video>
            </section>
            
        </Layout>
    )
}

export default Home
