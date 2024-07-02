import React from 'react'
import Layout from '../components/Layout'
import classes from '../styles/Home.module.scss'
const Home = () => {
    return (
        <Layout>
            <section className={classes.container}>
                {/* <div className={classes.sections}>
                    <img src="images/home_kids.jpg" alt="kids" />
                    <img src="images/home_clothes.JPG" alt="Clothes" />
                </div> */}
                
                {/* <img src="images/kids/kids_1.jpg" alt="Clothes" className={classes.cover}/> */}
                <video src="videos/9.mp4" type="video/mp4" 
                className={classes.video} muted={true} autoPlay={true} playsInline={true} loop={true} preload='true'></video>
{/*             
                <div className={classes.sections}>
                    <img src="images/home_watches.jpg" alt="watches" />
                    <img src="images/home_women.jpg" alt="women" />
                </div> */}
            </section>
            
        </Layout>
    )
}

export default Home
