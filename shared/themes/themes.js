
/* Restore selected colour theme */
(function () {
    const savedTheme = localStorage.getItem("learningStyleTheme") || "summer-drift";

    document.body.dataset.theme = savedTheme;
})();
