import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import groupMediaQueries from 'gulp-group-css-media-queries';

const sassCompiler = gulpSass(sass);

// Compile SASS to CSS
function style() {
    return gulp.src('./scss/**/*.scss') // Source folder containing the SASS files
        .pipe(sourcemaps.init()) // Initialize sourcemap
        .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compile SASS to CSS
        .pipe(postcss([autoprefixer()])) // Apply autoprefixer only
        .pipe(groupMediaQueries()) // Group media queries
        .pipe(sourcemaps.write('.')) // Write sourcemaps file in the same directory
        .pipe(gulp.dest('./src')); // Destination folder for CSS
}

// Watch for changes
function watch() {
    gulp.watch('./scss/**/*.scss', style); // Watch the SASS files for changes
}

// Default Gulp task
export default gulp.series(style, watch);