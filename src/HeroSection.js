import './HeroSection.css';
import { useState } from 'react';
import ImageCard from './components/ImageCard.js';

import { dragOverHandler, uploadHandler } from './utilities/appUtilities.js'
import handleDownload from './utilities/handleDownload.js'
import handleInfer from './utilities/handleInfer.js';

import { Button, CircularProgress, Snackbar, Alert } from '@mui/material'
import ImageCanvas from './components/ImageCanvas.js';

import image2 from './images/b.jpg'



function HeroSection() {
  const [userImg, setUserImg] = useState(false);
  const [inferredImg, setInferredImg] = useState(image2)
  const [rawImg, setRawImg] = useState();
  const [progressVisible, setProgressVisible] = useState(false)

  const [isAlertOpen, setAlert] = useState(false)
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert(false)
  }

  return (
    <div className='imShow' onDrop={(event) => { uploadHandler(event, setUserImg, setRawImg) }} onDragOver={dragOverHandler}>

      {/* <ImageCard
        imageUrl={userImg}
        imageName='uploadedImage'
        imgText='original'
        placeholder='Drop your image here'
      >
      </ImageCard> */}

      <ImageCanvas
        canvasWidth={400}
        canvasHeight={400}
        imgURL={userImg}
        imgText={'original'}
      />

      <div id='infImg'>
        {/* <ImageCard
          imageUrl={inferredImg}
          imageName='inferredImage'
          buttonName={"Download"}
          imgText='inferred'
          placeholder='Click infer to see result here'
        >
        </ImageCard> */}
        <ImageCanvas
        canvasWidth={400}
        canvasHeight={400}
        imgURL={inferredImg}
        imgText={'inferred'}
      />
      </div>

      <input
        id='selectImage'
        type='file'
        accept='image/*'
        hidden onChange={(event) => { uploadHandler(event, setUserImg, setRawImg); console.log('inside onchange') }
        }
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
        onClick={() => {
          if (!Boolean(userImg)) {
            setAlert(true)
            return
          }
          setProgressVisible(true);
          handleInfer(rawImg, setInferredImg, setProgressVisible)
        }}
      >
        Infer {progressVisible && <span>&nbsp;&nbsp;</span>}{progressVisible && <CircularProgress size={'1rem'} color='inherit' />}
      </Button>

      <Snackbar
        open={isAlertOpen}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity='warning'>
          Please Select an image first!
        </Alert>
      </Snackbar>
    </div>
  )

}

export default HeroSection;
