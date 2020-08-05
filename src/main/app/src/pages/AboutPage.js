import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Line from '../constants/Line';

/* Component for About page */
const AboutPage = () => {
  return (
    <section className= "section">
      <div className="container">

        <Jumbotron fluid style={{background:'linear-gradient(to bottom, #2C3E50 0%, #000000 100%)', color:'white'}}>
          <Container>
            <h1>About us</h1>
            <p> Who we are, what our mission is, and what we have created for you! </p>
          </Container>
        </Jumbotron>

        <div className="row featurette"> 
          <div className="col-md-7">
            <h2 className="featurette-heading">Who are we? </h2>
            <p className="lead"> This webapp is developed by Steve Mbouadeus, Bhargavi Kumar Sundaresan, and Trinity Donohugh. We are Summer 
            2020 STEP interns, and we found it necessary to help people manage their work-life balance. Steve, Bhargavi, and Trinity are currently
            pursuing their Bachelor's degree in Computer Science at St. John's University, University of California, Santa cruz, and Stanford 
            University respectively.
            </p>
          </div>

          <div className="col-md-5">
            <img className="block-example border border-primary featurette-image img-responsive center-block" src="https://lh3.googleusercontent.com/vJd-vMl6id5P5-UKpycd5Hc1e2Xkb0YLOpULW1XWvYytz9hgbY1OFfaPhLVhU6sWkC59lvQoXtvu9Tb509mGer_ywqK8kr_-6kbauCo=w650" alt="Intern"></img>
          </div>
        </div>
        
        <Line color="black" />

        <div className="row featurette"> 
          <div className="col-md-5">
            <img className="block-example border border-warning featurette-image img-responsive center-block" src="https://i.pinimg.com/originals/de/01/e7/de01e79dd4c5a4a07ba9ede68dc62486.gif" alt="mental health"></img>
          </div>

          <div className="col-md-7">
            <h2 className="featurette-heading">Background and Objective </h2>
            <p className="lead">Over the course of the Covid-19 pandemic, more people have been encouraged to stay home. On top of that, we have also seen a rise in stress, and a fall in mental awareness among people around the world. Our overarching mission is to organise information on mental health and wellness, and encourage a focus on well-being by making time for stress-relieving activities. This is very useful to Googlers all around the world, since there are weekly game times where colleagues collaborate and play games together. </p>
          </div>

        </div>
      
        <Line color="black" />
      
        <div className="row featurette"> 
          <div className="col-md-7">
            <h2 className="featurette-heading">How do we do it?</h2>
            <p className="lead">We discovered that people are struggling to find time to focus on mental health. Many are not able to maintain a healthy work-life balance. We make it easier to select the activity and create calendar events. This is especially much more convenient when a lot of people are collaborating. Our webapp will make sure everything goes as planned.  </p>
          </div>

          <div className="col-md-5">
            <img className="block-example border border-success featurette-image img-responsive center-block" src="https://cdn.vox-cdn.com/thumbor/01PXfCQWCsQxBmJUaRZOTovWYDY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19917601/Google_Meet_1.max_2000x2000.jpg" alt="Google meet"></img>
          </div>
        </div> 
      </div>
    </section>
  );
}

export default AboutPage;
