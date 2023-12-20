import './ImageCard.css'
import image1 from '../images/a.jpg'

const ImageCard = ({ imageUrl, imageName, imgText, height, width }) => {

    return (

        <div className="imageContainer" style={{ height: height , width: width }}>
            <p id="imgText">{imgText}</p>
            <img src={imageUrl || image1} alt={imageName} width={width || 400} height={height || 400} draggable="false" />
        </div>
    );
}

export default ImageCard