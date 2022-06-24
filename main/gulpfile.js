const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const shell = require('gulp-shell');
const {run} = require('gulp-dotnet-cli');


gulp.task("http", () => {
    return gulp.src('../WebServer/WebServer/WebServer.csproj', {read: false}).pipe(run())
})

gulp.task("serve-dev", () => {
    return gulp.src('./').pipe(shell((['npm run start'])))
});

gulp.task("default", gulp.series(gulp.parallel("http", "serve-dev")))