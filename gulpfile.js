var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var fs = require("fs");
var through = require('through2');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var liquid = require('gulp-liquidjs');
// var copy = require('gulp-copy');

var templateFile = './template.liquid';
var langFolder = 'lang/';
var globalLang = './global.json';
var langs = [
    { code: 'en', file: 'index' },
    { code: 'fr', file: 'fr' }
];
var htmlDocuments = ['./index.html', './fr.html'];
var fileFolders = ['./fonts', './img'];
var extraDocs = ['./404.html', './chriskirknielsen_cv.pdf', 'chriskirknielsen_resume.pdf'];
var outputFolder = 'build/';

var deepMerge = function(...sources) { // From https://stackoverflow.com/a/49798508/3624336
    let acc = {}
    for (const source of sources) {
      if (source instanceof Array) {
        if (!(acc instanceof Array)) {
          acc = []
        }
        acc = [...acc, ...source]
      } else if (source instanceof Object) {
        for (let [key, value] of Object.entries(source)) {
          if (value instanceof Object && key in acc) {
            value = deepMerge(acc[key], value)
          }
          acc = { ...acc, [key]: value }
        }
      }
    }
    return acc
  }

var inlineStyles = function(file){ // Inject the inline styles to the HTML file
    return gulp.src(file)
        .pipe(inject(gulp.src(['./'+outputFolder+'css/critical.min.css']), {
            starttag: '<style id="critical-css">',
            endtag: '</style>',
            transform: function (filePath, file) {
                return file.contents.toString('utf8');
            }
        }))
};

var copyFiles = function(){ // Copy non-dynamic files and folders to the destination folder
    gulp.src(fileFolders.map(function(f) { return f+'/**/*'; }), { base: './' })
        .pipe(gulp.dest('./'+outputFolder))
    ;
    gulp.src(extraDocs)
        .pipe(gulp.dest('./'+outputFolder))
}

gulp.task('styles', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({ browsers: ['last 2 versions', 'ie 10-11', 'not ie <= 9'] }),
            cssnano()
        ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./'+outputFolder+'css/'))
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./'+outputFolder+'js/'))
});

gulp.task('build', ['styles', 'scripts'], function() {
    var globalJSON = JSON.parse(fs.readFileSync('./'+langFolder+globalLang, "utf8"));

    langs.forEach(function(lang) {
        var langJSON = JSON.parse(fs.readFileSync('./'+langFolder+lang.code+'.json', "utf8"));
        var liquidOptions = { data: deepMerge(globalJSON, langJSON) };
        
        gulp.src(templateFile)
            .pipe(liquid(liquidOptions))
            .pipe(inject(gulp.src(['./'+outputFolder+'css/critical.min.css']), { // Inject critical CSS into HTML document
                starttag: '<style id="critical">',
                endtag: '</style>',
                transform: function (filePath, file) {
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(rename(lang.file + '.html')) // Rename to the lang's filename and set to HTML extension
            .pipe(gulp.dest('./'+outputFolder))
        }
    );

    copyFiles();
});

gulp.task('watch',function() {
    gulp.watch([
        './template.liquid',
        'lang/**/*.json',
        'scss/**/*.scss',
        'js/*.js'
    ], ['build']);
});