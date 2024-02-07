import { apiEndpoint } from "../resources/config"

async function sendFetch(formData, setProgressVisible, modelName) {

    console.log("send fetch")

    try {
        console.log("about to send fetch request")
        const queryParams = new URLSearchParams({ model_name: modelName });
        const url = `${apiEndpoint}?${queryParams}`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // }
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
            setProgressVisible(false)
        }
        console.log("Checked if response was ok or no")
    } catch (error) {
        console.log('catch error')
        console.error('Error: ', error.message);
        setProgressVisible(false)
    }

}


export default async function handleInfer(rawImg, setInferredImg, setProgressVisible, modelName) {

    const formData = new FormData();
    // formData.append('model_name', modelName)
    formData.append('file', rawImg)
    const response = await sendFetch(formData, setProgressVisible, modelName);
    // console.log(response.data.imageURL)

    setInferredImg(response.data.imageURL)
    setProgressVisible(false)

}

