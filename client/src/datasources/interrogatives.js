"use strict";

var InterrogativesService = function() {

    var data = [
        [
            {
                item : "だれ",
                question : "Type the English",
                answers : ["Who"],
                explanation : "",
                example : ""
            }, {
                item : "なに",
                question : "Type the English",
                answers : ["What"],
                explanation : "",
                example : ""
            }, {
                item : "どう",
                question : "Type the English",
                answers : ["How"],
                explanation : "",
                example : ""
            }, {
                item : "どこ",
                question : "Type the English",
                answers : ["Where"],
                explanation : "",
                example : ""
            }, {
                item : "どうして",
                question : "Type the English",
                answers : ["Why"],
                explanation : "",
                example : ""
            }, {
                item : "どちら",
                question : "Type the English",
                answers : ["Which Way", "What Direction"],
                explanation : "",
                example : ""
            }, {
                item : "どれ",
                question : "Type the English",
                answers : ["Which"],
                explanation : "Used to ask which of several options",
                example : ""
            }, {
                item : "いつ",
                question : "Type the English",
                answers : ["When"],
                explanation : "Used to ask the time",
                example : ""
            }, {
                item : "いくつ",
                question : "Type the English",
                answers : ["How Many"],
                explanation : "This is used to ask the amount of something",
                example : ""
            }, {
                item : "いくら",
                question : "Type the English",
                answers : ["How Much"],
                explanation : "This is used to ask how much something costs",
                example : ""
            }, {
                item : "なぜ",
                question : "Type the English",
                answers : ["Why"],
                explanation : "This phrase is a more formal way to ask Why",
                example : ""
            }, {
                item : "なんで",
                question : "Type the English",
                answers : ["Why"],
                explanation : "This phrase is a more casual way to ask Why",
                example : ""
            }
        ]
    ];

    return {

        all : function() {
            return data;
        },

        get : function(slideNumber) {
            return data[slideNumber];
        }
    };

};

angular.module("app.sources").factory("InterrogativesService", InterrogativesService);

module.exports = InterrogativesService;
