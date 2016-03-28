"use strict";

describe("Particles Service", function() {

    beforeEach(module("quizzer"));

    it("should provide questions via all()", inject(function(_ParticleService_) {
        var questions = _ParticleService_.all();
        expect(questions[0]).toBeDefined();
        expect(questions[0].question).toBeDefined();        
    }));

    it("should be able to check answers properly", inject(function(_ParticleService_) {
        var questions = _ParticleService_.all();
        expect(_ParticleService_.checkAnswer(questions[0], questions[0].answers[0])).toBe(true);
    }));
    
});

