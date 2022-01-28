const socket = io();
const sendForm = document.getElementById('sendForm');
const nameForm = document.getElementById('nameInput');

/*nameForm.addEventListener('submit', (n) => {
    n.preventDefault();

    let name = e.target.elements.nameText.value;
    socket.emit('nameInput', name);
})*/

const { name } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(name);

socket.emit('joinRoom', name);


socket.on('message', message => {
    console.log(message);
})

socket.on('receive', (msg) => {
    const element = document.createElement('div');
    element.className = "message left";
    element.innerHTML = msg;
    const msgArea = document.getElementById('msgField');
    msgArea.appendChild(element);

    //scroll down

    msgArea.scrollTop = msgArea.scrollHeight;
})

socket.on('sending', (msg) => {
    const element = document.createElement('div');
    element.className = "message right";
    element.innerHTML = msg;
    const msgArea = document.getElementById('msgField');
    msgArea.appendChild(element);
    
    //scroll down

    msgArea.scrollTop = msgArea.scrollHeight;
})

sendForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let msg = e.target.elements.msgInput.value;
    socket.emit('chatMessage', msg);

    e.target.elements.msgInput.value = '';
    e.target.elements.msgInput.focus();
})