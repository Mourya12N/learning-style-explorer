
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
