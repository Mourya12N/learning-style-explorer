
class AppCheckbox extends HTMLElement {
    static colors = {
        bg: "bg",
        "hover-bg": "hover-bg",
        "outline-color": "outline",
        "hover-outline-color": "hover-outline",
        "text-color": "text"
    };

    static get observedAttributes() {
        return [
            "label", "name", "value",
            "checked", "disabled", "required",
            ...Object.keys(this.colors)
        ];
    }

    connectedCallback() {
        if (this.input) return;

        this.innerHTML = `
            <label class="checkbox-label">
                <input class="checkbox-input" type="checkbox">

                <span class="checkbox-square">
                    <svg class="checkbox-tick"
                        viewBox="0 0 16 12"
                        aria-hidden="true">
                        <path d="M5.16613 12C4.71195 12.0002 4.27638 11.8126 3.9555 11.4787L0.295374 7.67744C-0.098458 7.26814 -0.098458 6.60467 0.295374 6.19536C0.689332 5.78619 1.32794 5.78619 1.72189 6.19536L5.16613 9.77374L14.2781 0.306878C14.6721 -0.102293 15.3107 -0.102293 15.7046 0.306878C16.0985 0.716179 16.0985 1.37966 15.7046 1.78896L6.37675 11.4787C6.05587 11.8126 5.6203 12.0002 5.16613 12Z"/>
                    </svg>
                </span>

                <span class="checkbox-text"></span>
            </label>
        `;

        this.input = this.querySelector(".checkbox-input");
        this.text = this.querySelector(".checkbox-text");

        this.input.addEventListener("change", () => {
            this.toggleAttribute("checked", this.input.checked);
        });

        this.update();
    }

    attributeChangedCallback() {
        if (this.input) this.update();
    }

    update() {
        for (const [attribute, variable] of Object.entries(AppCheckbox.colors)) {
            const color = this.getAttribute(attribute);
            const property = `--checkbox-${variable}`;

            if (color) {
                this.style.setProperty(property, color);
            } else {
                this.style.removeProperty(property);
            }
        }

        this.text.textContent = this.getAttribute("label") || "";
        this.text.hidden = !this.text.textContent;

        this.input.name = this.getAttribute("name") || "";
        this.input.value = this.getAttribute("value") || "on";
        this.input.checked = this.hasAttribute("checked");
        this.input.disabled = this.hasAttribute("disabled");
        this.input.required = this.hasAttribute("required");
    }

    get checked() {
        return this.input?.checked || false;
    }

    set checked(value) {
        this.toggleAttribute("checked", Boolean(value));
    }
}

customElements.define("app-checkbox", AppCheckbox);
