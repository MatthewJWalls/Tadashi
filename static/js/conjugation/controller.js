"use strict";

var wanakana = require("../lib/wanakana.js");

var ConjugationController = function($rootScope, $scope, Progression, ConjugationService, ConjugationOracle) {
	
	var vm = this;

    var progression = new Progression.Sequence(ConjugationService.all(), 3);

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

            if(vm.questions.next()){

                vm.answered = false;
                vm.state = "";
                vm.userInput = "";

            } else {

                vm.quizFinished();

            }

        },

        checkAnswer : function(ans) {
            return ConjugationOracle.checkAnswer(
                vm.questions.getCurrent(), 
                vm.userInput
            );
        },

        getCurrent : function() {
            return vm.questions.getCurrent();
        },

        quizFinished : function() {
            $rootScope.$emit("slide-finished");
        }

    });

    $rootScope.finished = true;

};

var SlideController = function($rootScope) {

    var vm = this;

    angular.extend(vm, {

        currentSlide : 1,

        isShown : function(n) {
            return n == vm.currentSlide;
        },

        moveToNextSlide : function() {
            vm.currentSlide += 1;
        }

    });

    $rootScope.$on("slide-finished", function(){
        vm.moveToNextSlide();
    })

    $rootScope.finished = true;


};

angular.module("app.conjugation").controller("ConjugationController", ConjugationController);
angular.module("app.conjugation").controller("SlideController", SlideController);

module.exports = ConjugationController;