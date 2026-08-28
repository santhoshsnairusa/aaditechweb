import os
from rembg import remove
from PIL import Image

input_path = os.path.abspath("public/images/Logo_steel_no_bg_4.png")
backup_path = os.path.abspath("public/images/Logo_steel_no_bg_4_backup.png")

if not os.path.exists(input_path):
    print(f"Error: {input_path} not found.")
    exit(1)

# Backup the original
try:
    with open(input_path, 'rb') as f_in:
        with open(backup_path, 'wb') as f_out:
            f_out.write(f_in.read())
    print("Backup created.")
except Exception as e:
    print(f"Backup failed: {e}")

try:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(input_path, format="PNG")
    print(f"Successfully isolated logo and removed background for Logo_steel_no_bg_4.png!")
except Exception as e:
    print(f"Failed to remove background: {e}")
