const socket = io(); // Assuming socket.io is correctly initialized
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

// Ask for the user's name until it's provided
do {
    name = prompt('Please enter your name:');
} while (!name);

// Event listener for detecting 'Enter' key press
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

// Function to send message
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim() // Trim message to remove extra spaces
    };

    // Append message to the chat window
    appendMessage(msg, 'outgoing');

    // Send message to the server
    socket.emit('message', msg);

    // Clear the textarea after sending the message
    textarea.value = '';
}

// Function to append message to the message area
function appendMessage(msg, type) {
    let maindiv = document.createElement('div');
    let className = type;
    maindiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    maindiv.innerHTML = markup;
    messageArea.appendChild(maindiv);

    // Scroll to the bottom to show the latest message
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Listen for incoming messages from the server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
});

