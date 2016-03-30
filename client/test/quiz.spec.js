"use strict";

describe("Progression Service", function() {

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

        var first = progression.getCurrent();
        
        progression.next();

        var second = progression.getCurrent();
        
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

describe("Quiz Controller", function() {

    beforeEach(module("quizzer"));

    it("Should give access to the current question", inject(function(_$compile_, _$rootScope_, _ConjugationService_){

        // set up the scope to contain the source
        _$rootScope_.src = _ConjugationService_.get(0);

        // compile the directive which will create the controller which will
        // pull the source from the scope. Hopefully.
        var directive = _$compile_('<div ng-quiz qs="src"></div>')(_$rootScope_);

        expect(directive).toBeDefined();

    }));

    it("Should progress through questions", inject(function(_ConjugationService_, $controller){

        var scope = { quiz: { qs : _ConjugationService_.get(0) } };
        var controller = $controller('QuizController', { $scope: scope });
        var first = controller.getCurrent();

        controller.next();

        expect(controller.getCurrent()).not.toBe(first);

    }));

    it("Should have an error state when wrong", inject(function(_ConjugationService_, $controller){

        var scope = { quiz: { qs : _ConjugationService_.get(0) } };
        var controller = $controller('QuizController', { $scope: scope });

        spyOn(controller.questions, "getCurrent").and.returnValue({
            answers : ["test"],
            ime : false
        });
        
        controller.userInput = "wrong answer";
        controller.attempt();

        expect(controller.answered).toBe(true);
        expect(controller.state).toBe("has-error");


    }));

    it("Should have a success state when right", inject(function(_ConjugationService_, $controller){

        var scope = { quiz: { qs : _ConjugationService_.get(0) } };
        var controller = $controller('QuizController', { $scope: scope });

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
