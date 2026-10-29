
/* Theme selection */
const themeButtons = document.querySelectorAll('input[name="colour-theme"]');

/* Read the current theme */
const selectedTheme = document.body.dataset.theme;

/* Restore selected theme button */
themeButtons.forEach(button => {
    button.checked = button.value === selectedTheme;

    /* Change colour theme */
    button.addEventListener("change", () => {
        if (button.checked) {
            document.body.dataset.theme = button.value;
            localStorage.setItem("learningStyleTheme", button.value);
        }
    });
});

/* Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../home/home.html";
    }
});

/* Font size slider fill */
const slider = document.querySelector(".settings-font-slider");

/* Match slider fill to its value */
function updateSliderFill() {
    const percentage = (slider.value - slider.min) /
        (slider.max - slider.min) * 100;

    slider.style.setProperty("--slider-fill", `${percentage}%`);
}

slider.addEventListener("input", updateSliderFill);
updateSliderFill();

/* Save settings */
document.querySelector(".settings-save-button").addEventListener("click", () => {
    alert("Settings saved for this demo.");
});

/* Log out */
document.querySelector(".settings-logout").addEventListener("click", event => {
    event.preventDefault();
    window.location.href = "../login/login.html";
});
