"use strict";

var ConjugationOracle = function() {
    return {
    	checkAnswer : function(question, ans) {
            var normalisedAns = ans.replace(" ", "\\W*");
            return question.answers.filter(
                function(f){ return f.match(normalisedAns) !== null }
            ).length > 0;
        }
    }
};

angular.module("app.conjugation").factory("ConjugationOracle", ConjugationOracle);