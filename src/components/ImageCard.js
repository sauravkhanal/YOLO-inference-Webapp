import './ImageCard.css'

const ImageCard = ({imageUrl, imageName}) => {

    return (
        <div className="imageCard">
            <div className="imageContainer">
                <img src={imageUrl} alt={imageName} width={400} height={400}/>
                {/* <img src={imageUrl} alt={imageName} draggable="false"/> */}
            </div>
            
        </div>
    );
}

export default ImageCard