import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap'
import photo1 from '../photo1.jpg'
import photo2 from '../photo2.jpg'
import photo3 from '../photo3.jpg'

class HomePageBody extends Component {
    state = {  }
    render() { 
        return (
            <div style={{display:'flex',justifyContent:'center', alignItem:'center'}}>
            <Carousel style={{height:'80%', width:'80%'}}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo1}
                    alt="First slide"
                    style={{height:'500px', width:'500px'}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo2}
                    alt="Second slide"
                    style={{height:'500px', width:'500px'}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={photo3}
                    alt="Third slide"
                    style={{height:'500px', width:'500px'}}
                    />
                </Carousel.Item>
            </Carousel>
            </div>
         );
    }
}
 
export default HomePageBody;