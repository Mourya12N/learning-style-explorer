
/* Password visibility */
document.querySelectorAll('.form-field .field-input[type="password"]').forEach(input => {
    const control = input.closest(".field-control");
    if (!control || control.querySelector(".field-reveal")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "field-reveal";
    button.setAttribute("aria-label", "Hold to show password");
    button.disabled = input.disabled;

    control.append(button);

    const show = event => {
        if (button.disabled) return;

        event.preventDefault();
        input.type = "text";
        button.classList.add("is-revealing");

        if (event.pointerId !== undefined) {
            button.setPointerCapture(event.pointerId);
        }
    };

    const hide = () => {
        input.type = "password";
        button.classList.remove("is-revealing");
    };

    button.addEventListener("pointerdown", show);

    ["pointerup", "pointercancel", "lostpointercapture", "blur"]
        .forEach(event => button.addEventListener(event, hide));

    button.addEventListener("keydown", event => {
        if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
            show(event);
        }
    });

    button.addEventListener("keyup", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            hide();
        }
    });
});
