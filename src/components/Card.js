import React from 'react'


import { Card, CardMedia} from '@mui/material'
import init from '../images/demo.png'


const ImgCard = ({ imageUrl, imageName, imgText, widths, heights }) => {
    return (
        <div>
            <Card sx={{ width: widths, height: heights, margin: 'auto auto', borderRadius: 5 }}>
                <CardMedia
                    component={'img'}
                    image={imageUrl || init}
                    alt={imgText}
                    title={imageName}
                    sx={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        objectFit: 'cover',
                        height: heights,
                        width: widths
                    }}
                />
            </Card>
        </div>
    )
}

export default ImgCard