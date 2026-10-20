
/* Shared bottom navigation */
function loadBottomNav() {
    const container = document.getElementById("bottom-nav");
    if (!container) return;

    /* Detect the current page automatically */
    const currentPage = decodeURIComponent(
        window.location.pathname.split("/").pop()
    ).toLowerCase();

    const pages = [
        {
            name: "Home",
            id: "home",
            file: "home.html",
            width: 20,
            height: 20
        },
        {
            name: "Quiz",
            id: "quiz",
            file: "quiz.html",
            width: 19.93,
            height: 19.93
        },
        {
            name: "Results",
            id: "results",
            file: "results.html",
            width: 20,
            height: 20
        },
        {
            name: "Settings",
            id: "settings",
            file: "settings.html",
            width: 18,
            height: 20
        }
    ];

    /* Build navigation with the correct active icon */
    container.innerHTML = `
        <nav class="bottom-nav" aria-label="Main navigation">
            ${pages.map(page => {
                const selected = currentPage === page.file;
                const variant = selected ? "filled" : "outline";

                return `
                    <a
                        class="nav-item nav-${page.id}${selected ? " is-active" : ""}"
                        href="${page.file}"
                        ${selected ? 'aria-current="page"' : ""}
                    >
                        <span class="nav-indicator" aria-hidden="true"></span>
                        <span class="nav-circle" aria-hidden="true"></span>

                        <img
                            class="nav-icon"
                            src="../shared/bottom-nav/icons/${page.id}-${variant}.svg"
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
