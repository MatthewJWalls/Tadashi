
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

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $locationProvider.html5Mode(true);

    $routeProvider.when("/conjugation", {
        templateUrl : "/static/partials/conjugation.html",
        controller : "SlideController",
        controllerAs : "slides",
        resolve : {
            source : "ConjugationService"
        }
    });

};

app.config(config);

