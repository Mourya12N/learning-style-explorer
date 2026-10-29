
/* Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../home/home.html";
    }
});

/* Login validation */
const email = document.getElementById("login-email");
const password = document.getElementById("login-password");

document.querySelector(".login-submit").addEventListener("click", () => {
    if (!email.value.trim() || !password.value.trim()) {
        alert("Please enter your email and password.");
        return;
    }

    if (!email.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    window.location.href = "../instructions/instructions.html";
});

/* Google sign-in */
document.querySelector(".login-google").addEventListener("click", () => {
    alert("Google Sign-In is not available in this demo.");
});

/* Match Login illustrations to the selected theme */
const loginThemes = [
    "summer-drift",
    "autumn-glow",
    "forest-breeze",
    "midnight-mist",
    "tropical-sunset",
    "earthy-harvest"
];

const loginCurrentTheme = document.body.dataset.theme || "summer-drift";

const loginSelectedTheme = loginThemes.includes(loginCurrentTheme)
    ? loginCurrentTheme
    : "summer-drift";

const loginIllustrations = [
    "girl-window-tree",
    "decorative-squares-login",
    "decorative-squares-small-login"
];

loginIllustrations.forEach((name) => {
    const image = document.querySelector(`.${name}`);

    if (image) {
        image.src = `assets/${name}-${loginSelectedTheme}.svg`;
    }
});
