import React from "react";
import { team } from "./dummyData/dummyData.js";
import styles from "./styles/aboutUs.module.css";

const AboutUs = () => {
  return (
    <>
      <section className={styles.team_background}>
        <div className={styles.container}>
          <div className={styles.above} style={{ marginBottom: "2rem" }}>
            <h1>What they say about us</h1>
          </div>
          <div className={styles.grid4} style={{ marginBottom: "3rem" }}>
            {team.map((val, index) => (
              <div className={styles.box} key={index}>
                <div className={styles.details}>
                  <div className={styles.img}>
                    <img src={val.cover} alt="" />
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
  );
};

export default AboutUs;
