const socket = io();
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const blooketToggle = document.getElementById('blooket-toggle');

let blooketMode = false;

sendBtn.addEventListener('click', () => {
    const msg = chatInput.value;
    if (!msg) return;
    socket.send(msg);
    chatInput.value = '';
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

socket.on('message', (msg) => {
    const msgElem = document.createElement('div');
    msgElem.textContent = msg;
    if (blooketMode) msgElem.style.color = '#ffea00'; // Gold for Blooket mode
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
});

blooketToggle.addEventListener('click', () => {
    blooketMode = !blooketMode;
    alert('Blooket mode ' + (blooketMode ? 'ON' : 'OFF'));
});
