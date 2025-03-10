// Sistema de contador mejorado
let count = localStorage.getItem('animePowerCount') || 0;
const button = document.getElementById("animePower");
const countDisplay = document.getElementById("clickCount");
countDisplay.textContent = count;

// Efectos de partículas al hacer clic
button.addEventListener("click", (e) => {
    count++;
    countDisplay.textContent = count;
    localStorage.setItem('animePowerCount', count);
    
    // Crear partículas
    for(let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            background: hsl(${Math.random() * 360}, 100%, 50%);
            border-radius: 50%;
            left: ${e.clientX + (Math.random() - 0.5) * 50}px;
            top: ${e.clientY + (Math.random() - 0.5) * 50}px;
            pointer-events: none;
            animation: explode ${0.5 + Math.random() * 0.5}s ease-out;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
});

// Animaciones CSS dinámicas
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
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
