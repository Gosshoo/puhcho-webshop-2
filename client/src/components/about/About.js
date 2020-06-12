import React from 'react';
import Carosel from './Carosel'

const About = () => (
  <div>
    <Carosel></Carosel>
    <div class="container mt-5">
        {/* <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/> */}
        <section class="mx-md-5 dark-grey-text">
    <div class="row">
    <div class="col-md-12">
        <div class="card card-cascade wider reverse" style={{borderRadius:"90px", backgroundColor:"antiquewhite"}}>
          {/* <div class="view view-cascade overlay">
            <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Slides/img%20(142).jpg" alt=""/>
            <a href="#!">
              <div class="mask rgba-white-slight"></div>
            </a>
          </div> */}
          {/* <div class="card-body card-body-cascade text-center"> */}
            <h1 class="font-weight-bold" style={{fontStyle:"italic", color:"red", textAlign:"center", paddingTop:"20px"}}>About the company "Puhcho Toys"</h1>
          {/* </div> */}
        

        <div class="mt-5" style={{paddingLeft:"20px", paddingRight:"20px", paddingBottom:"20px"}}>

          <p>Toy shop "Puhcho Toys" was opened in 2012. The store sells toys purchased by leading companie in this field. 
              The results achieved for these years guarantee us a stable place on the market. From the beginning, the main method 
              for attracting customers is personal constact and strict fulfillment of their wishes. The customers of the store know that 
              they can always rely on rapid and quality service and correct attitude. This makes us respected and desired, both for small 
              and large clients. The result of this is the stable the store occurs on the market at the moment.
          </p>
          <p>The staff considered of highly qualified workers and employees. The range of toys offered is very different and this allows
               us to offer toys at attractive prices and discounts to our regular clients. The clients are satisfied with the quality of the 
               toys offered, and this, in court, helps to attract new clients and to expand the activity.
          </p>
          <p>This does not exhaust our ambitions. Our basic principle is along with the known and approved toy models, to continue to offer new 
                ones. That is why we are constantly trying to enrich our range of toys. Our intention for the future is not only to keep, but also to expand 
                our presence on the market, as we continue to satisfy the wished of our customers.
          </p>
        </div>
        </div>
      </div>
    </div>
    <hr class="mb-5 mt-4"/>
  </section>
</div>
</div>
);

export default About;