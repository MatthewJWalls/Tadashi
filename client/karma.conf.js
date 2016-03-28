// Karma configuration

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'static/js/app.min.js',
            'test/*.js'
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
