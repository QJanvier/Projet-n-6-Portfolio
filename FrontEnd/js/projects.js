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

const urlCategory = "http://localhost:5678/api/categories"



const getFilters = () => {
    fetch(urlCategory)
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
            // filterBtn.forEach(event => {
            //     addEventListener("click", () => {
            //         const filtersID = event.getAttribute("filtersID")
            //         applyFilter(filtersID)
            //     })
            // })
        })
    }) 
}

getFilters()

const gallery = document.querySelector(".gallery");

// async function callCategory() {
//     const response = await fetch(urlCategory)
//     return await response.json()
// }


// async function applyFilter (filtersID) {
//     const works = await callCategory();
//         gallery.innerHTML = "";
//         resetFilter();
//         const btn = document.querySelector(`.btn${filtersID}`);
//         btn.classList.add("active");
//         const filteredWorks = works.filter(function (work) {
//             return work.category.id.toString() === filtersID;
//         });

//         for (const element of filteredWorks) {
//             const container = document.querySelector(".gallery");
//             const figureCreate = document.createElement("figure");
//             const imgCreate = document.createElement("img");
//             const captionCreate = document.createElement("figcaption");
//             imgCreate.src = work.imageUrl;
//             imgCreate.alt = work.title;
//             captionCreate.textContent = work.title;
//             figureCreate.appendChild(imgCreate);
//             figureCreate.appendChild(captionCreate);
//             container.appendChild(figureCreate);            
//         }
// }

// const resetFilter = () => {
//     const filters = document.getElementsByClassName("filters");
//     for (let i = 0; i < filters.length; i++) {
//         const child = filters[i]
//         child.classList.remove("active")
//     }
// }
