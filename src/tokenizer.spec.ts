import {getCloseBracket, getOpenBracket, getAtom, tokenize} from "./tokenizer";
import {List} from "immutable";

describe('tokenizer', () => {
    it('tokenizes (add 2 3)', () => {
        const result = tokenize("(add 2 3)");
        expect(result).toStrictEqual(List([getOpenBracket(), getAtom("add"), 2, 3, getCloseBracket()]));
    });

    it('tokenizes (sub 7 (add 2 3))', () => {
        var result = tokenize("(sub 7.1 (add 2 3 what23 12))");
        expect(result).toStrictEqual(List([
            getOpenBracket(),
            getAtom("sub"),
            7.1,
            getOpenBracket(),
            getAtom("add"),
            2,
            3,
            getAtom("what23"),
            12,
            getCloseBracket(),
            getCloseBracket()]));
    });

    it('throws', () => {
        expect(() => tokenize("23add")).toThrow();
    });
});
