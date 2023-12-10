import { useState } from 'react';
import './App.css';

import ImageCard from './imageCard';
import Btn from './btn';

import image1 from './a.jpg'
import image2 from './b.jpg'

import Button from '@mui/material/Button'

// FIXME: refactor the function
function App() {


  const [userImg, setUserImg] = useState(image1);
  const [inferredImg, setInferredImg] = useState(image2)

  function dropHandler(event) {
    event.preventDefault()
    // console.log(event.dataTransfer)

    const droppedFiles = event.dataTransfer.files // is an array of all files

    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0] //if more than one file is dropped take one only
      handleFile(droppedFile)
    }

  }

  const handleFile = (droppedFile) => {
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
    }

    reader.readAsDataURL(droppedFile)
  }

  function dragOverHandler(event) { //state when item is being dragged and hovered in an droppable container
    // change color of droppable container ig?

    event.preventDefault();

  }
  return (
    <div onDrop={dropHandler} onDragOver={dragOverHandler}>

      <div className='imShow'>
        <ImageCard imageUrl={userImg} imageName='uploadedImage' ></ImageCard>
        <ImageCard imageUrl={inferredImg} imageName='inferredImage' buttonName={"Download"} ></ImageCard>
        <Btn buttonName={"Upload image"}></Btn>
        <Btn buttonName={"Download image"}></Btn>
      </div>


      <Button variant='contained'>Infer</Button>

    </div>
  )
  //TODO: implement buttons
}

export default App;
