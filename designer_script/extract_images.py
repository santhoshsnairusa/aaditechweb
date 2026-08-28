import fitz # PyMuPDF
import os

pdf_path = r"C:\Users\santh\OneDrive\Desktop\WORK\AADIT\Aadit Project Overview.pdf"
output_dir = r"c:\WorkSpace\Nexaware\AADITWEB\public\data\image"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

try:
    doc = fitz.open(pdf_path)
    image_count = 0

    for i in range(len(doc)):
        for img in doc.get_page_images(i):
            xref = img[0]
            pix = fitz.Pixmap(doc, xref)
            
            if pix.n - pix.alpha < 4:       
                pix.save(os.path.join(output_dir, f"product_{image_count}.png"))
            else:               
                pix1 = fitz.Pixmap(fitz.csRGB, pix)
                pix1.save(os.path.join(output_dir, f"product_{image_count}.png"))
                pix1 = None
            pix = None
            image_count += 1

    print(f"Extracted {image_count} images.")
except Exception as e:
    print(f"Error: {e}")
