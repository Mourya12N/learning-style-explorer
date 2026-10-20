
/* Shared status bar */
function loadStatusBar() {
    const statusBar = document.getElementById("status-bar");
    if (!statusBar) return;

    /* Locate icons relative to this shared script */
    const iconPath = new URL(
        "./assets/status-icons.svg",
        document.currentScript?.src ||
        document.querySelector('script[src*="status-bar.js"]').src
    ).href;

    statusBar.innerHTML = `
        <div class="dynamic-island" aria-hidden="true"></div>

        <span class="status-time">9:41</span>

        <img
            src="${iconPath}"
            alt="Signal, Wi-Fi and Battery"
            class="status-icons"
        >
    `;
}

document.addEventListener("DOMContentLoaded", loadStatusBar);
