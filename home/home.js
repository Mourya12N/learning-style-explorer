
/* Home page navigation */
document.querySelector('[data-action="open-login"]').addEventListener("click", () => {
    window.location.href = "../login/login.html";
});

document.querySelector('[data-action="start-quiz"]').addEventListener("click", () => {
    window.location.href = "../instructions/instructions.html";
});

/* Match Home illustrations to the selected theme */
const themes = [
    "summer-drift",
    "autumn-glow",
    "forest-breeze",
    "midnight-mist",
    "tropical-sunset",
    "earthy-harvest"
];

const currentTheme = document.body.dataset.theme || "summer-drift";

const selectedTheme = themes.includes(currentTheme)
    ? currentTheme
    : "summer-drift";

/* Update decorative images */
const illustrations = [
    "graduation-girl",
    "decorative-squares",
    "decorative-squares-small",
    "decorative-circles"
];

illustrations.forEach((name) => {
    const image = document.querySelector(`.${name}`);

    if (image) {
        image.src = `assets/${name}-${selectedTheme}.svg`;
    }
});
