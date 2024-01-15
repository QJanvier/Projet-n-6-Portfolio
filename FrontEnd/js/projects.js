/*Get projects*/

const urlWorks = "http://localhost:5678/api/works"

const getWorks = () => {
    fetch(urlWorks)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            data.forEach(work => {
                const container = document.querySelector(".gallery");
                const figureCreate = document.createElement("figure");
                const imgCreate = document.createElement("img")
                const captionCreate = document.createElement("figcaption")
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

const urlCategorie = "http://localhost:5678/api/categories"



const getFilters = () => {
    fetch(urlCategorie)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data)
        data.forEach(filters => {
            const container = document.querySelector(".filters");
            const filterCreate = document.createElement("button");
            filterCreate.textContent = filters.name;
            filterCreate.classList=`filterbtn btn btn${filters.id}`;
            filterCreate.setAttribute("filtersID", filters.id);
            container.appendChild(filterCreate); 
            const filterBtn = document.querySelectorAll(".filterbtn");
            filterBtn.forEach(event => {
                event.addEventListener("click", () => {
                    const filtersID = event.getAttribute("filtersID")
                    .applyfilter(filtersID)
                    console.log(event)
                })
            })
        })
    }) 
}

getFilters()


const applyFilter = (filtersID) => {
    fetch(urlCategorie)
        .then(res => {
            return res.json();
        })
        gallery.innerHTML = "";
        resetFilter();
        const btn = document.querySelector(`.btn${filtersID}`);
        btn.classList.add("active");

        const filteredWorks = work.filter(function (work) {
            return work.category.id.toString() === filtersID;
        });

        for (const element of filteredWorks) {
            const container = document.querySelector(".gallery");
            const figureCreate = document.createElement("figure");
            const imgCreate = document.createElement("img")
            const captionCreate = document.createElement("figcaption")
            imgCreate.src = work.imageUrl;
            imgCreate.alt = work.title;
            captionCreate.textContent = work.title;
            figureCreate.appendChild(imgCreate);
            figureCreate.appendChild(captionCreate);
            container.appendChild(figureCreate);            
        }
}

const resetFilter = () => {
    const filters = document.getElementsByClassName("filters")
    const parent = filters.parent
    for (let i = 0; i <parent.length; i++) {
        const child = parent[i]
        child.classList.remove("active")
    }
}
