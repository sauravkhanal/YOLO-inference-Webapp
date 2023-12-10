function dropHandler(event, setUserImg) {
    event.preventDefault()
    // console.log(event.dataTransfer)

    const droppedFiles = event.dataTransfer.files // is an array of all files

    if (droppedFiles.length > 0) {
        const droppedFile = droppedFiles[0] //if more than one file is dropped take one only
        handleFile(droppedFile, setUserImg )
    }
}

const handleFile = (droppedFile, setUserImg) => {
    //have to use file handler to read image

    if (!droppedFile.type.startsWith("image/")) {
        alert("Only image files are supported !")
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const img = event.target.result;
        // after reader.readAsDataURL(droppedFile) has done it's work this function runs
        //do what you've got to do with that img
        setUserImg(img)
        // return img
    }

    reader.readAsDataURL(droppedFile)
}

function dragOverHandler(event) { //state when item is being dragged and hovered in an droppable container
    // change color of droppable container ig?

    event.preventDefault();

}

export {dragOverHandler, dropHandler}