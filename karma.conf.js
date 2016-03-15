// Karma configuration

module.exports = function(config) {
    config.set({
        basePath: 'static/js',
        frameworks: ['jasmine'],
        files: [
            'app.min.js',
            'tests.js'
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
