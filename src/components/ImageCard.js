import './ImageCard.css'

const ImageCard = ({imageUrl, imageName, imgText}) => {

    return (

            <div className="imageContainer">
                <p id="imgText">{imgText}</p>
                <img src={imageUrl} alt={imageName} width={400} height={400} draggable="false" />
        </div>
    );
}

export default ImageCard