import numpy as np
from fastapi import FastAPI, UploadFile
from pydantic import BaseModel
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
    return {"message": "You're here to infer"}


class FilePath(BaseModel):
    path: str


@app.post("/infer_from_filePath/")
async def infer_from_filepath(file_path: FilePath):
    # infer here
    return {"filepath": file_path.path}


@app.post("/infer/")
async def upload_file(file: UploadFile):
    return {
        "filename": file.filename,
        "size": file.size,
        "type": file.content_type,
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
