const shortenSentence = function(sentence, charCount) {
    const s = sentence.substr(0, charCount)
    const shortDesc = s.slice(0, s.lastIndexOf(" ")).concat("...")
    return shortDesc
}

const renderMovieList = function() {
    const container = document.querySelector(".movie-master");
    if (container != null) {
        const template = document.querySelector('#template-master-item')
        for (const title in movies) {
            const description = movies[title][2]
            const urlImg = movies[title][3]
            const shortDesc = shortenSentence(description, 90)

            const masterItemElement = template.content.cloneNode(true).children[0]

            const itemTitleElement = masterItemElement.querySelector("h1")
            itemTitleElement.innerHTML = title

            const itemShortDescElement = masterItemElement.querySelector("p")
            itemShortDescElement.innerHTML = shortDesc

            const img = masterItemElement.querySelector("img")
            img.src = urlImg
            img.alt = title

            const itemInputTitleElement = masterItemElement.querySelector("input")
            itemInputTitleElement.value = title

            container.appendChild(masterItemElement)
        }
    }
}

const renderMovieDetails = function() {
    const urlParams = new URLSearchParams(window.location.search)
    const title = urlParams.get("title")
    const releaseDate = movies[title][0]
    const actors = movies[title][1]
    const description = movies[title][2]
    const urlImg = movies[title][3]
    const rating = movies[title][4]
    const detailElement = document.querySelector(".movie-detail")

    const titleElement = detailElement.querySelector(".movie-detail-title")
    titleElement.innerHTML = title

    const img = detailElement.querySelector("img")
    img.src = urlImg
    img.alt = title

    const dateContainerElement = document.querySelector(".movie-detail-date")
    dateContainerElement.innerHTML = "released: ".concat(releaseDate)

    const ratingContainerElement = document.querySelector(".movie-detail-rating")
    ratingContainerElement.innerHTML = ""
    for (let i = 1; i <= 5; i++) {
        const starContainer = document.createElement("SECTION")
        if (i <= rating) {
            starContainer.innerHTML = "&#9733;"
        } else {
            starContainer.innerHTML = "&#9734;"
        }
        ratingContainerElement.appendChild(starContainer)

    }

    const actorsContainerElement = document.querySelector(".movie-detail-actors")
    actorsContainerElement.innerHTML = actors

    const descriptionContainerElement = document.querySelector(".movie-detail-description")
    descriptionContainerElement.innerHTML = description
}


window.onload = function() {
    const container = document.querySelector(".movie-detail")
    if (container != null) {
        renderMovieDetails();
    } else {
        renderMovieList();
    }
}