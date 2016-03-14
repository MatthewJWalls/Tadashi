
describe("array shuffling", function() {
    
    it("has the same number of elements afterwards", function() {
        expect(shoofle([1, 2, 3, 4, 5]).length).toEqual(5);
    });
    
    it("does nothing to empty arrays", function() {
        expect(shoofle([]).length).toEqual(0);
    });

    it("does nothing to len=1 arrays", function() {
        expect(shoofle(["a"]).length).toEqual(1);
        expect(shoofle(["a"])[0]).toEqual("a");
    });
    
});

describe("ring buffer creation", function() {

    it("has the correct length", function() {

        var inp = [{num:1}, {num:2}, {num:3}];
        var out = ringify(inp);

        expect(out.length).toEqual(3);
        
    });
    
    it("has valid .next references", function() {

        var inp = [{num:1}, {num:2}, {num:3}];
        var head = ringify(inp)[0];

        expect(head.num).toEqual(1);
        expect(head.next.num).toEqual(2);
        expect(head.next.next.num).toEqual(3);
        expect(head.next.next.next.num).toEqual(1);

    });

    it("has valid last flag", function() {

        var inp = [{num:1}, {num:2}, {num:3}];
        var head = ringify(inp)[0];

        expect(head.last).toEqual(false);
        expect(head.next.last).toEqual(false);
        expect(head.next.next.last).toEqual(true);

    });    

});

describe("Question progressions", function() {

    it("iterates through the questions buffer", function() {

        var mock = [
            {question: "a", answer: "a"},
            {question: "b", answer: "b"}
        ];

        var prog = new Progression(mock);

        expect(prog.current.question).toBeDefined();
        prog.next();
        expect(prog.current.question).toBeDefined();        

    });

});
