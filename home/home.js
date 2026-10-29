/* Home page navigation */
document.querySelector('[data-action="open-login"]').addEventListener("click", () => {
    window.location.href = "../login/login.html";
});

document.querySelector('[data-action="start-quiz"]').addEventListener("click", () => {
    window.location.href = "../instructions/instructions.html";
});