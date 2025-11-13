#!/bin/bash
input_folder="./pdfs"
output_folder="./pdfs"

for file in "$input_folder"/*.pdf; do
  filename=$(basename "$file")
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/printer \
     -dNOPAUSE -dQUIET -dBATCH \
     -sOutputFile="$output_folder/$filename" "$file"
  echo "✅ Compressed: $filename"
done

echo "🎉 All PDFs compressed successfully!"
