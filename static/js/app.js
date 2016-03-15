require("./lib/angular.min.js")
require("./lib/angular-sanitize.min.js")
require("./lib/angular-animate.min.js")
require("./lib/angular-animate.min.js")

var particles = require("./particles")
var ime = require("./ime")

var app = angular.module(
    "quizzer", ["ngAnimate", "ngSanitize"]
);

app.service("Progression", particles.Progression);
app.controller("QuizController", particles.QuizController);
app.factory("ParticleService", particles.ParticleService);
app.directive("ngIme", ime.ImeDirective);

