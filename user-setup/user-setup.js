
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
