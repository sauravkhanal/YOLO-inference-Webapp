import numpy as np
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse, JSONResponse
from infer_yolo import infer, output_save_path
import cv2
import os
import shutil
import random
import string

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
    return jsonable_encoder({
        "statusCode": 200,
        "message": "Kathmandu Durbar square heritage detection YOLO v8 API"
    })


@app.post("/inferyolo/")
async def infer_yolo(model_name: str, file: UploadFile):
    image = await preprocess_image(file)
    # image_array = infer(image)
    # return result.model_dump()
    return infer(model_name, image)


async def preprocess_image(file: UploadFile):
    # read the content of image
    contents = await file.read()

    # convert the content to numpy array

    np_array = np.frombuffer(contents, np.uint8)

    # Decode the array into an OpenCV image
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    # if image.shape != (640, 640, ):
    #     image = cv2.resize(image, (640, 640))

    # (height, width,) = image.shape
    height = img.shape[0]
    width = img.shape[1]

    # resizes max of height or width to 640 and scales min one preserving aspect ratio.
    if height > 800 or width > 800:
        if height >= width:
            new_width = int(width / (height / 640))
            image = cv2.resize(img, (new_width, 640))
            print(image.shape)
        elif height <= width:
            new_height = int(height / (width / 640))
            image = cv2.resize(img, (640, new_height))
            print(image.shape)
        else:
            image = cv2.resize(img, (640, 640))

        print(f"original : {(height, width)} changed : {image.shape}")
        return image

    else:
        return img


@app.get("/getimage/{image_name}")
async def get_image(image_name: str):
    image_path = output_save_path + "/" + image_name + ".jpg"

    if os.path.exists(image_path):
        return FileResponse(image_path, media_type="image/jpeg")
    else:
        return jsonable_encoder({"statusCode": 404, "message": "File not found"})


@app.get("/getmodels")
async def get_models():
    model_dir = "./model/"
    models = os.listdir(model_dir)
    return jsonable_encoder({
        "statusCode": 200,
        "message": models
    })


MODEL_UPLOAD_DIR = "./model"


def generate_unique_filename(filename):
    """Generate a unique filename to avoid overwriting existing files."""
    name, ext = os.path.splitext(filename)
    unique_id = ''.join(random.choices(string.ascii_letters + string.digits, k=3))
    unique_name = f"{name}_{unique_id}{ext}"
    return unique_name


@app.post("/uploadModel")
async def add_model(model: UploadFile):
    try:
        # Check if the uploaded file has a .pt extension
        if not model.filename.endswith(".pt"):
            raise HTTPException(status_code=400, detail="Only .pt files are allowed.")

        unique_filename = generate_unique_filename(model.filename)
        file_path = os.path.join(MODEL_UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(model.file, buffer)
        return {"filename": unique_filename, "saved_at": file_path}
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
