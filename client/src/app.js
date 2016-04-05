"use strict";

// 3rd party libs

require("../node_modules/angular");
require("../node_modules/angular-sanitize");
require("../node_modules/angular-animate");
require("../node_modules/angular-route");
require("../node_modules/angular-mocks/ngMock.js");

// main application imports

require("./slides");
require("./quiz");
require("./datasources");
require("./ime");

// angular startup

var app = angular.module("quizzer", [
    "ngAnimate",
    "ngSanitize",
    "ngRoute",
    "app.quiz",
    "app.slides",
    "app.sources",
    "app.ime"
]);

var config = function($interpolateProvider, $locationProvider, $routeProvider) {

    // Flask uses {{}} so make angular use {$$} instead

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    // routing setup

    // We use angular's "resolve" property to inject the correct datasource
    // into the given route. It's then referenced in the associated template
    // partial, where it's bound to a directive. This is the leanest way I've 
    // found so far to conditionally provide different data to a controller
    // that is repeated several times on a page.

    $locationProvider.html5Mode(true);

    $routeProvider.when("/conjugation", {
        templateUrl : "/static/partials/conjugation.html",
        controller : "SlideController",
        controllerAs : "slides",
        resolve : {
            source : "ConjugationService"
        }
    }).when("/particles", {
        templateUrl : "/static/partials/particles.html",
        controller : "SlideController",
        controllerAs : "slides",
        resolve : {
            source : "ParticleService"
        }
    }).when("/interrogatives", {
        templateUrl : "/static/partials/interrogatives.html",
        controller : "SlideController",
        controllerAs : "slides",
        resolve : {
            source : "InterrogativesService"
        }
    }).otherwise({ 
        templateUrl: "/static/partials/landing.html" ,
        controller : "SlideController",
        controllerAs : "slides",
    });

};

app.config(config);

