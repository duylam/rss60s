var gulp            = require('gulp')
  , plugins         = require('gulp-load-plugins')()
  , merge2          = require('merge2')
  , _               = require('lodash')
  , runSequence     = require('run-sequence')

gulp.task('build:js', function() {
  return gulp.src([
      'src/vendors/jquery/dist/jquery.js',
      'src/vendors/angular/angular.js',
      'src/vendors/foundation/js/foundation.js',
      'src/vendors/lodash/lodash.js',
      'src/js/app.js',
      'src/js/**/!(launch-app.js)',
      'src/js/launch-app.js'
    ])
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('build:css', function() {
  return gulp.src(['src/sass/main.scss', 'src/vendors/animate.css/animate.css'])
    .pipe(plugins.if(/\.scss$/, plugins.sass()))
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('copy:others', function() {
  var outLocaleFolder = 'dist/_locales'
  var outImagesFolder = 'dist/images'
  return merge2([
    gulp.src('src/_locales/**/*')
      .pipe(plugins.cleanDest(outLocaleFolder))
      .pipe(gulp.dest(outLocaleFolder))
    ,
    gulp.src('src/images/**/*')
      .pipe(plugins.cleanDest(outImagesFolder))
      .pipe(gulp.dest(outImagesFolder))
    ,
    gulp.src(['src/bootstrap.js', 'src/manifest.json'])
      .pipe(gulp.dest('dist'))
  ])
})


gulp.task('test', function() {
  return gulp.src(['test/bootstrap.js', 'test/*.js'], { read: false })
    .pipe(plugins.mocha({
      ui: 'tdd'
      , reporter: 'spec'
    }))
})

gulp.task('watch', ['build'], function() {
  _.each(['src/_locales/**/*', 'src/images/*', 'src/bootstrap.js', 'src/manifest.json'], function(path) {
    gulp.watch(path, ['copy:others'])
  })
  gulp.watch('src/sass/main.scss', ['build:css'])
  gulp.watch('src/js/**/*', ['build:js'])

  console.info('Watching changes ...')
})

gulp.task('build', function(cb) {
  runSequence('clean', ['build:css', 'build:js', 'copy:others'], cb)
})

gulp.task('clean', function() {
  return gulp.src('dist').pipe(plugins.clean())
})

gulp.task('default', function() {
  console.info('Supports following commands: build, watch, test')
})