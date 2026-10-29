
/* Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../home/home.html";
    }
});

/* Sign up fields */
const name = document.getElementById("signup-name");
const email = document.getElementById("signup-email");
const password = document.getElementById("signup-password");
const confirmPassword = document.getElementById("signup-confirm");
const role = document.getElementById("user-role");

const agreement = document.getElementById("signup-agreement");
const error = document.getElementById("signup-agreement-error");

/* Create account */
document.querySelector(".signup-submit").addEventListener("click", () => {
    if (sessionStorage.getItem("termsAccepted") !== "true") {
        error.hidden = false;
        agreement.classList.add("has-error");
        return;
    }

    if (!name.value.trim() || !email.value.trim() ||
        !password.value.trim() || !confirmPassword.value.trim() || !role.value) {
        alert("Please complete all fields.");
        return;
    }

    if (!email.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
    }

    sessionStorage.removeItem("termsAccepted");
    window.location.href = "../login/login.html";
});

/* Update agreement error */
window.addEventListener("pageshow", () => {
    if (sessionStorage.getItem("termsAccepted") === "true") {
        error.hidden = true;
        agreement.classList.remove("has-error");
    }
});
