exports.config = {
    baseUrl: 'http://localhost:8123/',

    specs: [
      'specs/*.js'
    ],

    mocks: {
      dir: 'mocks',
      default: ['items']
    },

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--disable-extensions', '--incognito']
        }
    },

//    directConnect: true,

    onPrepare: function(){
        require('protractor-http-mock').config = {
            rootDirectory: __dirname, // default value: process.cwd()
            protractorConfig: 'protractor.config.js'
        };
    },

    seleniumServerJar: '../../node_modules/selenium-standalone-jar/bin/selenium-server-standalone-2.45.0.jar'
};
