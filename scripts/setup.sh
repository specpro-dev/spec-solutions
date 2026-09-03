#!/bin/bash
# Setup script for Spec Solutions
# Run this once after cloning / first setup
# Usage: bash scripts/setup.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "→ Removing next.config.ts (only .js is supported by Next.js 14)..."
rm -f "$PROJECT_ROOT/next.config.ts"

echo "→ Checking for placeholder favicon PNGs..."
PUBLIC="$PROJECT_ROOT/public"

# Generate minimal 1x1 white PNG as a byte-level placeholder if pngs don't exist
# These are tiny placeholder files — replace with proper favicons before launch
if ! command -v convert &>/dev/null; then
  echo "  ⚠️  ImageMagick not found. Creating 1x1 PNG placeholders via Python fallback..."
  python3 -c "
import struct, zlib, base64

def make_png(size, bg=(15,27,60)):
    w, h = size, size
    raw = b''.join(b'\\x00' + bytes(bg) + b'\\xff' for _ in range(w)) * h
    def chunk(name, data):
        c = zlib.crc32(name + data) & 0xffffffff
        return struct.pack('>I', len(data)) + name + data + struct.pack('>I', c)
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)
    idat = zlib.compress(raw)
    return b'\\x89PNG\\r\\n\\x1a\\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')

import os
public = '$PUBLIC'
for name, size in [('favicon-32x32.png', 32), ('favicon-16x16.png', 16), ('apple-touch-icon.png', 180)]:
    path = os.path.join(public, name)
    if not os.path.exists(path):
        open(path, 'wb').write(make_png(size))
        print(f'  Created placeholder: {name}')
    else:
        print(f'  Already exists: {name}')
"
else
  for size in 32 16; do
    file="$PUBLIC/favicon-${size}x${size}.png"
    if [ ! -f "$file" ]; then
      convert -size ${size}x${size} xc:'#0F1B3C' "$file"
      echo "  Created: favicon-${size}x${size}.png"
    fi
  done
  if [ ! -f "$PUBLIC/apple-touch-icon.png" ]; then
    convert -size 180x180 xc:'#0F1B3C' "$PUBLIC/apple-touch-icon.png"
    echo "  Created: apple-touch-icon.png"
  fi
fi

# favicon.ico — copy from 32x32 if it doesn't exist
if [ ! -f "$PUBLIC/favicon.ico" ]; then
  cp "$PUBLIC/favicon-32x32.png" "$PUBLIC/favicon.ico" 2>/dev/null || \
    echo "  ⚠️  Could not create favicon.ico — copy favicon-32x32.png manually"
fi

echo ""
echo "✓ Setup complete. You can now run: npm run dev"
echo ""
echo "⚠️  Reminders before launch:"
echo "  1. Replace placeholder favicons in public/ with real ones"
echo "  2. Copy your .env.example to .env.local and fill in real values"
echo "  3. Swap founder placeholders in components/sections/Team.tsx"
echo "  4. Update phone number in components/ui/WhatsAppButton.tsx"
echo "  5. Run Lighthouse audit LAST — the '95+' copy only ships if it passes"
