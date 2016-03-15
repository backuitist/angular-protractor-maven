var gulp = require('gulp');
var gulpProtractor = require("gulp-protractor");
var protractor = gulpProtractor.protractor;
var getProtractorDir = gulpProtractor.getProtractorDir;
var spawn = require('child_process').spawn;
var path = require('path');
var console = require('console');
var webserver = require('gulp-webserver');

gulp.task('default', function(done){
    var stream = gulp.src(['src/main/webapp'])
        .pipe(webserver({
          port: 8123,
          open: true
        }));

    updateWebDriver(function() { runProtractorConfig(function () {
        console.log("killing webserver...")
        stream.emit('kill');
        done();
    }) });
});

function getProtractorBinary(binaryName){
    var binPath = path.join(getProtractorDir(), binaryName)
    console.log("binPath = " + binPath);
    return binPath;
}

function updateWebDriver(callback) {
    spawn(getProtractorBinary('webdriver-manager'), ['update'], {
        stdio: 'inherit'
    }).once('close', callback);
}

function runProtractorConfig(done) {
    gulp.src(["./src/test/**/*.js"])
    	.pipe(protractor({
    		configFile: "./src/test/protractor.config.js"
//    		,debug: true
    	}))
    	.on('error', function(e) {
    	    throw e;
        })
        .on('end', done)
}