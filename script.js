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

// JavaScript Actualizado
const TWITTER_API_KEY = 'blh1UlJRcDEtbjhXVzZCYUlxUnU6MTpjaQ';
const TWITTER_USER_ID = 'cobsonp'; // Reemplazar con tu usuario

class TwitterWidget {
    constructor() {
        this.container = document.querySelector('.tweet-content');
        this.tweets = [];
        this.currentIndex = 0;
        this.init();
    }

    async init() {
        await this.fetchTweets();
        setInterval(() => this.showNextTweet(), 5000);
    }

    async fetchTweets() {
        try {
            const response = await fetch(
                `https://api.twitter.com/2/users/by/username/${TWITTER_USER_ID}`, {
                headers: { Authorization: `Bearer ${TWITTER_API_KEY}` }
            });
            
            const userData = await response.json();
            const userId = userData.data.id;

            const tweetsResponse = await fetch(
                `https://api.twitter.com/2/users/${userId}/tweets?max_results=50&exclude=retweets,replies`, {
                headers: { Authorization: `Bearer ${TWITTER_API_KEY}` }
            });

            const tweetsData = await tweetsResponse.json();
            this.tweets = tweetsData.data || [];
            this.showNextTweet();

        } catch (error) {
            console.error('Error fetching tweets:', error);
            this.container.innerHTML = '<div class="error">Error cargando tweets</div>';
        }
    }

    showNextTweet() {
        if (this.tweets.length === 0) return;

        this.currentIndex = Math.floor(Math.random() * this.tweets.length);
        const tweet = this.tweets[this.currentIndex];
        
        this.container.innerHTML = `
            <div class="tweet">
                <div class="tweet-text">${this.formatTweetText(tweet.text)}</div>
                <div class="tweet-time">${this.formatDate(tweet.created_at)}</div>
            </div>
        `;
    }

    formatTweetText(text) {
        return text
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')
            .replace(/@(\w+)/g, '<a href="https://twitter.com/$1" target="_blank">@$1</a>')
            .replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1" target="_blank">#$1</a>');
    }

    formatDate(isoDate) {
        const date = new Date(isoDate);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}

// Inicializar widget
new TwitterWidget();

// Mantener el resto del código existente...

