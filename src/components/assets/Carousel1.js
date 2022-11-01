import React from 'react';
import { Carousel } from 'react-bootstrap';
import Image1 from "../assets/Image1.jpg"
import Image2 from "../assets/Image2.png"
import Image3 from "../assets/Image3.png"

function Carousel1() {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height={350}
                        src={Image2}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height={350}
                        src={Image1}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height={350}
                        src={Image3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Carousel1;