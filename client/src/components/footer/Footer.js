import React from "react";
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
<footer class="footer">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
  <div class="container text-center text-md-left">
    <div class="row">
      <div class="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">
        <img className="logo" src="https://scontent-arn2-2.xx.fbcdn.net/v/t1.15752-9/103812566_2551989378386028_5073498312868669986_n.png?_nc_cat=105&_nc_sid=b96e70&_nc_ohc=0InltWcv73UAX-q20VX&_nc_ht=scontent-arn2-2.xx&oh=2e5f11e203283dd557992d0c2d66a004&oe=5F071479" alt=""></img>
      </div>
      <hr class="clearfix w-100 d-md-none"/>
      <div class="col-md-2 col-lg-2 mx-auto my-md-4 my-0 mt-4 mb-1">
        <h5 class="font-weight-bold text-uppercase mb-4">About</h5>
        <ul class="list-unstyled">     
        <li>
            <p>
              <i class="fas fa-info mr-3"></i><a href="/about">The Company</a>
            </p>
          </li>
          <li>
            <p>
              <i class="fas fa-comments mr-3"></i><a href="#!">Blog</a>
            </p>
          </li>
        </ul>

      </div>
      <hr class="clearfix w-100 d-md-none"/> 
      <div class="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
        <h5 class="font-weight-bold text-uppercase mb-4">Contact us</h5>
        <ul class="list-unstyled">
          <li>
            <p>
              <i class="fas fa-home mr-3"></i>Silistra, Bulgaria</p>
          </li>
          <li>
            <p>
              <i class="fas fa-envelope mr-3"></i>puhcho-toys@gmail.com</p>
          </li>
          <li>
            <p>
              <i class="fas fa-phone mr-3"></i>+ 359 898584656</p>
          </li>
          <li>
            <p>
              <i class="fas fa-print mr-3"></i>+ 359 899584633</p>
          </li>
        </ul>
      </div>
      <hr class="clearfix w-100 d-md-none"/>
      <div class="col-md-2 col-lg-2 text-center mx-auto my-4">
        <h5 class="font-weight-bold text-uppercase mb-4">Follow Us</h5>
        <NavLink to="" className="fab fa-facebook"></NavLink>
        <NavLink to="" className="fab fa-twitter"></NavLink>
        <NavLink to="" className="fab fa-instagram"></NavLink>
        <NavLink to="" className="fab fa-google"></NavLink>
      </div>
    </div>
  </div>
  <div class="footer-copyright text-center py-3">
    © 2020 Copyright: Puhcho Toys
  </div>
</footer>

);



export default Footer;