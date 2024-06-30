import json
import torch
from PIL import Image, ImageDraw
import os
import sys
import io
from contextlib import redirect_stdout

def main():
    try:
        stdout_capture = io.StringIO()
        with redirect_stdout(stdout_capture):
            model = torch.hub.load('ultralytics/yolov5', 'custom', path='./src/ml-models/best.pt', force_reload=True)
        model.conf = 0.4  
        image_path = sys.argv[1]
        output_path = sys.argv[2]

        labels, output_image_path = infer_image(model, image_path, output_path)

        stdout_contents = stdout_capture.getvalue().strip()

        if stdout_contents:
            print(stdout_contents, file=sys.stderr)

        print(json.dumps({"image_path": output_image_path, "labels": labels}))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

def infer_image(model, image_path, output_path):
    try:
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
    except Exception as e:
        print(f"Error processing image: {e}", file=sys.stderr)
        raise

if __name__ == "__main__":
    main()
