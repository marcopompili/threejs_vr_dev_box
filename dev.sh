#!/bin/sh

# in case you set "ignore-scripts=true" (as you should do) on .npmrc

budo src/index.js:static/bundle.js --css style.css -d static -l -- -t brfs
