from ultralytics import YOLO
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

# path declarations
model_path = "./model/best.pt"
yolo_model = YOLO(model_path, task='detect')


# custom datatype for returning result of detection
class DetectionsResult(BaseModel):
    num_detections: int = 0
    detections: list[dict] = []


def infer(image):
    results = yolo_model.predict(source=image)
    return convert_to_dict(results)


def convert_to_dict(results) -> str:
    result_dict = DetectionsResult()
    for result in results:  # iterate through every detection but for now only one so redundant
        result_dict.num_detections = len(result.boxes)  # no of detected box
        # num_detect = len(result.boxes)
        for i in range(result_dict.num_detections):  # iterate through every box
            result_dict.detections.append({
                'cls': int(result.boxes[i].cls),
                'conf': round(float(result.boxes[i].conf)*100, 2),
                'box': [float(x) for x in list(result.boxes[i].xywh[0])]
            })
    return jsonable_encoder(result_dict)
