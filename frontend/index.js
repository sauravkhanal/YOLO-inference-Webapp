// import {infer} from './infer.js'
// import {handlePrediction} from "./handle_prediction.js";
async function handleClick(event) {
    //prevent page reload, infer, show predictions
    //prevent page reload
    event.preventDefault();
    console.log("inside handle click")

    //access uploaded image
    const inpFile = document.getElementById('image-picker')
    const inpImage = inpFile.files[0];

    //create FormData object to send via POST
    const formData = new FormData();
    formData.append('file', inpImage);

    //now infer if user has uploaded image and clicked infer btn
    if (inpImage) {

        //show inferring... text
        const result = document.getElementById('loading');
        result.style.display = 'block';
        
        console.log('about to predict')
        
        //now infer here
        const prediction = await infer(formData);
        
        
        result.innerHTML = "inference complete"
        
        
        console.log('prediction received')
        handlePrediction(prediction);
    }
    else {
        alert("Please Choose a file first")
    }

}


//infer.js

async function infer(formData){

    console.log("inside infer")

    const url = "http://127.0.0.1:8000/inferyolo/"

    try{
        console.log("about to send fetch request")
        const response = await fetch(
            url,{
                method: 'POST',
                body: formData,
            }
        );
        console.log("Sent request")
        if (response.ok) {
            console.log("response ok")
            return await response.json(); // return prediction result
        }
        else {
            console.log("response not ok")
            console.error('Error: ', response.statusText);
        }
        console.log("Checked ir response was ok or no")
    }catch (error) {
        console.log('catch error')
        console.error('Error: ', error.message);
    }
}


//handle_prediction.js

function handlePrediction (prediction){
    //prediction .display on result.div
    console.log (prediction);
    
}