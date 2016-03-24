"use strict";

var wanakana = require("../lib/wanakana.js");

var QuizController = function($rootScope, $sanitize, ParticleService, Progression, ParticleOracle) {

    var vm = this;

    var loadQuestionsIntoScope = function(res) {

        Progression.init(ParticleService.all())
        
        angular.extend(vm, {

            questions : Progression,
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
                return ParticleOracle.checkAnswer(
                    this.questions.getCurrent(), 
                    this.userInput
                );
            },

            getCurrent : function() {
                return this.questions.getCurrent();
            }

        });

        $rootScope.finished = true;

    };

    loadQuestionsIntoScope();

};

angular.module("app.particles").controller("QuizController", QuizController);

module.exports = QuizController;
