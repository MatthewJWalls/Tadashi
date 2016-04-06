"use strict";

/**
 * 
 * The app.quiz module provides an angular directive, ngQuiz
 * and controllers/services to control it.
 * 
 */

angular.module("app.quiz", []);

module.exports.QuizController = require("./controller");
module.exports.QuizDirective = require("./directive");
module.exports.Progression = require("./progression");
