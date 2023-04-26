import React from "react"


import styles from "./styles/items.module.css";

import ItemsCard from "./home.itemsCard"



const Items = () => {
  return (
    <>
      <section className={styles.items_padding} >
        <div className= {styles.container} >
          <h1>Latest Product</h1> 
          <h2>The herbal choice is a healthy choice.</h2>
          <ItemsCard />
        </div>
      </section>
    </>
  )
}

export default Items