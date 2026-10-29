
/* Agreement elements */
const checkbox = document.getElementById("agree-terms");
const error = document.getElementById("tos-eula-error");
const panel = document.querySelector(".tos-eula-panel");

/* Remember accepted terms */
checkbox.checked = sessionStorage.getItem("termsAccepted") === "true";

/* Return to Sign Up */
function returnToSignup() {
    window.location.href = "../signup/signup.html";
}

/* Accept terms */
document.getElementById("tos-eula-accept").addEventListener("click", () => {
    if (!checkbox.checked) {
        error.hidden = false;
        panel.classList.add("has-agreement-error");
        return;
    }

    sessionStorage.setItem("termsAccepted", "true");
    returnToSignup();
});

/* Clear validation error */
checkbox.addEventListener("change", () => {
    error.hidden = true;
    panel.classList.remove("has-agreement-error");
});

/* Decline or close */
document.querySelectorAll(".btn-decline, .tos-eula-close").forEach(button => {
    button.addEventListener("click", () => {
        sessionStorage.removeItem("termsAccepted");
        returnToSignup();
    });
});
