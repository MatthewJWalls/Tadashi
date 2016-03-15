
describe("Particles Question Service", function() {

    beforeEach(module("quizzer"));

    it("should provide questions via all()", inject(function(_ParticleService_) {
        var questions = _ParticleService_.all();
        expect(questions[0]).toBeDefined();
        expect(questions[0].question).toBeDefined();        
    }));
    
});

describe("Question Progressions", function() {

    beforeEach(module("quizzer"));

    it("should expose current question", inject(function(_Progression_) {

        _Progression_.init([
            {"question" : "a"},
            {"question" : "b"}
        ]);
        
        expect(_Progression_.current).toBeDefined();
            
    }));

    it("should progress through questions", inject(function(_Progression_) {

        _Progression_.init([
            {"question" : "a"},
            {"question" : "b"}
        ]);

        var first = _Progression_.current;
        
        _Progression_.next();

        var second = _Progression_.current;
        
        expect(first.question).not.toBe(second.question);
            
    }));
    
});
