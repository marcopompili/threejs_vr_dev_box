#!/bin/sh

# in case you set "ignore-scripts=true" (as you should do) on .npmrc

./node_modules/.bin/budo src/index.js:static/bundle.js --css style.css -d static -l -- -t brfs -t babelify --presets [ @babel/preset-env ]
