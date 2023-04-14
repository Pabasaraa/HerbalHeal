import React from "react";
// import Logo from "../../Assets/Logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import './Style/Footer.css';

const Footer = () => {
  return (
    <footer class="footer">
  	 <div class="container">
  	 	<div class="row">
  	 		<div class="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a href="#">about us</a></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 				<li><a href="#">affiliate program</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				<li><a href="#">order status</a></li>
  	 				<li><a href="#">payment options</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>brabds</h4>
  	 			<ul>
  	 				<li><a href="#">codeage</a></li>
  	 				<li><a href="#">eucerin</a></li>
  	 				<li><a href="#">natrol</a></li>
  	 				<li><a href="#">kal</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>follow us</h4>
  	 			<div class="social-links">
  	 				<a href="#"><i ><BsTwitter /></i></a>
  	 				<a href="#"><i ></i>   <SiLinkedin /></a>
  	 				<a href="#"><i><BsYoutube /></i></a>
  	 				<a href="#"><i > <FaFacebookF /></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
  );
};

export default Footer;