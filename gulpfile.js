var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var inject = require('gulp-inject');
var htmlDocuments = ['./index.html', './fr.html'];

var inlinestyles = function(){ // Inject the inline styles to the HTML file
    gulp.src(htmlDocuments)
        .pipe(inject(gulp.src(['./css/critical.min.css']), {
            starttag: '/* inject:criticalcss */',
            endtag: '/* endinject */',
            transform: function (filePath, file) {
                return file.contents.toString('utf8');
            }
        }))
        .pipe(gulp.dest('./'))
};

gulp.task('styles', function() {
    gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({ browsers: ['last 2 versions', 'ie 10-11', 'not ie <= 9'] }),
            cssnano()
        ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css/'))
        .on('end', inlinestyles); // Inline the styles when the CSS file is exported
});

gulp.task('watch',function() {
    gulp.watch('scss/**/*.scss',['styles']);
});