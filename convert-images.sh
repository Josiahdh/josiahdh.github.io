#!/bin/bash
# Converts PNG and HEIC images to JPEG (quality 85) in-place within assets/images.
# Originals are left untouched — converted files get a .jpg extension.
# Requires ImageMagick: brew install imagemagick

set -e

IMAGES_DIR="$(dirname "$0")/assets/images"

find "$IMAGES_DIR" -type f \( -iname "*.png" -o -iname "*.heic" \) | while read -r src; do
  dest="${src%.*}.jpg"
  if [ -f "$dest" ]; then
    echo "SKIP (already exists): $dest"
    continue
  fi
  echo "Converting: $src → $dest"
  magick "$src" -quality 85 "$dest"
done

echo "Done."
