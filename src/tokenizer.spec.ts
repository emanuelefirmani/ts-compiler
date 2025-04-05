import {getClosedBracket, getOpenBracket, getVariable, tokenize} from "./tokenizer";
import {List} from "immutable";

describe('tokenizer', () => {
    it('tokenizes (add 2 3)', () => {
        const result = tokenize("(add 2 3)");
        expect(result).toStrictEqual(List([getOpenBracket(), getVariable("add"), 2, 3, getClosedBracket()]));
    });

    it('tokenizes (sub 7 (add 2 3))', () => {
        var result = tokenize("(sub 7.1 (add 2 3 what23 12))");
        expect(result).toStrictEqual(List([
            getOpenBracket(),
            getVariable("sub"),
            7.1,
            getOpenBracket(),
            getVariable("add"),
            2,
            3,
            getVariable("what23"),
            12,
            getClosedBracket(),
            getClosedBracket()]));
    });

    it('throws', () => {
        expect(() => tokenize("23add")).toThrow();
    });
});
