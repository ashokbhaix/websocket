const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket, request) => {
    console.log('Client connected');

    // Accessing WebSocket headers
    const secWebSocketKey = request.headers['sec-websocket-key'];
    const secWebSocketProtocol = request.headers['sec-websocket-protocol'];
    const secWebSocketVersion = request.headers['sec-websocket-version'];

    console.log(`Sec-WebSocket-Key: ${secWebSocketKey}`);
    console.log(`Sec-WebSocket-Protocol: ${secWebSocketProtocol}`);
    console.log(`Sec-WebSocket-Version: ${secWebSocketVersion}`);

    socket.on('message', message => {
        console.log(`Received: ${message}`);
        socket.send(`Echo: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    socket.on('error', error => {
        console.error(`WebSocket error: ${error}`);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
