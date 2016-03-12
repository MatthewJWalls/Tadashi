// Karma configuration

module.exports = function(config) {
    config.set({
        basePath: 'static/',
        frameworks: ['jasmine'],
        files: [
            'angular.min.js',
            'angular-resource.min.js',            
            'main.js',            
            'tests.js',
        ],
        exclude: [
        ],
        preprocessors: {
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Firefox'],
        singleRun: false,
        concurrency: Infinity
    })
}
