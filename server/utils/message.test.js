const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        const from = 'bob';
        const text = 'This is a message';

        const message = generateMessage(from, text);

        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);
        expect(message).toInclude({from,text});
        expect(message.createdAt).toBeA('number');
    })
});
