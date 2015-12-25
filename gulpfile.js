'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var coffeelint = require('gulp-coffeelint');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var server = require('gulp-develop-server');

const SRC = './src/';
const DST = './dist/';

const paths = {
      coffeeFiles: SRC + '**/*.coffee',
};

gulp.task('clean', function() {
  return gulp.src(DST)
    .pipe(clean());
});

gulp.task('coffee-lint', function () {
  return gulp.src(SRC+paths.jsFiles)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());
});

gulp.task('coffee-dist', function() {
  return gulp.src(paths.coffeeFiles)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(DST));
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['coffee-lint', 'coffee-dist'],
              callback
  )
});

gulp.task('develop', ['server:start'], function() {
  gulp.watch(paths.coffeeFiles, ['build', server.restart]);
});

gulp.task('server:start', function() {
  server.listen({
    path: './dist/server.js'
  });
});
