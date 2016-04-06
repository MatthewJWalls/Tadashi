"use strict";

/**
 *
 * Question service for verb conjugation quiz.
 *
 * In the future these Services should be pulled
 * out into json files so that the data isn't
 * mixed in with the code.
 *
 */

var ConjugationService = function() {

    var data = [[
        {
            item : "HODOR?",
            question : "What's that hodor?",
            answers : ["HODOR", "HODOR", "HODOR"],
            explanation : "HODOR",
            example : "HODOR"
        }, {
            item : "BRODOR?",
            question : "What's that brodor?",
            answers : ["BRODOR"],
            explanation : "BRODOR",
            example : "BRODOR"
        }
    ]];

    return {

        all : function() {
            return data;
        },

        get : function(slideNumber) {
            return data[slideNumber];
        }
    };

};

angular.module("app.sources").factory("ConjugationService", ConjugationService);

module.exports = ConjugationService;
