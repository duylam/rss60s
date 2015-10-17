var gulp            = require('gulp')
  , plugins         = require('gulp-load-plugins')()
  , merge2          = require('merge2')
  , _               = require('lodash')
  , runSequence     = require('run-sequence')

gulp.task('build:js', function() {
  return merge2([
    gulp.src([
        'src/vendors/jquery/dist/jquery.js',
        'src/vendors/angular/angular.js',
        'src/vendors/foundation/js/foundation.js',
        'src/vendors/lodash/lodash.js',
        'src/js/app.js',
        'src/js/**/!(launch-app.js|module-registration.js)',
        'src/js/module-registration.js',
        'src/js/launch-app.js'
      ])
      .pipe(plugins.concat('main.js'))
      .pipe(gulp.dest('dist/js'))
    ,
    gulp.src('src/pages/**/*.js')
      .pipe(gulp.dest('dist/pages'))
  ])

})

gulp.task('build:css', function() {
  return gulp.src(['src/sass/main.scss', 'src/vendors/animate.css/animate.css'])
    .pipe(plugins.if(/\.scss$/, plugins.sass()))
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('copy:others', function() {
  var outLocaleFolder = 'dist/_locales'
    , outImagesFolder = 'dist/images'
    , outFontFolder = 'dist/fonts'
  return merge2([
    gulp.src('src/_locales/**/*')
      .pipe(plugins.cleanDest(outLocaleFolder))
      .pipe(gulp.dest(outLocaleFolder))
    ,
    gulp.src('src/images/**/*')
      .pipe(plugins.cleanDest(outImagesFolder))
      .pipe(gulp.dest(outImagesFolder))
    ,
    gulp.src(['src/vendors/foundation-icon-fonts/foundation-icons.woff', 'src/vendors/foundation-icon-fonts/foundation-icons.css'])
      .pipe(plugins.cleanDest(outFontFolder))
      .pipe(gulp.dest(outFontFolder))
    ,
    gulp.src('src/*.*')
      .pipe(gulp.dest('dist'))
    ,
    gulp.src('src/pages/**/*.htm')
      .pipe(gulp.dest('dist/pages'))
    ,
    gulp.src(['src/vendors/foundation/css/foundation.min.css', 'src/vendors/foundation/css/normalize.min.css'])
      .pipe(plugins.cleanDest('dist/pages/css'))
      .pipe(gulp.dest('dist/pages/css'))
    ,
    gulp.src([
        'src/vendors/jquery/dist/jquery.js',
        'src/vendors/angular/angular.js',
        'src/vendors/foundation/js/foundation.js',
        'src/vendors/lodash/lodash.js'
      ])
      .pipe(gulp.dest('dist/pages/js'))
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
  _.each(['src/_locales/**/*', 'src/images/*', 'src/pages/**/*.htm', 'src/*.*'], function(path) {
    gulp.watch(path, ['copy:others'])
  })
  _.each(['src/js/**/*', 'src/pages/**/*.js'], function(path) {
    gulp.watch(path, ['build:js'])
  })
  gulp.watch('src/sass/main.scss', ['build:css'])
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