"use strict";

/**
 *
 * Tadashi - Angular/Flask based Quiz platform for Japanese.
 * 
 * This app uses browserify/watchify for dependency handling
 * (the "require" and "exports" keywords)
 * 
 * Creating a new quiz requires:
 *
 * 1. A new datasource in the datasources module
 * 2. A new template in the static/partials area
 * 3. Placing the route in the config section of this file
 *
 * The Quiz module provides tools for the core Quiz component
 * The Slides module helps break content up into slides
 * 
 */

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

    // Flask uses {{}} in templates so make angular use {$$} instead

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    // routing setup

    // We use angular's "resolve" property to inject the correct datasource
    // into the given route. It's then referenced in the associated template
    // partial, where it's bound to a directive. This is the leanest way I've 
    // found so far to conditionally provide route-specific data to a generic
    // controller. I might switch to using a Provider in the future though.

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

