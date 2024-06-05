import json
import torch
from PIL import Image, ImageDraw
import os
import sys

def main():
    model = torch.hub.load('ultralytics/yolov5', 'custom', path='./src/ml-models/best.pt', force_reload=True)
    model.conf = 0.4  
    image_path = sys.argv[1]
    output_path = sys.argv[2]

    labels, output_image_path = infer_image(model, image_path, output_path)

    print(json.dumps({"image_path": output_image_path, "labels": labels}))

def infer_image(model, image_path, output_path):
    img = Image.open(image_path).convert("RGB")

    results = model(img)
    results_data = results.pandas().xyxy[0]
    labels = results_data['name'].tolist()  

    draw = ImageDraw.Draw(img)
    for index, row in results_data.iterrows():
        draw.rectangle([(row['xmin'], row['ymin']), (row['xmax'], row['ymax'])], outline="red", width=10)
        draw.text((row['xmin'], row['ymin']), f"{row['name']} {row['confidence']:.2f}", fill="red")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path)

    return labels, output_path

if __name__ == "__main__":
    main()
