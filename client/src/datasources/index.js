"use strict";

/**
 *
 * Datasources represent the actual data (questions and answers)
 * for a quiz. They could get the data from a remote API or have
 * it built-in.
 * 
 * As a convention, every source implements a get(int) function
 * and an all() function. This is to handle quizzes that are split
 * into multiple slides using the slides module + template.
 * 
 */

angular.module("app.sources", []);

module.exports.ConjugationService = require("./conjugation.js");
module.exports.ParticleService = require("./particles.js");
module.exports.InterrogativesService = require("./interrogatives");
