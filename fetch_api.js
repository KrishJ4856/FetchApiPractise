const getText = document.querySelector("#getText");
const getUsers = document.querySelector("#getUsers");
const getPosts = document.querySelector("#getPosts");
const output = document.querySelector("#output");
const addPostBtn = document.querySelector("#addPostBtn");

getText.addEventListener("click", getTextFunc)
getUsers.addEventListener("click", getUsersFunc)
getPosts.addEventListener("click", getPostsFunc)
addPostBtn.addEventListener("click", addPost)

function getTextFunc(){
    fetch("demo.txt")
    .then((res) => {
        return res.text()
    })
    .then((data) => {
        output.innerHTML = data;
    })
    .catch((error) => console.log(error))
}

function getUsersFunc(){
    let outputDisplay = `<h2>Users</h2>`;
    fetch("demo.json")
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        data.forEach((user) => {
            outputDisplay +=
            `<ul>
            <li> Name: ${user.name} </li>
            <li> ID: ${user.id} </li>
           <li> Email: ${user.email} </li>
            </ul>`
        })
        output.innerHTML = outputDisplay;
    })
    .catch((error) => console.log(error))
}

function getPostsFunc(){
    let outputDisplay = ``;
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((post) => {
            outputDisplay += 
            `<div style="border: 2px solid black; border-radius: 10px; padding: 5px; margin: 10px">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            </div>`
        })
        output.innerHTML = outputDisplay;
    })
    .catch((error) => console.log(error))
}

function addPost(e){
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            title: title,
            body: body
        })
    })
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((error) => console.log(error))
}