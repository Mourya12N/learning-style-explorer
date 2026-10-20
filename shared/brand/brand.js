
/* Reusable app branding */
class AppBrand extends HTMLElement {

    static colors = {
        "logo-bg": "--brand-logo-bg",
        "logo-text": "--brand-logo-text",
        "name-color": "--brand-name-color"
    };

    static get observedAttributes() {
        return Object.keys(this.colors);
    }

    connectedCallback() {
        if (!this.logo) {
            this.render();
        }

        this.updateColors();
    }

    attributeChangedCallback() {
        if (this.logo) {
            this.updateColors();
        }
    }

    /* Create branding */
    render() {
        this.logo = document.createElement("div");
        this.logo.className = "app-logo";
        this.logo.textContent = "LSE";

        const name = document.createElement("span");
        name.className = "app-name";
        name.textContent = "Learning Style Explorer";

        this.replaceChildren(this.logo, name);
    }

    /* Apply individual colours */
    updateColors() {
        for (const [attribute, variable] of Object.entries(AppBrand.colors)) {
            const value = this.getAttribute(attribute);

            if (value) {
                this.style.setProperty(variable, value);
            } else {
                this.style.removeProperty(variable);
            }
        }
    }
}

customElements.define("app-brand", AppBrand);
