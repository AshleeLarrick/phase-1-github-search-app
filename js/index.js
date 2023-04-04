document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementsByName("submit")[0];
    submitBtn.addEventListener("click", click)
});

function click(event) {
    event.preventDefault()
    const searchText = document.getElementById("search").value
    const userURL = "https://api.github.com/search/users?q=" + searchText
    fetch(userURL)
    .then(response => response.json())
    .then(data => renderList(data))
}

function renderList(data) {
    for (const item of data.items) {
        const li = document.createElement("li") 
        li.id = item.login
        li.innerHTML = item.login + "," + item.url
        li.addEventListener('click', getRepos)
        const userList = document.getElementById("user-list")
        userList.appendChild(li)
    }
}

function getRepos(event) {
    const repoUrl = "https://api.github.com/users/" + event.target.id + "/repos"
    fetch(repoUrl)
    .then(response => response.json())
    .then(data => renderRepos(data))
}

function renderRepos(data) {
    const repoList = document.getElementById("repos-list")
    while (repoList.firstChild) {
        repoList.removeChild(repoList.firstChild);
    }
    for (const item of data) {
        const li = document.createElement("li") 
        li.innerHTML = item.name + "," + item.id
        const repoList = document.getElementById("repos-list")
        repoList.appendChild(li)
    }
}