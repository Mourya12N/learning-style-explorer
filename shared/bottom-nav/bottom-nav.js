
/* Shared bottom navigation */
function loadBottomNav() {
    const container = document.getElementById("bottom-nav");
    if (!container) return;

    /* Current page */
    const currentPage = window.location.pathname.split("/").pop();

    /* Navigation pages */
    const pages = [
        {
            name: "Home",
            id: "home",
            width: 20,
            height: 20
        },
        {
            name: "Quiz",
            id: "quiz",
            width: 19.93,
            height: 19.93
        },
        {
            name: "Results",
            id: "results",
            width: 20,
            height: 20
        },
        {
            name: "Settings",
            id: "settings",
            width: 18,
            height: 20
        }
    ];

    /* Build navigation */
    container.innerHTML = `
        <nav class="bottom-nav" aria-label="Main navigation">
            ${pages.map(page => {
                const selected = currentPage === `${page.id}.html`;
                const icon = selected ? "filled" : "outline";

                return `
                    <a
                        class="nav-item nav-${page.id}${selected ? " is-active" : ""}"
                        href="../${page.id}/${page.id}.html"
                        ${selected ? 'aria-current="page"' : ""}
                    >
                        <span class="nav-indicator" aria-hidden="true"></span>
                        <span class="nav-circle" aria-hidden="true"></span>

                        <img
                            class="nav-icon"
                            src="../shared/bottom-nav/icons/${page.id}-${icon}.svg"
                            width="${page.width}"
                            height="${page.height}"
                            alt=""
                        >

                        <span class="nav-label">${page.name}</span>
                    </a>
                `;
            }).join("")}

            <div class="home-indicator" aria-hidden="true"></div>
        </nav>
    `;
}

document.addEventListener("DOMContentLoaded", loadBottomNav);
