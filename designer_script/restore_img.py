import fitz # PyMuPDF
import os

pdf_path = r"C:\Users\santh\OneDrive\Desktop\WORK\AADIT\Aadit Project Overview.pdf"
output_dir = r"c:\WorkSpace\Nexaware\AADITWEB\public\data\image"

try:
    doc = fitz.open(pdf_path)
    image_count = 0

    for i in range(len(doc)):
        for img in doc.get_page_images(i):
            if image_count == 0:
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)
                
                if pix.n - pix.alpha < 4:       
                    pix.save(os.path.join(output_dir, f"product_{image_count}.png"))
                else:               
                    pix1 = fitz.Pixmap(fitz.csRGB, pix)
                    pix1.save(os.path.join(output_dir, f"product_{image_count}.png"))
                    pix1 = None
                pix = None
                print("Successfully restored product_0.png from original PDF.")
                exit(0)
            image_count += 1
            
    print("Could not find product_0 in PDF.")
except Exception as e:
    print(f"Error: {e}")
