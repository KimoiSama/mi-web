// script.js
let count = localStorage.getItem('animePowerCount') || 0;
const button = document.getElementById("animePower");
const countDisplay = document.getElementById("clickCount");
countDisplay.textContent = count;

button.addEventListener("click", (e) => {
    count++;
    countDisplay.textContent = count;
    localStorage.setItem('animePowerCount', count);
    
    // Efecto de partículas mejorado
    const particles = 8;
    for(let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 4}px;
            height: ${Math.random() * 4 + 4}px;
            background: var(--primary);
            border-radius: 50%;
            left: ${e.clientX + (Math.random() - 0.5) * 30}px;
            top: ${e.clientY + (Math.random() - 0.5) * 30}px;
            pointer-events: none;
            animation: particleAnim 0.8s ease-out;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
});

// Animación CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particleAnim {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: translateY(-40px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar Twitter
window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    return t;
}(document, "script", "twitter-wjs"));
