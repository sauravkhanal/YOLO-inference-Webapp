import { apiEndpoint } from "../resources/config"

export default async function handleInfer (formData,userImg, setInferredImg) {
    //FIXME:
    //TODO: how does form data and state of image of use state hook work
        // const aformData = new FormData();


}

async function sendFetch(apiEndpoint, formData){

    console.log("send fetch")

    try{
        console.log("about to send fetch request")
        const response = await fetch(
            apiEndpoint,{
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
        }
        console.log("Checked if response was ok or no")
    }catch (error) {
        console.log('catch error')
        console.error('Error: ', error.message);
    }
}

