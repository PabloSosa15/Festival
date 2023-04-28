const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');



// Images
const cache = require('gulp-cache');
const imagenim = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


//JavaScript
const terser = require('gulp-terser-js');

function css(done) {
    src('src/scss/**/*.scss')   // Identify the SASS file
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())    // compile it
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));  // Store it on the hard drive

    done(); // Callback that notifies gulp when we reach the end
}


function image(done) {
    const options = {
        optimizationlevel: 3
    }
        
    src('src/img/**/*.{png, jpg}')
        .pipe(cache(imagenim(options)))
    .pipe(dest('build/img'))

    done();
}

function versionWebp(done) {
    const options = {
        quality: 50
    };
       src('src/img/**/*.{png,jpg}') 
        .pipe(webp(options))
        .pipe( dest('build/img'))
    done();
}

function versionAvif(done) {
    const options = {
        quality: 50
    };
       src('src/img/**/*.{png,jpg}') 
        .pipe(avif(options))
        .pipe( dest('build/img'))
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.image = image;
exports.avif = versionAvif;
exports.versionWebp = versionWebp;
exports.dev = parallel( image, versionWebp, versionAvif, javascript, dev);