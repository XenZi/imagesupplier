const auth = "QT4wR0GiwG3xpf_YT-vPuiCc7xNr1Bi90H0pJ8qk29Q";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const inputForm = document.querySelector(".input-form");
let loadMore = document.querySelector(".btn-more")
let searchValue;
let fetchLink;
let nrPage = 1;
// Event Listeners

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchValue = searchInput.value;
    searchPhotos(searchValue);
    console.log(searchValue);
});
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitButton.click();
});
loadMore.addEventListener("click", more);
curatedPhotos();
// Functions
function generatePictures(data) {
    data.forEach((picture) => {
        const imageGallery = document.createElement("div");
        imageGallery.classList.add("col-12","col-md-4", "gallery-image", "p-3");
        imageGallery.innerHTML = 
        `
        <div class="picture-info">
            <a href="${picture.links.download}" target="_blank">Download</a>
            <a href="${picture.user.links.html}" target="_blank">${picture.user.first_name}</a>
        </div>
        <img src="${picture.urls.regular}" class="img-responsive" height="350" alt="">
        </div>
        `
        gallery.appendChild(imageGallery);
    })
}
async function curatedPhotos() {
    fetchLink = "https://api.unsplash.com/photos/?client_id=QT4wR0GiwG3xpf_YT-vPuiCc7xNr1Bi90H0pJ8qk29Q&per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}
async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}
async function searchPhotos(searchValue) {
    galleryClear();
    fetchLink = `https://api.unsplash.com/search/photos?query=${searchValue}&client_id=QT4wR0GiwG3xpf_YT-vPuiCc7xNr1Bi90H0pJ8qk29Q&per_page=15`;
    const data = await fetchApi(fetchLink);
    console.log(data);
    generatePictures(data.results);
    galleryChildren();
}
function galleryClear() {
    gallery.innerHTML = "";
}
async function more() {
    nrPage++;
    if(searchValue) {
        fetchLink = `https://api.unsplash.com/search/photos?query=${searchValue}&client_id=QT4wR0GiwG3xpf_YT-vPuiCc7xNr1Bi90H0pJ8qk29Q&per_page=15&page=${nrPage}`;
        const data = await fetchApi(fetchLink);
        generatePictures(data.results);
    }
    else {
        fetchLink = `https://api.unsplash.com/photos/?client_id=QT4wR0GiwG3xpf_YT-vPuiCc7xNr1Bi90H0pJ8qk29Q&per_page=15&page=${nrPage}`;
        const data = await fetchApi(fetchLink);
        generatePictures(data);
    }
}
function galleryChildren() {
    if(gallery.childElementCount > 0) {
        return;
    }
    else {
        const childErrorDiv = document.createElement("div");
        childErrorDiv.classList.add("col-12", "text-center");
        childErrorDiv.innerHTML = `
            <h3 class="error-message">Invalid Search. Try with a different keywords!</h3>
        `
        gallery.appendChild(childErrorDiv);
    }
}