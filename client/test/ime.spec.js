"use strict";

var ENTER_KEY = 13;

describe("IME directive", function() {

    beforeEach(module("app.ime"));

    it("Should call controller's attempt() when question is unanswered", inject(function(_$compile_, _$rootScope_){

        // set up a fake scope & instantiate the directive

        _$rootScope_.quiz = {
        	answered : false,
        	next : function() {},
        	attempt : function() {},
        	questions : { current: { ime: true } }
        };

        spyOn(_$rootScope_.quiz, "attempt");
        spyOn(_$rootScope_.quiz, "next");

        var directive = _$compile_('<div ng-ime></div>')(_$rootScope_);

        // Keypress should call "attempt" on the controller

        directive.triggerHandler({ type: "keypress", which : ENTER_KEY });

        expect(_$rootScope_.quiz.attempt).toHaveBeenCalled();
        expect(_$rootScope_.quiz.next).not.toHaveBeenCalled();

    }));

    it("Should call controller's next() when question is answered", inject(function(_$compile_, _$rootScope_){

        // set up a fake scope & instantiate the directive

        _$rootScope_.quiz = {
        	answered : true,
        	next : function() {},
        	attempt : function() {},
        	questions : { current: { ime: true } }
        };

        spyOn(_$rootScope_.quiz, "attempt");
        spyOn(_$rootScope_.quiz, "next");

        var directive = _$compile_('<div ng-ime></div>')(_$rootScope_);

        // Keypress should call "next" on the controller

        directive.triggerHandler({ type: "keypress", which : ENTER_KEY });

		expect(_$rootScope_.quiz.next).toHaveBeenCalled();
        expect(_$rootScope_.quiz.attempt).not.toHaveBeenCalled();

    }));

});