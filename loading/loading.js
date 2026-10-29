
/* Match Loading decorations to the selected theme */
const loadingThemes = [
    "summer-drift",
    "autumn-glow",
    "forest-breeze",
    "midnight-mist",
    "tropical-sunset",
    "earthy-harvest"
];

const currentTheme = document.body.dataset.theme || "summer-drift";

const selectedTheme = loadingThemes.includes(currentTheme)
    ? currentTheme
    : "summer-drift";

const loadingIllustrations = {
    ".loading-squares-large": "decorative-squares-large-loading",
    ".loading-squares": "decorative-squares-loading",
    ".loading-squares-small": "decorative-squares-small-loading"
};

Object.entries(loadingIllustrations).forEach(([selector, name]) => {
    const image = document.querySelector(selector);

    if (image) {
        image.src = `assets/${name}-${selectedTheme}.svg`;
    }
});

/* Loading elements */
const progressBar = document.querySelector(".loading-progress-bar");
const progressFill = document.querySelector(".loading-progress-fill");
const progressText = document.querySelector(".loading-percentage");

/* Check that quiz results exist */
const quizScores = sessionStorage.getItem("quizScores");

if (!quizScores) {
    window.location.replace("../quiz/quiz.html");
} else {
    /* Start progress */
    let percentage = 0;

    progressFill.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");
    progressText.textContent = "Loading... 0%";

    const loadingInterval = setInterval(() => {
        percentage = Math.min(percentage + 2, 100);

        progressFill.style.width = `${percentage}%`;
        progressBar.setAttribute("aria-valuenow", percentage);
        progressText.textContent = `Loading... ${percentage}%`;

        /* Open Results when complete */
        if (percentage === 100) {
            clearInterval(loadingInterval);
            window.location.replace("../results/results.html");
        }
    }, 50);
}
