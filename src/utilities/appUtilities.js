async function resize(imgBlob) {
    // console.log('inside resize')
    //resize largest dimension to 640, preserve aspect ratio
    const targetDimension = 640;

    return new Promise((resolve, reject) => {
        //resolve function when successful
        //reject function when fail
        //the promise must be given a function that has two functions inside
        //one to handle success other to handle failure
        const img = new Image();
        img.src = URL.createObjectURL(imgBlob);
        img.onload = () => {
            var canvas = document.createElement("canvas");
            const imgWidth = img.width;
            const imgHeight = img.height;
            var ctx = canvas.getContext("2d");

            if (imgWidth > 800 || imgHeight > 800) {
                canvas.height = targetDimension;
                canvas.width = targetDimension;

                if (imgHeight > imgWidth) {
                    const newWidth = imgWidth / (imgHeight / targetDimension);
                    canvas.width = newWidth;

                    ctx.drawImage(img, 0, 0, newWidth, 640);
                } else if (imgWidth > imgHeight) {
                    //change to new height, 640
                    const newHeight = imgHeight / (imgWidth / 640);
                    canvas.height = newHeight;
                    ctx.drawImage(img, 0, 0, 640, newHeight);
                } else {
                    //the image is square , resize to 640 640
                    ctx.drawImage(img, 0, 0, 640, 640);
                }
                //alc to docs all browser support image/png , but mayn't image/jpg
                //return url converting the canvas to png
                canvas.toBlob((arg)=>resolve(arg));
            }
            else {
                canvas.height = imgHeight;
                canvas.width = imgWidth;
                ctx.drawImage(img, 0 , 0)
                canvas.toBlob((blob)=>resolve(blob));
            }
        };

        img.onerror = function (error) {
            console.error("Error loading image: ", error);
            reject(error)
        }
    }
    );
}

async function uploadHandler(event, setUserImg, setRawImg) {

    event.preventDefault();

    // Check if files were selected
    if (event.type === 'change' && event.target.files.length === 0) {
        // alert("No file selected!");
        return;
    } 
    // else if (event.type === 'drop' && event.dataTransfer.files.length === 1) {
    //     // alert("No file dropped!");
    //     return;
    // }

    const droppedFile = event.type === 'change' ? event.target.files[0] : event.dataTransfer.files[0];

    if (!droppedFile.type.startsWith("image/")) {
        alert("Only image files are supported !");
        return;
    }
    const newLink = await resize(droppedFile);
    setRawImg(newLink)
    setUserImg(URL.createObjectURL(newLink));


}


function dragOverHandler(event) {
    //state when item is being dragged and hovered in an droppable container
    // change color of droppable container ig?

    event.preventDefault();
}

export { dragOverHandler, uploadHandler };
