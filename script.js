// Sistema de contador
let count = localStorage.getItem('animePowerCount') || 0;
const button = document.getElementById("animePower");
const countDisplay = document.getElementById("clickCount");
countDisplay.textContent = count;

// Efecto de partículas
button.addEventListener("click", (e) => {
    count++;
    countDisplay.textContent = count;
    localStorage.setItem('animePowerCount', count);
    
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

// Animación de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes particleAnim {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: translateY(-40px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Widget de Twitter
const twitterWidget = document.querySelector('.twitter-widget');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100 && currentScroll > lastScroll) {
        twitterWidget.classList.add('visible');
    } else if (currentScroll < 50) {
        twitterWidget.classList.remove('visible');
    }
    lastScroll = currentScroll;
});

// Inicializar transición después de carga
setTimeout(() => {
    twitterWidget.style.transition = 'right 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
}, 1000);

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
