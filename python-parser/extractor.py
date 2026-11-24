import pdfplumber;
import sys;

def extract_text(pdfPath):
    
    try:
        with pdfplumber.open(pdfPath) as pdf:
            
            allText = []
            for page in pdf.pages:

                text = page.extract_text()
                if text:
                    allText.append(text)
            
            return "\n".join(allText);

    except Exception as e:
        print(f"Error reading PDF : {e}", file = sys.stderr)
        sys.exit(1)


