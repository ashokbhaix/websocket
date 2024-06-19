const connectBtn = document.getElementById('connectBtn');
const sendMsgBtn = document.getElementById('sendMsgBtn');
const messagesDiv = document.getElementById('messages');
let socket;

connectBtn.addEventListener('click', () => {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
        console.log('Connected to server');
        messagesDiv.innerHTML += '<p>Connected to server</p>';
        sendMsgBtn.disabled = false;
    };

    socket.onmessage = (event) => {
        console.log(`Received from server: ${event.data}`);
        messagesDiv.innerHTML += `<p>Received from server: ${event.data}</p>`;
    };

    socket.onclose = () => {
        console.log('Disconnected from server');
        messagesDiv.innerHTML += '<p>Disconnected from server</p>';
        sendMsgBtn.disabled = true;
    };

    socket.onerror = (error) => {
        console.log(`WebSocket error: ${error}`);
        messagesDiv.innerHTML += `<p>WebSocket error: ${error}</p>`;
    };
});

sendMsgBtn.addEventListener('click', () => {
    const message = 'Hello, server!';
    console.log(`Sending: ${message}`);
    messagesDiv.innerHTML += `<p>Sending: ${message}</p>`;
    socket.send(message);
});
