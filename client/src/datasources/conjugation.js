"use strict";


// given a string a, and a string transform, returns the transformed a.
// example transforms : "a>b", "a>b,b>c", ">a", "a>", "a>b|b>c"

// Why not regex? Because I also need to present the transformations to
// laymen users as a guide on how it was mechanicall conjugated.

var T = function(w, t) {

    var segs  = t.split("|");

    // for each | delimited part

    for(var s = 0; s < segs.length; s++) {

        var parts = segs[s].split(",");

        // for each , delimited part

        for(var p = 0; p < parts.length; p++) {

            var changed = false;
            var oper = parts[p];

            // perform the > operation

            if(oper.contains(">")) {

                var befr = oper.split(">")[0];
                var aftr = oper.split(">")[1];

                if(w.endsWith(befr)){
                    w = w.substring(0, w.length - befr.length) + aftr;
                    changed = true;
                }

            }

            // break after the first change

            if(changed) {
                break;
            }

        }

    }

    return w;

}

// the conjugations

var godan_conjugations = function() {
        
    this.dict = "",
    this.stem = "u>",
    this.ta   = "nu>nda,mu>nda,bu>nda,ru>tta,u>tta,tsu>tta,ku>ita,gu>ida,su>shita",
    this.te   = "nu>nde,mu>nde,bu>nde,ru>tte,u>tte,tsu>tte,ku>ite,gu>ide,su>shite",

    this.indicative = {

        present : {
            positive : { plain : "", formal : "u>imasu" },
            negative : { plain : "u>anai", formal : "u>imasen" }
        },

        past : {
            positive : { plain : this.ta, formal : "u>imashita" },
            negative : { plain : "u>anakatta", formal : "u>imasen deshita" }
        }

    };

    this.potential = {

        present : {
            positive : { plain : "u>eru", formal : "u>emasu" },
            negative : { plain : "u>enai", formal : "u>emasen" }
        }

    }; 

    this.causative = {

        present : {
            positive : { plain : "u>aseru", formal : "u>asemasu" },
            negative : { plain : "u>asenai", formal : "u>asemasen" }
        }

    };

    this.imperative = {

        present : {
            positive : { plain : "u>e", formal : this.te+"|>kudasai" },
            negative : { plain : ">na", formal : "u>anai kudasai" }
        }

    };

    this.progressive = {

        present : {
            positive : { plain : this.te+"|>iru", formal : this.te+"|>imasu" },
            negative : { plain : "", formal : this.te+"|>imasen" }
        },

        past : {
            positive : { plain : this.te+"|>ita", formal : this.te+"|>imashita" },
            negative : { plain : "", formal : this.te+"|>imasen deshita" }
        }

    };

    this.presumptive_probable = {

        present : {
            positive : { plain : "> daro", formal : "> desho" },
            negative : { plain : "u>anai|> daro", formal : "u>anai|> desho" }
        },

        past : {
            positive : { plain : this.ta+"|> daro", formal : this.ta+"|> desho"},
            negative : { plain : "u>anakatta|> daro", formal : "u>anakatta|> desho" }
        }

    };

	this.presumptive_intent = {

        present : {
            positive : { plain : "u>o", formal : "u>masho" }
        }

    };

};

var ichidan_conjugations = function() {
        
    this.dict = "",
    this.stem = "ru>",
    this.ta   = "ru>ta",
    this.te   = "ru>te",

    this.indicative = {

        present : {
            positive : { plain : "", formal : "ru>masu" },
            negative : { plain : "ru>nai", formal : "ru>masen" }
        },

        past : {
            positive : { plain : "ru>ta", formal : "ru>mashita" },
            negative : { plain : "ru>nakatta", formal : "ru>masen deshita" }
        }

    };

    this.potential = {

        present : {
            positive : { plain : "ru>rareru", formal : "ru>raremasu" },
            negative : { plain : "ru>rarenai", formal : "ru>raremasen" }
        }

    }; 

    this.causative = {

        present : {
            positive : { plain : "ru>saseru", formal : "ru>sasemasu" },
            negative : { plain : "ru>sasenai", formal : "ru>sasemasen" }
        }

    };

    this.imperative = {

        present : {
            positive : { plain : "ru>ro", formal : "ru>te|>kudasai" },
            negative : { plain : ">na", formal : "ru>nai|>de kudasai" }
        }

    };

    this.progressive = {

        present : {
            positive : { plain : "ru>te|>iru", formal : "ru>te|>imasu" },
            negative : { plain : "", formal : "ru>te|>imasen" }
        },

        past : {
            positive : { plain : "ru>te|>ita", formal : "ru>te|>imashita" },
            negative : { plain : "", formal : "ru>te|>imasen deshita" }
        }

    };

    this.presumptive_probable = {

        present : {
            positive : { plain : "> daro", formal : "ru>nai daro" },
            negative : { plain : "> desho", formal : "ru>nai desho" }
        },

        past : {
            positive : { plain : "ru>ta|> daro", formal : "ru>ta|> desho" },
            negative : { plain : "ru>nakatta|> daro", formal : "ru>nakatta|> desho" }
        }

    };

    this.presumptive_intent = {

        present : {
            positive : { plain : "ru>yo", formal : "ru> masho" }
        }

    };

};

var ConjugationService = function() {

    var data = [[
        {
            item : "HODOR?",
            question : "What's that hodor?",
            answers : ["HODOR", "HODOR", "HODOR"],
            explanation : "HODOR",
            example : "HODOR"
        }, {
            item : "BRODOR?",
            question : "What's that brodor?",
            answers : ["BRODOR"],
            explanation : "BRODOR",
            example : "BRODOR"
        }
    ]];

    return {

    	godan_conjugations : new godan_conjugations(),
        ichidan_conjugations : new ichidan_conjugations(),

    	conjugate : function(w, c) {
    		return T(w, c);
    	},

        all : function() {
            return data;
        },

        get : function(slideNumber) {
            return data[slideNumber];
        }
    };

};

angular.module("app.sources").factory("ConjugationService", ConjugationService);

module.exports = ConjugationService;
