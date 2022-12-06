const registerButton = document.querySelector('#btn-register')
const getUsersButton = document.querySelector('#get-users')
const usersParaph = document.querySelector('p')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

let users = []

registerButton.onclick = (e) =>{
    e.preventDefault()
    newUser = {
        username: username.value,
        email: email.value,
        password: password.value,
        picture : " "
    }
    console.log(newUser)
    fetch('http://localhost:9000', {
        method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
        body: JSON.stringify(newUser)
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}



getUsersButton.onclick = async(e) =>{
    usersParaph.innerHTML = ""
    e.preventDefault()
    fetch('http://localhost:9000')
        .then(res => res.json())
        .then(data => users = data)
        .then(renderUsers())   
}


function renderUsers(){
    users.forEach( (user) =>{
        let userCard = document.createElement('div')
        let userName = document.createElement('span')
        let userStatus = document.createElement('span')
        let updateBtn = document.createElement('button')
        let userId = document.createElement('span')
        userName.textContent = user.username
        userStatus.textContent = `Premium : ${user.premium}`
        if(user.premium === false){
        updateBtn.setAttribute('id', 'update-user')
        updateBtn.textContent = "Avanzar a Premium"
        }
        userId.textContent = user._id
        userCard.appendChild(userName)
        userCard.appendChild(userStatus)
        user.premium === false && userCard.appendChild(updateBtn)
        userCard.appendChild(userId)
        userCard.setAttribute('class', 'user-card')
        usersParaph.appendChild(userCard)
        updateBtn.onclick = (e) => {updateUser(e)}
  })
}


function updateUser(e){
    const id = e.target.parentElement.lastChild.textContent

    const updateBtn = document.createElement('button')
    updateBtn.textContent = "Subir"
    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'file')
    e.target.parentElement.appendChild(imageInput)
    e.target.parentElement.appendChild(updateBtn)

    updateBtn.onclick = (e) => {e.preventDefault(); uploadImage(id, imageInput)}
}

function uploadImage(id, file){
    const formData  = new FormData();   
    formData.append("img", file.files[0])

    fetch(`http://localhost:9000/${id}`, {
        method: 'PATCH',
        body: formData
      })
}
