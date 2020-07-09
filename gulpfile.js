const fs = require('fs')
const path = require('path')

const { series } = require('gulp')

const browserify = require('browserify')
const uglifyJS = require('uglify-js')

JS_OUTPUT_BUNDLE = path.join(__dirname, '3js_vr_dev_box.js')

function clean (cb) {
  fs.access(JS_OUTPUT_BUNDLE, fs.constants.F_OK, () => {
    cb()
  })
}

function bundler (cb) {
  const b = browserify('./src/index.js')

  b.transform('babelify', {
    presets: [ '@babel/preset-env' ]
  })

  b.bundle((err, src) => {
    if (err) {
      console.error(err)
    } else {
      cb(src)
    }
  })
}

function minify (cb) {
  bundler(src => {
    const minified = uglifyJS.minify(src.toString('utf8'))

    if (minified.error) {
      console.error(minified.error)
      cb()
    } else {
      fs.writeFile(JS_OUTPUT_BUNDLE, minified.code, () => cb())
    }

  })
}

exports.default = series(clean, minify)
