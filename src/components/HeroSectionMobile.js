import { useState } from 'react';
// import ImageCard from './ImageCard.js';

import { uploadHandler } from '../utilities/appUtilities.js';

import handleDownload from '../utilities/handleDownload.js'
import handleInfer from '../utilities/handleInfer.js';

import { Snackbar, Alert, Button, CircularProgress } from '@mui/material'

import calc from '../images/calc.png'

import ImgCard from './Card.js';


function HeroSectionMobile() {
    const width = 300
    const [userImg, setUserImg] = useState(null);
    const [inferredImg, setInferredImg] = useState(calc)
    const [rawImg, setRawImg] = useState();
    const [progressVisible, setProgressVisible] = useState(false)
    const [showInferred, setShowInferred] = useState(false)

    const [isAlertOpen, setAlert] = useState(false)
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setAlert(false)
    }

    const Buttons = () => {
        return (
            <>
                <div style={{ display: 'flex' }}>

                    <Button
                        className='btn'
                        id='selectImg'
                        variant='contained'>
                        <label htmlFor="selectImage">Select Image</label>
                    </Button>

                    <div>&nbsp;&nbsp;</div>

                    <Button className='btn' variant='contained' onClick={() => handleDownload(inferredImg)}>Download</Button>

                </div>

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
                        handleInfer(rawImg, setInferredImg, setProgressVisible);
                        setShowInferred(true)
                    }
                    }
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
            </>
        )
    }

    return (
        <div className='imShow' >

            {showInferred ? (
                <>
                    <ImgCard
                        imageUrl={inferredImg}
                        imageName='inferredImage'
                        buttonName={"Download"}
                        imgText='inferred'
                        placeholder='Click infer to see result here'
                        widths={width}
                        heights={width}
                    >
                    </ImgCard>
                    <div>&nbsp;&nbsp;</div>
                    <Buttons />
                </>

            ) : (
                <>
                    <ImgCard
                        imageUrl={userImg}
                        imageName='uploadedImage'
                        imgText='original'
                        placeholder='Drop your image here'
                        widths={width}
                        heights={width}
                        onClick={() => { const el = document.getElementById('selectImage'); el.click() }}
                    >
                    </ImgCard>
                    <div>&nbsp;&nbsp;</div>
                    <Buttons />
                </>
            )}


            <input
                id='selectImage'
                type='file'
                accept='image/*'
                hidden onChange={(event) => { uploadHandler(event, setUserImg, setRawImg); }
                }
            />



        </div>
    )

}

export default HeroSectionMobile;
