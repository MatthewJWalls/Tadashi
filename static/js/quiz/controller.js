"use strict";

var wanakana = require("../lib/wanakana.js");

var QuizController = function($rootScope, $scope, Progression) {

    console.log("Inside controller now");
    console.log($scope.quiz);
    console.log($scope.quiz.slide);

	var vm = this;
    var source = $scope.quiz.source;

    var progression = new Progression.Sequence(source.all(), 3);

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
            return source.checkAnswer(
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

angular.module("app.quiz").controller("QuizController", QuizController);

module.exports = QuizController;