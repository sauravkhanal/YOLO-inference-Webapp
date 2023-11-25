import numpy as np
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from infer_yolo import infer
import cv2

app = FastAPI()

origins = [
    "http://localhost:63342/",
    "http://localhost",
    "http://localhost:63342/web"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {
        "statusCode": 200,
        "message": "Kathmandu Durbar square heritage detection YOLO v8 API"
    }


@app.post("/inferyolo/")
async def infer_yolo(file: UploadFile):
    image = await preprocess_image(file)
    # image_array = infer(image)
    # return result.model_dump()
    return infer(image)


async def preprocess_image(file: UploadFile):
    # read the content of image
    contents = await file.read()

    # convert the content to numpy array

    np_array = np.frombuffer(contents, np.uint8)

    # Decode the array into an OpenCV image
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    if image.shape != (640, 640, ):
        image = cv2.resize(image, (640, 640))

    return image
bra