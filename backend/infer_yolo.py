from ultralytics import YOLO
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

# path declarations
model_path = "./model/best.pt"
yolo_model = YOLO(model_path, task='detect')


class Box(BaseModel):
    x: float
    y: float
    width: float
    height: float


class Detection(BaseModel):
    classNumber: int
    name: str
    confidence: float
    box: Box


# custom datatype for returning result of detection
class DetectionResult(BaseModel):
    imageUrl: str
    numberOfDetection: int
    detections: list[Detection]


class ReturnDict(BaseModel):
    statusCode: int
    message: str
    data: DetectionResult


def infer(image):
    results = yolo_model.predict(source=image)
    return convert_to_json(results)


def convert_to_json(results):
    result = results[0]
    names = result.names

    # num of box detected ie numberOfDetections
    n = len(result.boxes)

    # all detection of one image
    detection_result = DetectionResult(
        imageUrl=generate_image_url(result),
        numberOfDetection=n,
        detections=[]
    )

    # now iterate through every box to add result(class and coordinates) of detection (of one image)
    for i in range(n):
        data = result.boxes[i]

        box_value = [round(float(x), 2) for x in list(result.boxes[i].xywh[0])]

        detection_instance = Detection(
            classNumber=int(data.cls),
            name=names[int(data.cls)],
            confidence=round(float(data.conf) * 100, 2),
            box=Box(
                x=box_value[0],
                y=box_value[1],
                width=box_value[2],
                height=box_value[3],
            )
        )

        detection_result.detections.append(detection_instance)

    return jsonable_encoder(
        ReturnDict(
            statusCode=200,
            message="Inference Successful",
            data=detection_result
        )
    )


def generate_image_url(result) -> str:
    # plot image
    # deploy on server
    # retrieve url
    return "temp url"
