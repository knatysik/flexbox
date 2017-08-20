var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

gulp.task('default', ['server', 'watch']);

gulp.task('sass', function() {
  gulp.src('./src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});
gulp.task('watch', function () {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/*.html', ['html']);
});
gulp.task('html',function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});
gulp.task('server', function () {
  connect.server({
    root: 'build',
    livereload: true
  });
});

