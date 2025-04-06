import {parse} from "./parser";
import {List} from "immutable";

describe('parser', () => {
    it('returns true', () => {
       var result = parse(List());
       expect(result).toEqual(true);
    });
})