# CHANGELOG

## 0.2.0 (2025-08-26)

### Demo and Build Pipeline Modernization

- Demo and library now use a single React instance (no duplicate Reacts)
- Demo imports library from npm tarball, not local dist
- Added stable, modular Gulp build pipeline (separate build and watch tasks)
- Added LESS variable for @primary-color
- Added /gh-pages/bin/update-demo.sh for one-command demo updates
- Added npm script 'update-demo' for easy demo refresh
- Improved error handling and build stability
- Updated documentation and workflow for best practices

## 0.1.3

Adds in currency (thanks! @jgautheron)

## 0.1.2

Adds in decimal values (thanks! @che-wf)

## 0.0.5

Updates to React 16 (thanks! @kunukn)

## 0.0.4

Fix incorrect numbers being drawn when the screen was inactive. (thanks! @migreva)

## 0.0.3

Added `delayValue` prop to delay the start of the animation.

## 0.0.2

Added `userLocaleString` prop. Thanks @adjohu.

## 0.0.1

Initial release
