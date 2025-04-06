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

    it('returns parses simple expression', () => {
        const tokens = tokenize("(add 2)");
        const result = parse(tokens);

        expect(result).toEqual(List(
             [{
                 method: "add",
                 parameters: List<Node>([2]) }]
        ));
    });

    it('returns parses expression with two arguments', () => {
        const tokens = tokenize("(add 2 3)");
        const result = parse(tokens);

        expect(result).toEqual(List(
             [{
                 method: "add",
                 parameters: List<Node>([2, 3]) }]
        ));
    });
})