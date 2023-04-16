const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

function css(done) {
    src('src/scss/**/*.scss')   // Identify the SASS file
        .pipe(plumber())
        .pipe(sass())    // compile it
        .pipe(dest("build/css"));  // Store it on the hard drive

    done() // Callback that notifies gulp when we reach the end
}

function dev(done) {
    watch('src/scss/**/*.scss', css)

    done()
}
exports.css = css;
exports.dev = dev;