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

// script.js - Versión corregida
const API_KEY = 'sdWKZzFEWBkOZ2xyKiqDBqvbo';
const API_SECRET = 'UyBN0jSozNeOlSWeYmzVuIwQnDkO6zx1nOmFJhmGMHNytNQ8vs';
const ACCESS_TOKEN = '1819694778348716032-LDDEeIaLN2OQayJHoRvT1EDTWPfkF6';
const ACCESS_SECRET = 'MR3FzWkQHncNKoLazJH19MYNRebymYlYXQqHkaJJdDZPI';

class TwitterWidget {
    constructor() {
        this.tweets = [];
        this.container = document.querySelector('.tweet-content');
        this.init();
    }

    async init() {
        try {
            const userId = await this.getUserId('cobsonp');
            await this.getTweets(userId);
            this.showRandomTweet();
            setInterval(() => this.showRandomTweet(), 5000);
        } catch (error) {
            this.container.innerHTML = '<div class="error">Error cargando tweets</div>';
            console.error('Error:', error);
        }
    }

    async getUserId(username) {
        const authHeader = this.getOAuthHeader(
            'GET', 
            `https://api.twitter.com/2/users/by/username/${username}`
        );

        const response = await fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: { Authorization: authHeader }
        });

        if (!response.ok) throw new Error('Error obteniendo ID de usuario');
        const data = await response.json();
        return data.data.id;
    }

    async getTweets(userId) {
        const authHeader = this.getOAuthHeader(
            'GET',
            `https://api.twitter.com/2/users/${userId}/tweets?max_results=50&exclude=retweets,replies&tweet.fields=created_at`
        );

        const response = await fetch(
            `https://api.twitter.com/2/users/${userId}/tweets?max_results=50&exclude=retweets,replies&tweet.fields=created_at`, {
            headers: { Authorization: authHeader }
        });

        if (!response.ok) throw new Error('Error obteniendo tweets');
        const data = await response.json();
        this.tweets = data.data || [];
    }

    getOAuthHeader(method, url) {
        const oauth = {
            oauth_consumer_key: API_KEY,
            oauth_nonce: Math.random().toString(36).substring(2),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: Math.floor(Date.now() / 1000),
            oauth_token: ACCESS_TOKEN,
            oauth_version: '1.0'
        };

        const params = new URLSearchParams(url.split('?')[1]);
        const allParams = { ...Object.fromEntries(params), ...oauth };
        const sortedParams = Object.keys(allParams).sort().map(k => `${k}=${allParams[k]}`).join('&');
        const baseString = `${method}&${encodeURIComponent(url.split('?')[0])}&${encodeURIComponent(sortedParams)}`;
        
        const signingKey = `${encodeURIComponent(API_SECRET)}&${encodeURIComponent(ACCESS_SECRET)}`;
        oauth.oauth_signature = btoa(String.fromCharCode(...new Uint8Array(
            await crypto.subtle.digest('SHA-1', new TextEncoder().encode(baseString, signingKey))
        )));

        return `OAuth ${Object.entries(oauth).map(([k,v])=>`${k}="${encodeURIComponent(v)}"`).join(', ')}`;
    }

    showRandomTweet() {
        if (this.tweets.length === 0) return;
        
        const tweet = this.tweets[Math.floor(Math.random() * this.tweets.length)];
        this.container.innerHTML = `
            <div class="tweet">
                <div class="tweet-text">${this.formatTweet(tweet.text)}</div>
                <div class="tweet-date">${new Date(tweet.created_at).toLocaleDateString('es-ES')}</div>
            </div>
        `;
    }

    formatTweet(text) {
        return text
            .replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank">🔗 Enlace</a>')
            .replace(/@(\w+)/g, '<a href="https://twitter.com/$1" target="_blank">@$1</a>')
            .replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1" target="_blank">#$1</a>');
    }
}

// Inicialización
new TwitterWidget();

// Mantener el resto del código del contador...
