var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var files = "./source/*.js";

gulp.task('dist', function() {
    gulp.src(files)
    .pipe(concat('./dist'))
    .pipe(rename('ntt.js'))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.min.js'
        },
        preserveComments: 'all'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['dist']);