const form = document.getElementById('login');
const error = document.getElementById('error');

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let email = document.getElementById('emailInput').value
    let password = document.getElementById('passwordInput').value   

    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
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
        console.log(window.localStorage.getItem("userToken"))
        window.location.href="index.html"
    }
    else if (loginResponse.status==404) {
        error.innerText="ERREUR aucun utilisateur trouvé"
    }
    else if (loginResponse.status==401) {
        error.innerHTML="ERREUR mot de passe incorrecte"
    }
})
