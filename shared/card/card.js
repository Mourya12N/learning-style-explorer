
/* Reusable card */
class AppCard extends HTMLElement {

    /* Editable colours */
    static colors = {
        "bg": "--card-bg",
        "accent-color": "--accent-color",
        "circle-bg": "--circle-bg",
        "number-color": "--number-color",
        "heading-color": "--heading-color",
        "description-color": "--description-color"
    };

    static get observedAttributes() {
        return [
            "number",
            "heading",
            "description",
            ...Object.keys(this.colors)
        ];
    }

    connectedCallback() {
        if (!this.cardNumber) {
            this.render();
        }

        this.updateCard();
    }

    attributeChangedCallback() {
        if (this.cardNumber) {
            this.updateCard();
        }
    }

    /* Create card elements */
    render() {
        const accent = document.createElement("div");
        accent.className = "card-accent";
        accent.setAttribute("aria-hidden", "true");

        this.cardNumber = document.createElement("div");
        this.cardNumber.className = "card-number";

        this.cardHeading = document.createElement("div");
        this.cardHeading.className = "card-heading";

        this.cardDescription = document.createElement("div");
        this.cardDescription.className = "card-description";

        const text = document.createElement("div");
        text.className = "card-text";
        text.append(this.cardHeading, this.cardDescription);

        const body = document.createElement("div");
        body.className = "card-body";
        body.append(this.cardNumber, text);

        this.replaceChildren(accent, body);
    }

    /* Update card text and colours */
    updateCard() {
        this.cardNumber.textContent =
            this.getAttribute("number") || "";

        this.cardHeading.textContent =
            this.getAttribute("heading") || "";

        this.cardDescription.textContent =
            this.getAttribute("description") || "";

        for (const [attribute, variable] of Object.entries(AppCard.colors)) {
            const value = this.getAttribute(attribute);

            if (value) {
                this.style.setProperty(variable, value);
            } else {
                this.style.removeProperty(variable);
            }
        }
    }
}

customElements.define("app-card", AppCard);
