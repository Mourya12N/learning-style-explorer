
/* Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../home/home.html";
    }
});

/* Form fields and steps */
const email = document.getElementById("reset-email");
const password = document.getElementById("reset-new-password");
const confirmPassword = document.getElementById("reset-confirm-password");
const steps = document.querySelectorAll(".reset-step");

let emailVerified = false;

/* Show active step */
function showStep(number) {
    steps.forEach((step, index) => {
        step.classList.toggle("is-active", index === number);
    });
}

showStep(0);

/* Verify email */
document.querySelector(".send-reset").addEventListener("click", () => {
    if (!email.value.trim() || !email.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    emailVerified = true;
    showStep(1);

    alert("Email verified for this demo. You can now create a new password.");
});

/* Confirm password step */
confirmPassword.addEventListener("input", () => {
    if (emailVerified && confirmPassword.value.trim()) {
        showStep(2);
    } else if (emailVerified) {
        showStep(1);
    }
});

/* Reset password */
document.querySelector(".save-password").addEventListener("click", () => {
    if (!emailVerified) {
        alert("Please verify your email first.");
        return;
    }

    if (!password.value.trim() || !confirmPassword.value.trim()) {
        alert("Please complete both password fields.");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
    }

    alert("Password reset successfully! You can now log in.");
    window.location.href = "../login/login.html";
});
