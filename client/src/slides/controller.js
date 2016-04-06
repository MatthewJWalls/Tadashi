"use strict";

/**
 * 
 * The slide controller exposes functionality to move between
 * slides as defined in the template.
 * 
 */

var SlideController = function($rootScope) {

    var vm = this;

    angular.extend(vm, {

        currentSlide : 1,

        isShown : function(n) {
            return n == vm.currentSlide;
        },

        moveToNextSlide : function() {
            vm.currentSlide += 1;
        }

    });

    $rootScope.$on("slide-finished", function(){
        vm.moveToNextSlide();
    })

    $rootScope.finished = true;

};

angular.module("app.slides").controller("SlideController", SlideController);
