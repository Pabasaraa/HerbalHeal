import React from "react";
import Slide from "./home.slide";
import Feature from "./home.features";
import Items from "./home.items";
import Qulity from "./home.qulity";
import AboutUs from "./home.aboutUs";
import Footer from "./home.footer";

const Home = () => {
  return (
    <>
      <Slide />
      <Feature />
      {/* <Items /> */}
      <Qulity />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
