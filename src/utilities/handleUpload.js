export default async function handleUpload(setUserImg,setFormData) {

    //access uploaded image
    const inpFile = document.getElementById('image-picker')
    const inpImage = inpFile.files[0];

    //create FormData object to send via POST
    const formData = new FormData();
    formData.append('file', inpImage);
    // setUserImg(await fetch(inpImage))
    setFormData(formData)
}