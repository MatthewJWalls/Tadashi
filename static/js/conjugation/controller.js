"use strict";

var wanakana = require("../lib/wanakana.js");

var ConjugationController = function($rootScope, Progression, ConjugationService, ConjugationOracle) {
	
	var vm = this;

    var progression = new Progression.Sequence(ConjugationService.all());

	angular.extend(vm, {

        questions : progression,
        answered : false,
        state : "",
        userInput : "",

        attempt : function() {

            if(vm.questions.getCurrent().ime) {
                vm.userInput = wanakana.toKana(vm.userInput);
            }

            if(vm.checkAnswer(vm.userInput)){
                vm.state = "has-success";
                vm.answered = true;
            } else {
                vm.state = "has-error";
                vm.answered = true;
            }

        },

        next : function() {

            vm.questions.next();
            vm.answered = false;
            vm.state = "";
            vm.userInput = "";
        },

        checkAnswer : function(ans) {

            return ConjugationOracle.checkAnswer(
                vm.questions.getCurrent(), 
                vm.userInput
            );
        },

        getCurrent : function() {
            return vm.questions.getCurrent();
        }

    });

    $rootScope.finished = true;

};

var SlideController = function($rootScope, $routeParams) {

    var vm = this;

    console.log("Loading with slide number " + $routeParams.slideNumber);

    angular.extend(vm, {

        isShown : function(n) {
            return ""+n == $routeParams.slideNumber;
        }

    });

    $rootScope.finished = true;


};

angular.module("app.conjugation").controller("ConjugationController", ConjugationController);
angular.module("app.conjugation").controller("SlideController", SlideController);

module.exports = ConjugationController;