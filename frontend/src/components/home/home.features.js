import React from "react"
// import Heading from "../../common/Heading"
// Module CSS

import styles from "./styles/feature.module.css";
import FeatureCard from "./home.featuresCard"

const Feature = () => {
  return (
    <>
      <section className= {styles.featured_background} >
        
        <div className='container'>
          <FeatureCard />
        </div>
      </section>
    </>
  )
}

export default Feature