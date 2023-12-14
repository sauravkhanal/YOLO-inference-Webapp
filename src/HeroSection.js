import './HeroSection.css';
import { useState } from 'react';
import ImageCard from './components/ImageCard.js';

import { dragOverHandler, dropHandler } from './utilities/appUtilities.js'
import handleDownload from './utilities/handleDownload.js'
import handleInfer from './utilities/handleInfer.js';

import { Button, CircularProgress } from '@mui/material'

import image1 from './images/a.jpg'
import image2 from './images/b.jpg'



function HeroSection() {
  const [userImg, setUserImg] = useState(image1);
  const [inferredImg, setInferredImg] = useState(image2)
  const [rawImg, setRawImg] = useState();
  const [progressVisible, setProgressVisible] = useState(false)

  return (
    <div className='imShow' onDrop={(event) => dropHandler(event, setUserImg, setRawImg)} onDragOver={dragOverHandler}>

      <ImageCard
        imageUrl={userImg}
        imageName='uploadedImage'
        imgText='original'
        placeholder='Drop your image here'
        >
      </ImageCard>

      <div id='infImg'>
        <ImageCard
          imageUrl={inferredImg}
          imageName='inferredImage'
          buttonName={"Download"}
          imgText='inferred'
          placeholder= 'Click infer to see result here'
          >
        </ImageCard>
      </div>

      <input
        id='selectImage'
        type='file'
        accept='image/*'
        hidden onChange={(event) => { setUserImg(URL.createObjectURL(event.target.files[0])); setRawImg(event.target.files[0]) }}
      />

      <Button
        className='btn'
        id='selectImg'
        variant='contained'>
        <label htmlFor="selectImage">Select Image</label>
      </Button>

      <Button className='btn' variant='contained' onClick={() => handleDownload(inferredImg)}>Download Image</Button>

      <Button
        className='btn'
        id='inferBtn'
        variant='contained'
        color='secondary'
        onClick={() => {setProgressVisible(true);handleInfer(rawImg, setInferredImg, setProgressVisible)}}
      >
        Infer {progressVisible && <span>&nbsp;&nbsp;</span>}{progressVisible && <CircularProgress size={'1rem'} color='inherit'/>}
      </Button>


    </div>
  )

}

export default HeroSection;
