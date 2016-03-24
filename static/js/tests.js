
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

        var progression = new _Progression_.Sequence([
            {"question" : "a"},
            {"question" : "b"}
        ]);
        
        expect(progression.current).toBeDefined();
            
    }));

    it("should progress through questions", inject(function(_Progression_) {

        var progression = new _Progression_.Sequence([
            {"question" : "a"},
            {"question" : "b"}
        ]);

        var first = progression.current;
        
        progression.next();

        var second = progression.current;
        
        expect(first.question).not.toBe(second.question);
            
    }));

    it("should change the internal ind variable", inject(function(_Progression_) {

        var progression = new _Progression_.Sequence([
            {"question" : "a"},
            {"question" : "b"}
        ]);

        expect(progression.ind).toBe(1);

        progression.next();

        expect(progression.ind).toBe(0);

    }));

    it("should shift questions left when upped", inject(function(_Progression_){ 

        var progression = new _Progression_.Sequence([
            {"question" : "a"},
            {"question" : "b"}
        ]);

        expect(progression.items[0].question).toBe("a");

        progression.up();

        expect(progression.items[0].question).toBe("b");

    }));

    it("should shift questions right when downed", inject(function(_Progression_){ 

        var progression = new _Progression_.Sequence([
            {"question" : "a"},
            {"question" : "b"}
        ]);

        expect(progression.items[0].question).toBe("a");

        progression.down();

        expect(progression.items[0].question).toBe("a");

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

    it("should conjugate ichidan verbs properly", inject(function(_ConjugationService_) {

        var c = _ConjugationService_;

        expect(
            c.conjugate("taberu", c.ichidan_conjugations.indicative.present.positive.plain)
        ).toBe("taberu");

        expect(
            c.conjugate("taberu", c.ichidan_conjugations.indicative.present.positive.formal)
        ).toBe("tabemasu");

        expect(
            c.conjugate("taberu", c.ichidan_conjugations.potential.present.positive.plain)
        ).toBe("taberareru");

        expect(
            c.conjugate("taberu", c.ichidan_conjugations.causative.present.positive.plain)
        ).toBe("tabesaseru");

        expect(
            c.conjugate("taberu", c.ichidan_conjugations.imperative.present.positive.plain)
        ).toBe("tabero");

        expect(
            c.conjugate("taberu", c.ichidan_conjugations.presumptive_probable.present.positive.plain)
        ).toBe("taberu daro");

        expect(
            c.conjugate("taberu", c.ichidan_conjugations.presumptive_probable.past.negative.formal)
        ).toBe("tabenakatta desho");

    }));

});

describe("Particle Controller", function() {

    beforeEach(module("quizzer"));

    it("Should have an error state when a user answers incorrectly", inject(function($controller) {

        var controller = $controller('QuizController');

        spyOn(controller.questions, "getCurrent").and.returnValue({
            answers : ["test"],
            ime : false
        });
        
        controller.userInput = "wrong answer";
        controller.attempt();

        expect(controller.answered).toBe(true);
        expect(controller.state).toBe("has-error");


    }));

    it("Should have a success state when a user answers correctly", inject(function($controller) {

        var controller = $controller('QuizController');

        spyOn(controller.questions, "getCurrent").and.returnValue({
            answers : ["test"],
            ime : false
        });

        controller.userInput = "test";
        controller.attempt();

        expect(controller.answered).toBe(true);
        expect(controller.state).toBe("has-success");


    }));

});

describe("Conjugation Controller", function() {

    beforeEach(module("quizzer"));

    it("Should have an error state when a user answers incorrectly", inject(function($controller) {

        var controller = $controller('ConjugationController');

        spyOn(controller.questions, "getCurrent").and.returnValue({
            answers : ["test"],
            ime : false
        });
        
        controller.userInput = "wrong answer";
        controller.attempt();

        expect(controller.answered).toBe(true);
        expect(controller.state).toBe("has-error");


    }));

    it("Should have a success state when a user answers correctly", inject(function($controller) {

        var controller = $controller('ConjugationController');

        spyOn(controller.questions, "getCurrent").and.returnValue({
            answers : ["test"],
            ime : false
        });

        controller.userInput = "test";
        controller.attempt();

        expect(controller.answered).toBe(true);
        expect(controller.state).toBe("has-success");


    }));

});

describe("ConjugationOracle", function(){

    beforeEach(module("quizzer"));

    it("Answers questions properly", inject(function(_ConjugationOracle_) {

        var mockQuestion = {
            answers : ["test"],
            ime : false
        };

        expect(_ConjugationOracle_.checkAnswer(mockQuestion, "test")).toBe(true);
        expect(_ConjugationOracle_.checkAnswer(mockQuestion, "hank")).toBe(false);

    }));

});
