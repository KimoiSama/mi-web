let count = 0;
const button = document.getElementById("animePower");
const countDisplay = document.getElementById("clickCount");

button.addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;
});

// Tweets randomos de la cuenta
const tweets = [
    "Tweet random 1 aquí",
    "Tweet random 2 aquí",
    "Tweet random 3 aquí",
    "Tweet random 4 aquí",
    "Tweet random 5 aquí"
];

let tweetIndex = 0;
const tweetElements = document.querySelectorAll(".tweet");

function changeTweet() {
    tweetElements.forEach((el, index) => {
        el.textContent = tweets[(tweetIndex + index) % tweets.length];
    });
    tweetIndex++;
}

setInterval(changeTweet, 5000);
changeTweet();
