/*
  copy.js
  ===========
  copies images and javascript folders to public
*/

const gulp = require('gulp')

const config = require('./config.json')

gulp.task('copy-assets', function () {
  return gulp.src([
    `${config.paths.assets}/**`,
    `!${config.paths.assets}/sass/**`,
    `!${config.paths.assets}/typescript/**`
  ])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-documentation', function () {
  return gulp.src([
    `${config.paths.docsAssets}/**`,
    `!${config.paths.docsAssets}/sass/**`,
    `!${config.paths.docsAssets}/typescript/**`
  ])
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('copy-assets-v6', function () {
  return gulp.src([
    `${config.paths.v6Assets}/**`,
    `!${config.paths.v6Assets}/sass/**`,
    `!${config.paths.v6Assets}/typescript/**`
  ])
    .pipe(gulp.dest(config.paths.public + '/v6'))
})
