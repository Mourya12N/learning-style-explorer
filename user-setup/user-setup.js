
/* Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../home/home.html";
    }
});

/* Role selection */
const roles = document.querySelectorAll('input[name="user-role"]');

/* Restore previously selected role */
const savedRole = sessionStorage.getItem("userRole");

roles.forEach((role) => {
    if (role.value === savedRole) {
        role.checked = true;
    }
});

/* Start quiz */
document.querySelector(".user-setup-continue").addEventListener("click", () => {
    const selectedRole = document.querySelector('input[name="user-role"]:checked');

    if (!selectedRole) {
        alert("Please select your role before starting the quiz.");
        return;
    }

    sessionStorage.setItem("userRole", selectedRole.value);
    window.location.href = "../quiz/quiz.html";
});

/* Match User Setup illustrations to the selected theme */
const userSetupThemes = [
    "summer-drift",
    "autumn-glow",
    "forest-breeze",
    "midnight-mist",
    "tropical-sunset",
    "earthy-harvest"
];

const currentTheme = document.body.dataset.theme || "summer-drift";

const selectedTheme = userSetupThemes.includes(currentTheme)
    ? currentTheme
    : "summer-drift";

/* Update illustrations and decorative shapes */
const userSetupIllustrations = [
    "three-people",
    "decorative-squares-user-setup",
    "decorative-squares-small-user-setup",
    "decorative-circles-user-setup"
];

userSetupIllustrations.forEach((name) => {
    const image = document.querySelector(`.${name}`);

    if (image) {
        image.src = `assets/${name}-${selectedTheme}.svg`;
    }
});
