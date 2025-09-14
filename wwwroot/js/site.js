// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); 

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message){
    let li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} says ${message}`;
})

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString())
})

document.getElementById("sendButton").addEventListener("click", function (event){
    let user = document.getElementById("userInput").value;
    let message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message).catch(function (err){
        return console.error(err.toString());
    })
    event.preventDefault()
})
