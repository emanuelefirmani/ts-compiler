import {isTrue} from "./root";

describe('Root', () => {
    it('is always true', () => {
        const result = isTrue();
        expect(result).toBe(true);
    });
})