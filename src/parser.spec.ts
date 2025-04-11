import {parse, Node} from "./parser";
import {List} from "immutable";
import {tokenize} from "./tokenizer";

describe('parser', () => {
    it('returns empty list', () => {
        const tokens = tokenize("");
        const result = parse(tokens);
        expect(result.size).toEqual(0);
    });

    it('returns a number', () => {
        const tokens = tokenize("42");
        const result = parse(tokens);
        expect(result.last()).toEqual(42);
    });

    it('parses simple expression', () => {
        const tokens = tokenize("(add 2)");
        const result = parse(tokens);

        expect(result).toStrictEqual(List(
             [{
                 method: "add",
                 parameters: List<Node>([2]) }]
        ));
    });

    it('parses expression with two arguments', () => {
        const tokens = tokenize("(add 2 3)");
        const result = parse(tokens);

        expect(result).toStrictEqual(List(
             [{
                 method: "add",
                 parameters: List<Node>([2, 3]) }]
        ));
    });

    it('parses complex expression', () => {
        const tokens = tokenize("(add 1 (sub 2 3) (mul (go 4 5) 6))");
        const result = parse(tokens);

        expect(result).toStrictEqual(List(
             [{
                 method: "add",
                 parameters: List<Node>([
                     1,
                     {
                         method: "sub",
                         parameters: List<Node>([2, 3])
                     },
                     {
                         method: "mul",
                         parameters: List<Node>([
                             {
                                 method: "go",
                                 parameters: List<Node>([4, 5])
                             },
                             6
                             ])
                     }
                 ]) }]
        ));
    });

    it('throws on missing closing bracket', () => {
        const tokens = tokenize("(ok 1 2 (add 2 3)");
        expect(() => parse(tokens)).toThrow(/An expression is missing a closing bracket.*2,3/);
    });
})