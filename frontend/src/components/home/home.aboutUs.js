import React from "react"
import { team } from "./dummyData/dummyData.js"
import styles from "./styles/aboutUs.module.css";

const AboutUs = () => {
  return (
    <>
      <section className={styles.team_background}>
        <div className={styles.container}>
            <di className={styles.above}>
         <h1>What they say about us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, .</p>
            </di>
          <div className={styles.grid4}>
            {team.map((val, index) => (
              <div className={styles.box} key={index}>
             
                <div className={styles.details}>
                  <div className={styles.img}>
                    <img src={val.cover} alt='' />
                   
                  </div>
                <di className={styles.container1}>
                  <h4>{val.name}</h4>
                  <p>{val.discription}</p>
                  </di>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs