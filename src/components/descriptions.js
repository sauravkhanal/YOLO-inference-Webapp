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
                        <p>Begin by dragging and dropping your image onto the site or click the "Select Image" button to choose a file from your device.</p>
                    </li>
                    <li>
                        <strong>Initiate Inference:</strong>
                        <p>Once your image is selected, hit the "Infer" button. Your image is then sent to our server for swift analysis.</p>
                    </li>
                    <li>
                        <strong>Watch the Magic Unfold:</strong>
                        <p>Sit back as our YOLOv8 model processes your image, revealing heritage sites with detailed bounding boxes and confidence scores. The results will be displayed in the window.</p>
                    </li>
                    <li>
                        <strong>Download the Story:</strong>
                        <p>Want to keep a record of your discoveries? Click the "Download Image" button to save the inferred image, complete with bounding boxes and confidence scores.</p>
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
                        <strong>Image-Based Heritage Detection:</strong>
                        <p>Our application accepts images in any format and size, providing you with flexibility in choosing the source material. Whether it's a high-resolution photograph or a quick snapshot, our system is designed to handle it seamlessly.</p>
                    </li>
                    <li>
                        <strong>Real-time Inference:</strong>
                        <p>Experience the thrill of real-time inference as our YOLOv8 model processes your images on the fly. Watch as the application swiftly identifies heritage sites, delivering results in a matter of seconds.</p>
                    </li>
                    <li>
                        <strong>Bounding Boxes and Confidence Scores:</strong>
                        <p>Visualize the precision of our heritage detection with bounding boxes outlining each identified site. Confidence scores accompany the results, providing insights into the reliability of the model's predictions.</p>
                    </li>
                    <li>
                        <strong>Downloadable Results:</strong>
                        <p>Capture your heritage discoveries by downloading the results. Inferred images, complete with bounding boxes and confidence scores, can be saved for further exploration or shared with others.</p>
                    </li>
                </ol>

            </div>
        </div>
    )
}


export { About, HowTo, Features }
