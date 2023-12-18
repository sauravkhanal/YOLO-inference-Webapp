import React from 'react'
import './descriptions.css'

const About = () => {

    return (
        <div id='About'>
            <div class='container'>
                <h2 className='head'>About</h2>
                <p className='text'>
                    Welcome to our Heritage Detection website for <strong>Kathmandu Durbar Square!</strong> Explore the rich cultural tapestry of this historic site by simply uploading a photo or capturing one on your mobile device. Our cutting-edge YOLOv8 model swiftly analyzes the image, revealing detected heritage sites with detailed bounding boxes and confidence scores. Uncover the past effortlessly with our intuitive platform, connecting you to the captivating heritage of Kathmandu Durbar Square in a click.</p>
            </div>
        </div>
    )
}

const HowTo = () => {
    return (
        <div id="HowTo">
            <div class="container">
                <h2 className='head'>How to use?</h2>
                <ol className='text'>
                    <li>
                        <strong>Upload Your Image:</strong>
                        <p>Drag and drop your image or click "Select Image" to choose a file from your device.</p>
                    </li>
                    <li>
                        <strong>Initiate Inference:</strong>
                        <p>Hit the "Infer" button after selecting your image. It will be sent to our server for swift analysis.</p>
                    </li>
                    <li>
                        <strong>Download the Story:</strong>
                        <p>Click "Download Image" to save the inferred image, complete with bounding boxes and confidence scores, if you want to keep a record of your discoveries.</p>
                    </li>
                </ol>

            </div>
        </div>
    )
}

const Features = () => {
    return (
        <div id="Features">
            <div class="container">
                <h2 className='head'>Features</h2>
                <ol className='text'>
                    <li>
                        <strong>Image Flexibility:</strong>
                        <p>Submit images of any format or size for heritage detection, ensuring seamless handling.</p>
                    </li>
                    <li>
                        <strong>Real-time Inference:</strong>
                        <p>Experience instant heritage site identification with our YOLOv8 model for swift results.</p>
                    </li>
                    <li>
                        <strong>Precision Visualization:</strong>
                        <p>View identified heritage sites with precision through bounding boxes and confidence scores.</p>
                    </li>
                    <li>
                        <strong>Downloadable Discoveries:</strong>
                        <p>Save your inferred discoveries by downloading them.</p>
                    </li>
                </ol>

            </div>
        </div>
    )
}


export { About, HowTo, Features }
