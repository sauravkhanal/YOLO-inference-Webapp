import React from 'react'
import './About.css'

const About = () => {

    return (
        <div id='mainDiv'>
        <div id='aboutContainer'>
            <h3 className='about'>About</h3>
            <p className='aboutText'>
                Welcome to our Heritage Detection website for Kathmandu Durbar Square! Explore the rich cultural tapestry of this historic site by simply uploading a photo or capturing one on your mobile device. Our cutting-edge YOLOv8 model swiftly analyzes the image, revealing detected heritage sites with detailed bounding boxes and confidence scores. Uncover the past effortlessly with our intuitive platform, connecting you to the captivating heritage of Kathmandu Durbar Square in a click.</p>
        </div>
        </div>
    )
}


export {About}