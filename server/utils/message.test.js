const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {

    it('should generate the correct location message object', () => {
        const from = 'bob';
        const latitude = 17;
        const longitude = -78;

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const locationMessage = generateLocationMessage(from, latitude, longitude);

        expect(locationMessage).toInclude({from, url});
        expect(locationMessage.createdAt).toBeA('number');
    })
});
