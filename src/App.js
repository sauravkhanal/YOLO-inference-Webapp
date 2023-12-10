import './App.css';
import { useState } from 'react';
import ImageCard from './imageCard';

import {dragOverHandler, dropHandler } from './utilities/appUtilities.js'
import handleDownload from './utilities/handleDownload.js'

import Button from '@mui/material/Button'

import image1 from './images/a.jpg'
import image2 from './images/b.jpg'


function App() {
  const [userImg, setUserImg] = useState(image1);
  const [inferredImg, setInferredImg] = useState(image2)

  return (
    <div onDrop={(event)=>dropHandler(event,setUserImg)} onDragOver={dragOverHandler}>

      <div className='imShow'>
        <ImageCard imageUrl={userImg} imageName='uploadedImage' ></ImageCard>
        <ImageCard imageUrl={inferredImg} imageName='inferredImage' buttonName={"Download"} ></ImageCard>
        <Button className='btn' variant='contained'> <>Select Image</></Button>
        <Button className='btn' variant='contained' onClick={()=>handleDownload(inferredImg)}>Download Image</Button>
        {/* <Btn buttonName={"Upload image"}></Btn>
        <Btn buttonName={"Download image"} on></Btn> */}
      </div>

      <Button className='btn' variant='contained'>Infer</Button>
    </div>
  )
  //TODO: implement buttons (upload and infer)
}

export default App;
