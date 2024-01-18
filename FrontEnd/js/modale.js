const urlModalWork = "http://localhost:5678/api/works"

async function callWork(){
    const response = await fetch(urlModalWork)
    return await response.json();
}


/*Call modals*/
const dialog = document.getElementById("modal")
const editionBtn = document.getElementById("editionBtn")
const btnAddPhoto = document.getElementById("btnAddPhoto")
const addModal = document.getElementById("addModal")

editionBtn.addEventListener("click",function() {
    dialog.showModal()
    getWorksModal()

});

btnAddPhoto.addEventListener("click", function() {
    addModal.showModal()
});


/*return modal */
const returnModal = document.getElementById("return")

returnModal.addEventListener("click", function() {
    dialog.showModal()
    addModal.close()
    getWorksModal()
})


/*Close modal*/
const btnClose = document.querySelector(".close")
const btnClose1 = document.querySelector(".close1")

btnClose.addEventListener("click", function() {
    dialog.closest()
})
btnClose1.addEventListener("click", function() {
    addModal.close()
})


/*Add works to modal Gallery */
let modalWorks = []

async function getWorksModal () {
    const modalGallery = document.getElementById("modalGallery")
    modalGallery.innerHTML=""
    const modalWorks = await callWork()
    
    for(let i=0; i < modalWorks.length; i++) {
        const element = modalWorks[i]

        const works = document.createElement("figure")
        works.setAttribute("class", "modalFigure")
        works.innerHTML=`
        <div class="divTrashIcon"></div>
        <img src="${element.imageUrl}" alt="${element.title}">
        `
        modalGallery.appendChild(works)

        const trashIcon = document.createElement("a")
        trashIcon.innerHTML=`
        <i class="fa-solid fa-trash-can"></i>`
        works.appendChild(trashIcon)

        trashIcon.addEventListener("click", function() {
            if (confirm("Voulez-vous vraiment supprimer le projet ?")) {
                deleteWork(element.id)
            try {
                while (works.firstChild) {
                    works.removeChild(works.firstChild);
                }
            }

            catch {
                alert("ERROR")
            }
        }
        else {
            alert("Le projet n'a pas été supprimé")
        }
        })
        
    }
}

async function deleteWork (id) {
    if (userToken !== null) {
        const jsonToken = Json.parse(userToken);
        const token = jsonToken.token;

        try {
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (response.ok) {
                console.log("Projet supprimé avec succès");
                gallery.innerHTML=""
                getWorks()/*importer la fonction depuis projects.js*/
            } else {
                console.error("Une erreur s'est produite lors de la suppresion du projet.");
            }
        } catch (error) {
            console.error ("Une erreur s'est produite :", error);
        }
    } else {
        console.log("Suppresion annulée par l'utilisateur.");
    }
}




/*Add photo*/
const form = document.getElementById("addPhotoModal")
const addedPhoto = document.getElementById("addPhoto")
const addedTitle = document.getElementById("addTitle")
const addedCategory = document.getElementById("addCategory")
const validateBtn = document.getElementById("validateBtn")

validateBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    if (addedPhoto.value !== "" && addedTitle.value !== "" && addedCategory.value !== "") {
        if (userToken !== null) {
            const jsonToken = JSON.parse(userToken)
            const token = jsonToken.token;

            if (confirm(`Voulez-vous vraiment ajouter le projet ?`)) {
                try {
                    const response = await fetch(`http://localhost:5678/api/works`, {
                        method: "POST",
                        headers: {"Autorization": `Bearer ${token}`},
                        body: new FormData(form)
                    })
                    if (response.ok) {
                        console.log("Succès")
                        form.rest()
                        imagePreview.src=""
                        imagePreview.style.display="none"
                        gallery.innerHTML=""
                        getWorks()
                } else {
                    console.log("Erreur")
                }
            } catch (error) {
                console.error("Erreur lors de la requête :", error)
            }
        }
    } else {
        alert("Veuillez remplir tous les champs");
    }
    }
});


/*change input style */
const imageInput = document.getElementById("addPhoto")
const selectFile = document.getElementById("btnSelectFile")
const imagePreview = document.getElementById("selectedFile")

selectFile.addEventListener("click", function(event) {
    event.preventDefault()
    imageInput.click()
})

imageInput.addEventListener("change", function() {
    const selectedFile = imageInput.files[0]
    if(selectedFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = "block"
        }
        reader.readAsDataURL(selectedFile)
    }
})


