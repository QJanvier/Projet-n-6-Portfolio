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
    const container = document.querySelector(".filters");
    category.forEach(filters => {
    const allFilters = document.createElement("button");
    allFilters.classList = `filterbtn btn btn${filters.id}`;
    allFilters.setAttribute("id", filters.id);
    allFilters.innerHTML = filters.name;
    container.appendChild(allFilters); 

        allFilters.addEventListener("click", () => {
        const filtersID = filters.id;
        applyFilter(filtersID);
        });
    });
}

getFilters()

const btnAll = document.querySelector('.btnAll')/*filter All*/

btnAll.addEventListener("click", (event) => {
    gallery.innerHTML=""
    resetFilter();
    btnAll.classList.add("active")
    btnAll.classList.remove("btn")
    getWorks();
})

async function applyFilter (filtersID) {
    const works = await callWorks();
        gallery.innerHTML = "";
        resetFilter();
        const btn = document.querySelector(`.btn${filtersID}`);
        btn.classList.add("active");
        btn.classList.remove("btn");
        const filteredWorks = works.filter(function (work) {
            return work.categoryId === filtersID;
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
async function resetFilter () {
    const child = document.querySelectorAll('.filterbtn');
    child.forEach(element => {
        element.classList.remove("active"); 
        element.classList.add("btn")
    });    
}
