import './HeroSection.css';
import { useState } from 'react';
import ImageCard from './components/ImageCard.js';

import {dragOverHandler, dropHandler } from './utilities/appUtilities.js'
import handleDownload from './utilities/handleDownload.js'
import handleInfer from './utilities/handleInfer.js';

import Button from '@mui/material/Button'

import image1 from './images/a.jpg'
import image2 from './images/b.jpg'



function HeroSection() {
  const [userImg, setUserImg] = useState(image1);
  const [inferredImg, setInferredImg] = useState(image2)
  const [rawImg, setRawImg] = useState();

  return (
    <div onDrop={(event)=>dropHandler(event,setUserImg,setRawImg)} onDragOver={dragOverHandler}>

      <div className='imShow'>
        <ImageCard imageUrl={userImg} imageName='uploadedImage' imgText='original'></ImageCard>
        <ImageCard imageUrl={inferredImg} imageName='inferredImage' buttonName={"Download"} imgText='inferred'></ImageCard>

        <input id='selectImage' type='file' accept='image/*'  hidden onChange={(event)=>{setUserImg(URL.createObjectURL(event.target.files[0]));setRawImg(event.target.files[0])}}/>
        <Button className='btn' variant='contained'><label htmlFor="selectImage">Select Image</label></Button>

        <Button className='btn' variant='contained' onClick={()=>handleDownload(inferredImg)}>Download Image</Button>
      <Button className='btn' id='inferBtn' variant='contained' color='secondary' size='large' onClick={()=>handleInfer(rawImg,setInferredImg)}>Infer</Button>
      </div>

    </div>
  )

}

export default HeroSection;
