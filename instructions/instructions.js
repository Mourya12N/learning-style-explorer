
/* Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../home/home.html";
    }
});

/* Start quiz */
document.querySelector(".instructions-start").addEventListener("click", () => {
    window.location.href = "../user-setup/user-setup.html";
});

/* Match Instructions illustrations to the selected theme */
const instructionsThemes = [
    "summer-drift",
    "autumn-glow",
    "forest-breeze",
    "midnight-mist",
    "tropical-sunset",
    "earthy-harvest"
];

const currentTheme = document.body.dataset.theme || "summer-drift";

const selectedTheme = instructionsThemes.includes(currentTheme)
    ? currentTheme
    : "summer-drift";

/* Update illustrations and decorative shapes */
const instructionsIllustrations = [
    "person-reading-instructions",
    "decorative-squares-instructions",
    "decorative-squares-small-instructions",
    "decorative-circle-instructions"
];

instructionsIllustrations.forEach((name) => {
    const image = document.querySelector(`.${name}`);

    if (image) {
        image.src = `assets/${name}-${selectedTheme}.svg`;
    }
});
