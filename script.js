let count = 0;
const button = document.getElementById("animePower");
const countDisplay = document.getElementById("clickCount");

button.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
});
// Cambiar el número de GIFs de 1 a 3 cada 3 segundos
let gifContainer = document.getElementById('gif-container');
let gifUrls = [
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGg1bG1yOHhuaDFqcTBoZ3Y1cGZqdnBrNm4yenF6cGJ0d2k5MG4xaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/k0zSFlL0vwBVWRK8sT/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGQwYm10eTlxcHh5NHc3Y2VqNGtpOWt1c2doeWp1d2FqMGZkMjVsMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SIAQookFwLMBtfV81U/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWYxNXBrcWIwd2kwZ2t0bXo2eGpmcGE0aHFhbWY2eG13Ymo0NGtxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DLso9u2jbnnu17ioK9/giphy.gif"
];

let gifIndex = 0;

function changeGifs() {
    gifContainer.innerHTML = ""; // Limpiar contenedor actual

    let numGifs = gifIndex < 3 ? 1 : 3;
    for (let i = 0; i < numGifs; i++) {
        let gif = document.createElement('img');
        gif.src = gifUrls[i];
        gif.classList.add('gif');
        gifContainer.appendChild(gif);
    }

    gifIndex = (gifIndex + 1) % 4;
}

setInterval(changeGifs, 3000);
changeGifs();  // Inicializar con 1 GIF
