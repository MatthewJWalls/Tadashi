"use strict";

describe("SlideController", function() {

	beforeEach(module("app.slides"));

	it("Should start with slide 1", inject(function($controller, _$rootScope_){ 

		var scope = {};
		var controller = $controller("SlideController", { $scope : scope});

		expect(controller.isShown(1)).toBe(true);
		expect(controller.isShown(2)).toBe(false);

	}));

	it("Should increment slides when asked", inject(function($controller, _$rootScope_){ 

		var scope = {};
		var controller = $controller("SlideController", { $scope : scope});

		expect(controller.isShown(1)).toBe(true);

		controller.moveToNextSlide();

		expect(controller.isShown(1)).toBe(false);
		expect(controller.isShown(2)).toBe(true);

	}));

});
