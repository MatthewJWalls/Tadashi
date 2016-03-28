"use strict";

describe("Particles Service", function() {

    beforeEach(module("app.sources"));

    it("should let you get all data via all()", inject(function(_ParticleService_) {
        var questions = _ParticleService_.all();
        expect(questions[0][0].question).toBeDefined();        
    }));

    it("should let you get data by slide via get(n)", inject(function(_ParticleService_) {
        var questions = _ParticleService_.get(0);
        expect(questions[0].question).toBeDefined();
    }));
    
});

describe("Conjugation Service", function() {

    beforeEach(module("app.sources"));

    it("should let you get all data via all()", inject(function(_ConjugationService_) {
        var questions = _ConjugationService_.all();
        expect(questions[0][0].question).toBeDefined();        
    }));

    it("should let you get data by slide via get(n)", inject(function(_ConjugationService_) {
        var questions = _ConjugationService_.get(0);
        expect(questions[0].question).toBeDefined();
    }));
    
});