// Contador de Poder Anime
let count = localStorage.getItem('animePowerCount') || 0;
const button = document.getElementById("animePower");
const countDisplay = document.getElementById("clickCount");
countDisplay.textContent = count;

button.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
    localStorage.setItem('animePowerCount', count);
    
    // Efecto de partículas
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: rgba(255, 0, 0, 0.8);
            border-radius: 50%;
            left: ${event.clientX + Math.random() * 20 - 10}px;
            top: ${event.clientY + Math.random() * 20 - 10}px;
            pointer-events: none;
            animation: explode 0.8s ease-out;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
});

// Animación de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(3); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Carga el widget de Twitter
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };
    return t;
}(document, "script", "twitter-wjs"));
