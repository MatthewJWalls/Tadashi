
// 3rd party libs

require("./lib/angular.min.js");
require("./lib/angular-sanitize.min.js");
require("./lib/angular-animate.min.js");
require("./lib/angular-animate.min.js");
require("./lib/angular-route.min.js");
require("./lib/angular-mocks.js");

// main application exports

var particles = require("./particles");
var conjugation = require("./conjugation");
var ime = require("./ime");

// angular startup

var app = angular.module(
    "quizzer", ["ngAnimate", "ngSanitize", "ngRoute"]
);

var config = function($interpolateProvider, $locationProvider, $routeProvider) {

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $locationProvider.html5Mode(true);

    $routeProvider.when("/particles", {
        templateUrl : "/static/partials/quiz.html",
        controller : "QuizController",
        controllerAs : "quiz"
    });

    $routeProvider.when("/conjugation", {
        templateUrl : "/static/partials/quiz.html",
        controller : "ConjugationController",
        controllerAs : "quiz"
    });

}

app.config(config)
app.service("Progression", particles.Progression);
app.controller("QuizController", particles.QuizController);
app.controller("ConjugationController", conjugation.ConjugationController);
app.factory("ParticleService", particles.ParticleService);
app.factory("ConjugationService", conjugation.ConjugationService);
app.directive("ngIme", ime.ImeDirective);
