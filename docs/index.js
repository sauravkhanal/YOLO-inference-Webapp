// import {infer} from './infer.js'
// import {handlePrediction} from "./handle_prediction.js";

// let lastPredictionURL

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
        result.innerHTML = "inferring ..."
        
        console.log('about to predict')
        
        //now infer here
        const prediction_response = await infer(formData);
        
        document.getElementById('resultImage').style.display = 'block'
        result.innerHTML = "inference complete"
        
        
        console.log('prediction received')
        handlePrediction(prediction_response);
    }
    else {
        alert("Please Choose a file first")
    }

}


//infer.js

async function infer(formData){

    console.log("inside infer")

    const url = "https://yoloapi.khanalsaurav.com.np/inferyolo/"

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
    // console.log (prediction.json());
    
    console.log(prediction)
    console.log(prediction.data)
    
    
    const {imageURL, numberOfDetection, detections } = prediction.data;

    document.getElementById('resultImage').src = imageURL
    // Display predictions in the table
    const table = document.getElementById('predictionTable');

    // Clear existing rows, excluding the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Add new rows based on the predictions
    for (let i = 0; i < numberOfDetection; i++) {
        const { classNumber, name, confidence} = detections[i];
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2)
        cell1.textContent = classNumber;
        cell2.textContent = name;
        cell3.textContent = confidence;
    }

    // Show the table
    table.removeAttribute('hidden');

}

// async function clickDownload() {
//     const anchor = document.createElement("a")
//     anchor.href = lastPredictionURL;
//     anchor.setAttribute('download',"yolo-prediction.jpg")
// anchor.click()
// }

