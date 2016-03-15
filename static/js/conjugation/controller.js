"use strict";

var wanakana = require("../lib/wanakana.js");

var ConjugationController = function($rootScope, Progression, ConjugationService) {
	
	var vm = this;

	console.log("Starting up conjugation controller");
	console.log(Progression);

	Progression.init(ConjugationService.all());

	angular.extend(vm, {

        questions : Progression,
        answered : false,
        state : "",
        userInput : "",

        attempt : function() {

            if(vm.questions.current.ime) {
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
            var normalisedAns = ans.replace(" ", "\\W*");
            return this.questions.current.answers.filter(
                function(f){ return f.match(normalisedAns) !== null }
            ).length > 0;
        },

    });

    $rootScope.finished = true;

}

module.exports = ConjugationController;