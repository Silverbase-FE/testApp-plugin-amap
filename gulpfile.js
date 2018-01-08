var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

var paths = {
  sass: ['./scss/*.scss'],
  temp: ['./www/templates/*.html', './www/index.html'],
  js: ['./www/js/*.js']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function () {

  browserSync.init({
    server: {
      baseDir: "www"
    }
  });
  gulp.watch(paths.sass, ['sass'], function() {
    return browserSync.reload();
  });
  gulp.watch(paths.temp, function() {
    return browserSync.reload();
  });
  gulp.watch(paths.js, function() {
    return browserSync.reload();
  });
});
