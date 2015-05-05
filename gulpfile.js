var gulp = require('gulp');
var livereload = require('gulp-livereload');

/*
PASTE <script src="//localhost:35729/livereload.js"></script>
IN THE HEAD OF THE PAGE FOR LIVERELOAD TO WORK
 */


var paths = {
  scripts: 'client/public/assets/js/*.js',
  images: 'client/public/assets/img/*.*',
  styles: 'client/public/assets/css/*.css',
  angComponents: 'client/public/app/**/*.*',
  html: 'client/public/index.html'
};

gulp.task('angular', function() {
  return gulp.src([
    paths.angComponents
  ])
  .pipe(livereload());
});

gulp.task('scripts', function() {
  return gulp.src([
    paths.scripts
  ])
  .pipe(livereload());
});

gulp.task('styles', function() {
  return gulp.src([
    paths.styles
  ])
  .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src([
    paths.html
  ])
  .pipe(livereload());
});

gulp.task('images', function() {
  return gulp.src([
    paths.images
  ])
  .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  
  gulp.watch(paths.scripts,['scripts']);
  gulp.watch(paths.html,['html']);
  gulp.watch(paths.images,['images']);
  gulp.watch(paths.styles,['styles']);
  gulp.watch(paths.angComponents,['angular']);


});

gulp.task('default', ['watch']);