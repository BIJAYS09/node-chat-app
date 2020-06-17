var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var from = "hello";
        var text = "Hello World";
        var message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage',()=>{
    it('should generater current location object',()=>{
        var from = "hello";
        var latitude = 10;
        var longitude = 13;
        var url = `https://www.google.com/maps?q=10,13`;
        var message = generateLocationMessage(from,latitude,longitude);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});