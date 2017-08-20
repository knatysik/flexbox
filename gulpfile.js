var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var path = require('path');
var sassIncludePath = [
  path.join(__dirname, '/node_modules/bootstrap/scss')
];

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['sass', 'html']);

gulp.task('sass', function() {
  gulp.src('./src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: sassIncludePath
    }).on('error', sass.logError))
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


