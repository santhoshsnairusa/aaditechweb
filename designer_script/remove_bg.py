import os
import sys

dir_path = r"c:\WorkSpace\Nexaware\AADITWEB\public\data\image"

try:
    from rembg import remove
    from PIL import Image
    
    print("Using rembg...")
    for file in os.listdir(dir_path):
        if file.endswith(".png"):
            img_path = os.path.join(dir_path, file)
            img = Image.open(img_path)
            output = remove(img)
            output.save(img_path, "PNG")
            print(f"Processed {file}")
except ImportError:
    print("rembg not installed or failed. Using simple thresholding...")
    try:
        from PIL import Image
    except ImportError:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image
        
    for file in os.listdir(dir_path):
        if file.endswith(".png"):
            img_path = os.path.join(dir_path, file)
            img = Image.open(img_path)
            img = img.convert("RGBA")
            datas = img.getdata()
            newData = []
            for item in datas:
                # Remove white (or near white)
                if item[0] > 240 and item[1] > 240 and item[2] > 240:
                    newData.append((255, 255, 255, 0))
                # Remove black (or near black)
                elif item[0] < 15 and item[1] < 15 and item[2] < 15:
                    newData.append((0, 0, 0, 0))
                else:
                    newData.append(item)
            img.putdata(newData)
            img.save(img_path, "PNG")
            print(f"Processed {file} (threshold)")
print("Done.")
