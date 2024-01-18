const urlCategory = "http://localhost:5678/api/categories";
const urlWorks = "http://localhost:5678/api/works";


async function callCategory() {
    const response = await fetch(urlCategory)
    return await response.json()
}

async function callWorks() {
    const response = await fetch(urlWorks)
    return await response.json()
}


/*Get projects*/

const gallery = document.querySelector(".gallery");

const getWorks = () => {
    fetch(urlWorks)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            data.forEach(work => {/*insert images*/
                const container = document.querySelector(".gallery");
                const figureCreate = document.createElement("figure");
                const imgCreate = document.createElement("img");
                const captionCreate = document.createElement("figcaption");
                imgCreate.src = work.imageUrl;
                imgCreate.alt = work.title;
                captionCreate.textContent = work.title;
                figureCreate.appendChild(imgCreate);
                figureCreate.appendChild(captionCreate);
                container.appendChild(figureCreate);
            })
        })
}

getWorks()


/*Get filters*/

async function getFilters() {
    const category = await callCategory()
    for (let i=0; i < category.length; i++) {/*insert filters*/
        const filters = category[i];
        const container = document.querySelector(".filters");
        const allFilters = document.createElement("button");
        allFilters.classList =`filterbtn btn${filters.id}`;
        allFilters.setAttribute("id", filters.id);
        allFilters.innerHTML=`${filters.name}`;
        container.appendChild(allFilters);

    }
}

/*sorti de la fonction le temps de trouver comment résoudre le ciblage des boutons L84*/
const filterBtn = document.querySelectorAll(".filterbtn") /*filter*/
filterBtn.forEach(event => {
    addEventListener("click", () => {
        const filtersID = event.getAttribute("id")
        applyFilter(filtersID)
    })
})

getFilters()

const btnAll = document.querySelector('.btnAll')/*filter All*/
btnAll.addEventListener("click", () => {
    gallery.innerHTML=""
    resetFilter()
    btnAll.classList.add("active")
    getWorks()
})

async function applyFilter (filtersID) {
    const works = await callWorks();
        gallery.innerHTML = "";
        resetFilter();
        const btn = document.querySelector(`.btn${filtersID}`);/*ciblage a gerer pour faire fonctionner les filtres */
        console.log(btn)
        btn.classList.add("active");
        const filteredWorks = works.filter(function (work) {
            return work.category.id.toString() === filtersID;
        });

        for (const element of filteredWorks) {
            const figure = document.createElement("figure");
            figure.innerHTML=`
            <img src="${element.imageUrl}" alt="${element.title}"
            <figcaption>${element.title}</figcaption>`;
            gallery.appendChild(figure);  
        }
}

/*off active class*/ 
const resetFilter = () => {
    const filters = document.getElementsByClassName("filters");
    for (let i = 0; i < filters.length; i++) {
        const child = filters[i]
        child.classList.remove("active")
    }
}
