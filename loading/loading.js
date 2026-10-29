
/* Loading elements */
const progressBar = document.querySelector(".loading-progress-bar");
const progressFill = document.querySelector(".loading-progress-fill");
const progressText = document.querySelector(".loading-percentage");

/* Check that quiz results exist */
const quizScores = sessionStorage.getItem("quizScores");

if (!quizScores) {
    window.location.replace("../quiz/quiz.html");
} else {
    /* Start progress */
    let percentage = 0;

    progressFill.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");
    progressText.textContent = "Loading... 0%";

    const loadingInterval = setInterval(() => {
        percentage = Math.min(percentage + 2, 100);

        progressFill.style.width = `${percentage}%`;
        progressBar.setAttribute("aria-valuenow", percentage);
        progressText.textContent = `Loading... ${percentage}%`;

        /* Open Results when complete */
        if (percentage === 100) {
            clearInterval(loadingInterval);
            window.location.replace("../results/results.html");
        }
    }, 50);
}
