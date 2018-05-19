const expect = require('expect');

const {isRealString} = require('./validationUtils');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        const result = isRealString(12345);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const result = isRealString('     ');
        expect(result).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const result = isRealString(' LOTR  ');
        expect(result).toBe(true);
    });
});
