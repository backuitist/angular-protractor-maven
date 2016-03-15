var gulp = require('gulp');
var gulpProtractor = require("gulp-protractor");
var protractor = gulpProtractor.protractor;
var getProtractorDir = gulpProtractor.getProtractorDir;
var spawn = require('child_process').spawn;
var path = require('path');
var console = require('console');
var webserver = require('gulp-webserver');

gulp.task('default', ['updateWebDriver'], function(done){
    withWebServer(function(wsDone){
        runProtractorConfig().on('end', function() {
            wsDone();
            done();
        });
    });
});

/*
 * @param op a callback that takes a callback to be called when finished
 */
function withWebServer(op) {
    var stream = gulp.src(['src/main/webapp'])
               .pipe(webserver({
                 port: 8123
               }));

    return op(function() {
        console.log("Killing webserver...")
        stream.emit('kill');
    });
}

function getProtractorBinary(binaryName){
    var binPath = path.join(getProtractorDir(), binaryName)
    console.log("binPath = " + binPath);
    return binPath;
}

gulp.task('updateWebDriver', function() {
    return spawn(getProtractorBinary('webdriver-manager'), ['update'], {
        stdio: 'inherit'
    });
});

/*
 * @return a stream
 */
function runProtractorConfig() {
    return gulp.src(["./src/test/**/*.js"])
    	.pipe(protractor({
    		configFile: "./src/test/protractor.config.js"
//    		,debug: true
    	}));
}