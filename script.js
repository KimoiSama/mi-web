// Sistema de contador avanzado
class PowerCounter {
    constructor() {
        this.count = localStorage.getItem('animePowerCount') || 0;
        this.button = document.getElementById('animePower');
        this.display = document.getElementById('clickCount');
        this.init();
    }

    init() {
        this.display.textContent = this.count;
        this.button.addEventListener('click', (e) => this.handleClick(e));
    }

    handleClick(e) {
        this.count++;
        localStorage.setItem('animePowerCount', this.count);
        this.updateDisplay();
        this.createParticles(e);
    }

    updateDisplay() {
        this.display.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], { duration: 300 });
        
        this.display.textContent = this.count;
    }

    createParticles(e) {
        const particles = 15;
        for(let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                --x: ${e.clientX}px;
                --y: ${e.clientY}px;
                --angle: ${Math.random() * 360}deg;
                --speed: ${Math.random() * 50 + 30}px;
                --color: hsl(${Math.random() * 360}, 70%, 60%);
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new PowerCounter();
    
    // Cargar widget de Twitter
    window.twttr.widgets.load();
});

// Animación de partículas CSS
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--color);
        border-radius: 50%;
        left: var(--x);
        top: var(--y);
        animation: particleAnim 1s ease-out forwards;
        pointer-events: none;
    }

    @keyframes particleAnim {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate(
                calc(var(--speed) * cos(var(--angle))),
                calc(var(--speed) * sin(var(--angle)))
            );
        }
    }
`;
document.head.appendChild(style);
