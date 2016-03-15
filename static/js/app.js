require("./lib/angular.min.js")
require("./lib/angular-sanitize.min.js")
require("./lib/angular-animate.min.js")
require("./lib/angular-animate.min.js")
require("./lib/angular-route.min.js")
require("./lib/angular-mocks.js")

var particles = require("./particles")
var ime = require("./ime")

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

}

app.config(config)
app.service("Progression", particles.Progression);
app.controller("QuizController", particles.QuizController);
app.factory("ParticleService", particles.ParticleService);
app.directive("ngIme", ime.ImeDirective);

