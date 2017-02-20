var expect = require('chai').expect;

describe('websocket', () => {
    var BeamSocket = require('../../lib/ws');
    var Client = require('../../');
    var Password = require('../../lib/providers/password');
    var ChatService = require('../../lib/services/chat');
    var socket;
    var body;

    beforeEach(() => {
        var client = new Client();
        client.setUrl('http://localhost:1337/api/v1');
        return client.auth(new Password('Sibyl53', 'password'))
        .then(() => client.use(ChatService).join(2))
        .then(res => {
            socket = new BeamSocket(res.body.endpoints);
            body = res.body;
            socket.boot();
        })
    });

    afterEach(() => {
        socket.close();
    });

    it('authenticates with chat', () => {
        return socket.call('auth', [2, 2, body.authkey])
        .then(data => {
            expect(data).to.deep.equal({ authenticated: true, role: 'Owner' });
        });
    });
});
