const gulp = require("gulp");

const config = require('./config.json')

const ts = require("gulp-typescript");
const tsProject = ts.createProject("./tsconfig.json");
gulp.task("typescript", function () {
    console.log(tsProject.length)
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(config.paths.public + '/javascripts/'));
});