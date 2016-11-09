var gulp = require('gulp'); // sets a varible for the package in node_modules
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('sass', function() {
    return gulp.src('public/sass/style.scss') // source file
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('public/css')) // source destination folder

});

gulp.task('compress', function(cb) {
    pump([
        gulp.src('public/js/*.js'),
        uglify(),
        gulp.dest('public/dist/js')
    ]),
    cb
});

gulp.task('minifyCss', function() {
    return gulp.src('public/css/style.css')
        .pipe(cleanCSS({
            debug: true,
            compatibility: 'ie8'},
            function(details) {
            console.log(details.name + ': ' + details.stats.originalSize + ' - source file');
            console.log(details.name + ': ' + details.stats.minifiedSize + ' - min. file');
        }))
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('images', function() {
    return gulp.src('public/img/**/*')
        .pipe(cache(imagemin())
        .pipe(gulp.dest('public/dist/img')))
});

gulp.task('fonts', function() {
    return gulp.src('public/fonts/**/*')
        .pipe(gulp.dest('public/dist/fonts'))
});

gulp.task('clean:dist', function() {
    return del.sync('public/dist');
});

gulp.task('cache:clear', function(){
    return cache.clearAll();
});


gulp.task('build', function() {
    runSequence('clean:dist', ['sass', 'compress','minifyCss', 'images', 'fonts']);
});

gulp.task('watch',['sass'], function() {
    gulp.watch('public/sass/**/*.scss', ['sass']);
});

