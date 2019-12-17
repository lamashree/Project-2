console.log("this is working")
var io = require('socket.io-client');

var socket = io("http://localhost:3000")
var messageForm = document.getElementById("sent-container")
var messageInput = document.getElementById("messages-input")
messageContainer = document.getElementById("messages-container")
var name = prompt("what is your name?")
appendMessage("you joined")


socket.emit("new user")

socket.on("chat-messages", data => {
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on("user-connected", data => {
    appendMessage(`${name} connected`)
});
socket.on("user-disconnected", data => {
    appendMessage(`${name} disconnected`)
});



messageForm.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`you: ${message}`)
    socket.emit("sent-chat-message", message)
    messageInput.value =" "

})
function appendMessage(message){
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageContainer.append(messageElement)
}