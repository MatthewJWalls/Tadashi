"use strict";

/**
 *
 * Question service for the particles quiz.
 *
 * In the future these Services should be pulled
 * out into json files so that the data isn't
 * mixed in with the code.
 *
 */

var ParticleService = function() {

    var data = [
        [{
            item : "に",
            question : "What's that particle?",
            answers : ["time", "destination", "direction"],
            explanation : "に can be thought of as the 'target' of a verb. It can come after time, destination",
            example : "にほん <strong>に</strong> いきます / went to Japan"
        },{
            item : "で",
            question : "What's that particle?",
            answers : ["place", "at", "by way of"],
            explanation : "で denotes the 'how' or 'where' of a verb",
            example : "くるま <strong>で</strong> いきます / to go by car"
        },{
            item : "は",
            question : "What's that particle?",
            answers : ["topic marker", "topic"],
            explanation : "は is the Topic Marker, it places emphasis on what came before it",
            example : "牛 <strong>は</strong> たべます / I ate the cow"
        },{
            item : "にほん <span class='light'>?</span> いきます",
            question : "What's that particle?",
            answers : ["に"],
            explanation : "に can be thought of as the 'target' of a verb. It can come after time, destination, direction",
            ime: true
        }]
    ];

    return {

        all : function() {
            return data;
        },

        get : function(slideNumber) {
            return data[slideNumber];
        }

    }
};

angular.module("app.sources").service("ParticleService", ParticleService);

module.exports = ParticleService;
