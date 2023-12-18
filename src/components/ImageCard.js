import './ImageCard.css'

const ImageCard = ({imageUrl, imageName, imgText, height, width}) => {

    return (

            <div className="imageContainer">
                <p id="imgText">{imgText}</p>
                <img src={imageUrl} alt={imageName} width={width || 400} height={height || 400} draggable="false" />
        </div>
    );
}

export default ImageCard