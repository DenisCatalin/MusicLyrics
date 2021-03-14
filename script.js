const mainDiv = document.querySelector(".lyrics");
const song = document.querySelector(".song");
const artist = document.querySelector(".artist");
const submit = document.querySelector(".submit");
const error = document.querySelector(".form-wrapper p");
const loading = document.querySelector(".loading");

error.style.display = "none";
loading.style.display = "none";

submit.addEventListener("click", (e) => {
    e.preventDefault();
    if(artist.value === "" || song.value === "") {
        error.style.display = "initial";
        timer = setInterval(() => {
            clearInterval(timer);
            error.style.display = "none";
        }, 1500);
    } else {
        loading.style.display = "flex";
        searchLyrics(artist.value, song.value);
        artist.value = "";
        song.value = "";
        mainDiv.innerHTML = "";
    }    
});

async function searchLyrics(valueA, valueS) {
    const dataFetch = await fetch(`https://api.lyrics.ovh/v1/${valueA}/${valueS}`, {
        method: "GET",
    });
    const data = await dataFetch.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    mainDiv.innerHTML = `
        <div class="card">
            <p>${lyrics}</p>
        </div>    
    `;
    loading.style.display = "none";
}