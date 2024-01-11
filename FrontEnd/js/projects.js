const url = "http://localhost:5678/api/works"


const getWorks = () => {
    fetch(url)
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
                captionCreate.textContent = work.title;
                figureCreate.appendChild(imgCreate);
                figureCreate.appendChild(captionCreate);
                container.appendChild(figureCreate);


            })
        })
}

getWorks()