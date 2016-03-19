
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

    it("should change the internal ind variable", inject(function(_Progression_) {

        _Progression_.init([
            {"question" : "a"},
            {"question" : "b"}
        ]);

        expect(_Progression_.ind).toBe(1);

        _Progression_.next();

        expect(_Progression_.ind).toBe(0);

    }));
    
});

describe("Conjugation Service", function() {

    beforeEach(module("quizzer"));

    it("Should conjugate godan verbs properly", inject(function(_ConjugationService_){

        var c = _ConjugationService_;

        expect(
            c.conjugate("iku", c.godan_conjugations.indicative.present.positive.plain)
        ).toBe("iku");

        expect(
            c.conjugate("iku", c.godan_conjugations.indicative.present.positive.formal)
        ).toBe("ikimasu");

        expect(
            c.conjugate("iku", c.godan_conjugations.potential.present.positive.plain)
        ).toBe("ikeru");

        expect(
            c.conjugate("iku", c.godan_conjugations.causative.present.positive.plain)
        ).toBe("ikaseru");

        expect(
            c.conjugate("iku", c.godan_conjugations.imperative.present.positive.plain)
        ).toBe("ike");

        expect(
            c.conjugate("iku", c.godan_conjugations.presumptive_probable.present.positive.plain)
        ).toBe("iku daro");

        expect(
            c.conjugate("iku", c.godan_conjugations.presumptive_probable.past.negative.formal)
        ).toBe("ikanakatta desho");

    }));

});