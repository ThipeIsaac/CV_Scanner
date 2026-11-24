import sys
from extractor import extract_text

sys.stdout.reconfigure(encoding="utf-8")

if __name__ == "__main__":

    if len(sys.argv) < 2:

        print("Error: No file path provided", file = sys.stderr)
        sys.exit(1)

    pdfPath = sys.argv[1]
    text = extract_text(pdfPath)
    print(text)