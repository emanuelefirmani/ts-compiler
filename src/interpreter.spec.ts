import {tokenize} from "./tokenizer";
import {parse} from "./parser";
import {interpret} from "./interpreter";

describe('can sum', () => {
    it('returns 42', () => {
        const ast = parse(tokenize("42")).first()!;

        expect(interpret(ast)).toEqual(42);
    });

    it('returns 5', () => {
        const ast = parse(tokenize("(add 2 3)")).first()!;

        expect(interpret(ast)).toEqual(5);
    });
})