#!/bin/zsh
# Update demo to use latest local library build

set -e

LIB_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
LIB_NAME="che-react-number-easing"

cd "$LIB_DIR"
echo "Building library..."
npm run build
echo "Packing library..."
TARBALL=$(npm pack | tail -n1)

cd "$LIB_DIR/gh-pages"
echo "Cleaning demo node_modules..."
rm -rf node_modules package-lock.json
echo "Installing new library tarball..."
npm install "../$TARBALL"
npm install
echo "Building demo..."
npm run build
echo "Demo updated to latest library version!"
