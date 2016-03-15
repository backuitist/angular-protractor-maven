var gulp = require('gulp');
var gulpProtractor = require("gulp-protractor");
var protractor = gulpProtractor.protractor;
var getProtractorDir = gulpProtractor.getProtractorDir;
var spawn = require('child_process').spawn;
var path = require('path');
var console = require('console');
var webserver = require('gulp-webserver');

gulp.task('default', ['updateWebDriver'], function(done){
    withXvfb(function(killXvfb) {
        withWebServer(function(killWS){
            runProtractorConfig().on('end', function() {
                killWS();
                killXvfb();
                done();
            });
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

function withXvfb(op) {
    var child = spawn('Xvfb', [':99', '-ac', '-screen', '0', '1600x1200x24'], {
            stdio: 'inherit'
    });

    return op(function() {
        console.log("Killing Xvfb...")
        child.kill();
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
    process.env.DISPLAY=':99';
    return gulp.src(["./src/test/**/*.js"])
    	.pipe(protractor({
    		configFile: "./src/test/protractor.config.js"
//    		,debug: true
    	}));
}