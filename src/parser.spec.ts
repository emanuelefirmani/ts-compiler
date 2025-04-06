import {parse} from "./parser";
import {List} from "immutable";
import {tokenize} from "./tokenizer";

describe('parser', () => {
    it('returns empty list', () => {
        var tokens = tokenize("");
        var result = parse(tokens);
        expect(result.size).toEqual(0);
    });

    it('returns a number', () => {
        var tokens = tokenize("42");
        var result = parse(tokens);
        expect(result.last()).toEqual(42);
    });
})