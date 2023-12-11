import './App.css';
import { useState } from 'react';
import ImageCard from './components/ImageCard.js';

import {dragOverHandler, dropHandler } from './utilities/appUtilities.js'
import handleDownload from './utilities/handleDownload.js'
import handleInfer from './utilities/handleInfer.js';

import Button from '@mui/material/Button'

import image1 from './images/a.jpg'
import image2 from './images/b.jpg'



function App() {
  const [userImg, setUserImg] = useState(image1);
  const [inferredImg, setInferredImg] = useState(image2)
  const [rawImg, setRawImg] = useState();

  return (
    <div onDrop={(event)=>dropHandler(event,setUserImg)} onDragOver={dragOverHandler}>

      <div className='imShow'>
        <ImageCard imageUrl={userImg} imageName='uploadedImage' ></ImageCard>
        <ImageCard imageUrl={inferredImg} imageName='inferredImage' buttonName={"Download"} ></ImageCard>

        <input id='selectImage' type='file' accept='image/*' capture="environment" hidden onChange={(event)=>{setUserImg(URL.createObjectURL(event.target.files[0]));setRawImg(event.target.files[0])}}/>
        <Button className='btn' variant='contained'><label htmlFor="selectImage">Select Image</label></Button>

        <Button className='btn' variant='contained' onClick={()=>handleDownload(inferredImg)}>Download Image</Button>
      </div>

      <Button className='btn' variant='contained' color='secondary' size='large' onClick={()=>handleInfer(rawImg,setInferredImg)}>Infer</Button>
    </div>
  )
  //TODO: implement buttons (and infer)
}

export default App;
