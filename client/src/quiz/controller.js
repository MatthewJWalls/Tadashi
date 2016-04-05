"use strict";

var wanakana = require("../util/wanakana.js");

var QuizController = function($rootScope, $scope, Progression) {

    var vm = this;
    var qs = $scope.quiz.qs.slice();

    var progression = new Progression.Sequence(qs, 3);

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
                vm.questions.up();
            } else {
                vm.state = "has-error";
                vm.answered = true;
                vm.questions.down();
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
            var normalisedAns = ans.toLowerCase().replace(" ", "\\W*");
            return vm.getCurrent().answers.filter(
                function(f){ return f.toLowerCase().match(normalisedAns) !== null }
            ).length > 0;
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
