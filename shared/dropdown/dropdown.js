
/* Original Figma student icon */
const studentPath =
    "M13.3313 3.03225C13.332 2.45559 12.9813 1.95892 12.438 1.76692L8.128 0.246253C7.20267 -0.0810802 6.184 -0.0817469 5.25933 0.242253L0.897333 1.76892C0.352 1.95959 0 2.45559 0 3.03292C0 3.61092 0.352667 4.10692 0.898 4.29692L2.662 4.91225V6.03359C2.662 8.23959 4.456 10.0336 6.662 10.0336C8.868 10.0336 10.662 8.23959 10.662 6.03359V4.91225L11.9953 4.44692V7.36625C11.9953 7.73425 12.294 8.03292 12.662 8.03292C13.03 8.03292 13.3287 7.73425 13.3287 7.36625V3.04825C13.3287 3.04225 13.3313 3.03825 13.3313 3.03225ZM9.32867 6.03359C9.32867 7.50425 8.13267 8.70025 6.662 8.70025C5.19133 8.70025 3.99533 7.50425 3.99533 6.03359V5.37759L5.236 5.81025C5.69533 5.97025 6.17867 6.05092 6.66133 6.05092C7.144 6.05092 7.62667 5.97025 8.086 5.81025L9.32867 5.37692V6.03292V6.03359ZM7.64733 4.55159C7.012 4.77359 6.31133 4.77359 5.676 4.55159L1.338 3.02692L5.70067 1.50025C6.01933 1.38892 6.35333 1.33292 6.68867 1.33292C7.026 1.33292 7.36333 1.38959 7.68467 1.50292L11.9947 3.03492L7.64733 4.55159ZM11.966 15.1689C12.0753 15.5203 11.8787 15.8943 11.5273 16.0036C11.4613 16.0243 11.3947 16.0336 11.3293 16.0336C11.0453 16.0336 10.782 15.8503 10.6927 15.5643C10.168 13.8776 8.51133 12.6996 6.66267 12.6996C4.814 12.6996 3.15733 13.8776 2.63267 15.5643C2.52333 15.9163 2.14733 16.1116 1.798 16.0029C1.44667 15.8936 1.25 15.5196 1.35933 15.1683C2.05533 12.9296 4.236 11.3663 6.66267 11.3663C9.08933 11.3663 11.27 12.9303 11.966 15.1689Z";

class AppDropdown extends HTMLElement {
    static count = 0;

    static colors = {
        bg: "--dropdown-bg",
        hover: "--dropdown-hover",
        "border-color": "--dropdown-border",
        "heading-color": "--dropdown-heading",
        "label-color": "--dropdown-label",
        "text-color": "--dropdown-text",
        "icon-color": "--dropdown-icon",
        "arrow-color": "--dropdown-arrow",
        "option-bg": "--dropdown-option-bg",
        "option-hover": "--dropdown-option-hover",
        "option-text-color": "--dropdown-option-text",
        "selected-color": "--dropdown-selected"
    };

    static get observedAttributes() {
        return [
            "heading", "label", "options", "value",
            "name", "disabled", "required",
            ...Object.keys(this.colors)
        ];
    }

    connectedCallback() {
        if (this.select) return;

        const id = `dropdown-${++AppDropdown.count}`;

        this.innerHTML = `
            <label class="dropdown-heading" for="${id}"></label>

            <div class="dropdown-control">
                <div class="dropdown-label">
                    <span class="dropdown-label-text"></span>

                    <svg class="dropdown-triangle"
                         viewBox="0 0 12 12"
                         aria-hidden="true">
                        <path d="M0.8 1H11.2L6 10Z"></path>
                    </svg>
                </div>

                <span class="dropdown-icon">
                    <svg viewBox="0 0 14 17"
                         aria-hidden="true">
                        <path d="${studentPath}"></path>
                    </svg>
                </span>

                <select class="dropdown-select" id="${id}"></select>
            </div>
        `;

        this.select = this.querySelector(".dropdown-select");
        this.control = this.querySelector(".dropdown-control");
        this.heading = this.querySelector(".dropdown-heading");
        this.label = this.querySelector(".dropdown-label-text");

        // Update the displayed text after selection.
        this.select.addEventListener("change", () => {
            this.updateLabel();
        });

        this.updateOptions();
        this.updateAppearance();
    }

    /* Create native options */
    updateOptions() {
        const currentValue = this.getAttribute("value") ?? this.value;

        const choices = (this.getAttribute("options") || "")
            .split("|")
            .map(option => option.trim())
            .filter(Boolean);

        this.select.replaceChildren();

        // Empty option allows users to clear the selection.
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = this.getAttribute("label") || "Select";
        this.select.append(placeholder);

        for (const choice of choices) {
            const option = document.createElement("option");
            option.value = choice;
            option.textContent = choice;
            this.select.append(option);
        }

        this.select.value = currentValue;

        if (this.select.selectedIndex === -1) {
            this.select.value = "";
        }

        this.updateLabel();
    }

    /* Update text in the visible field */
    updateLabel() {
        const selected = this.select.value !== "";

        this.label.textContent = selected
            ? this.select.value
            : this.getAttribute("label") || "Select";

        this.control.classList.toggle("has-selection", selected);
    }

    /* Update attributes and theme colours */
    updateAppearance() {
        this.heading.textContent = this.getAttribute("heading") || "";

        this.select.name = this.getAttribute("name") || "";
        this.select.disabled = this.hasAttribute("disabled");
        this.select.required = this.hasAttribute("required");

        for (const [attribute, variable] of Object.entries(AppDropdown.colors)) {
            const color = this.getAttribute(attribute);

            if (color) {
                this.style.setProperty(variable, color);
            } else {
                this.style.removeProperty(variable);
            }
        }

        this.updateLabel();
    }

    /* Read or change selected value */
    get value() {
        return this.select?.value || "";
    }

    set value(value) {
        if (!this.select) {
            this.setAttribute("value", String(value));
            return;
        }

        this.select.value = String(value);

        if (this.select.selectedIndex === -1) {
            this.select.value = "";
        }

        this.updateLabel();
    }

    /* Respond to changes in HTML attributes */
    attributeChangedCallback(name) {
        if (!this.select) return;

        if (name === "options" || name === "value") {
            this.updateOptions();
        } else if (name === "label") {
            this.updateOptions();
            this.updateAppearance();
        } else {
            this.updateAppearance();
        }
    }
}

customElements.define("app-dropdown", AppDropdown);
