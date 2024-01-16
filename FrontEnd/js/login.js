const url = "http://localhost:5678/api"

const username = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const form = document.getElementsByClassName('.login');
const error = document.getElementById('error');

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = {
        email: username.value,
        password: password.value,
    }
    const payload = JSON.stringify(data)

    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: payload,
    })

    if (loginResponse.status==200) {
        const loginResponseJSON = await loginResponse.json()
        const token = loginResponseJSON.token
        const userId = loginResponseJSON.userId
        const userToken = {
            user:`${userId}`,
            token:`${token}`
        }
        const userTokenValue = JSON.stringify(userToken)
        window.localStorage.setItem("userToken",userTokenValue)
        window.location.href="index.html"
    }
    else if (loginResponse.status==404) {
        error.innerText="ERREUR aucun utilisateur trouvé"
    }
    else if (loginResponse.status==401) {
        error.innerHTML="ERREUR mot de passe incorrecte"
    }
})
