
// 3rd party libs

require("./lib/angular.min.js");
require("./lib/angular-sanitize.min.js");
require("./lib/angular-animate.min.js");
require("./lib/angular-animate.min.js");
require("./lib/angular-route.min.js");
require("./lib/angular-mocks.js");

// main application imports

require("./particles");
require("./conjugation");
require("./ime");

// angular startup

var app = angular.module("quizzer", [
    "ngAnimate", 
    "ngSanitize", 
    "ngRoute", 
    "app.particles", 
    "app.conjugation", 
    "app.ime"
]);

var config = function($interpolateProvider, $locationProvider, $routeProvider) {

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $locationProvider.html5Mode(true);

    $routeProvider.when("/particles", {
        templateUrl : "/static/partials/particles.html",
        controller : "QuizController",
        controllerAs : "quiz"
    });

    $routeProvider.when("/conjugation", {
        templateUrl : "/static/partials/conjugation.html",
        controller : "SlideController",
        controllerAs : "slides"
    });

}

app.config(config);
