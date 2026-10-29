
/* Learning style information */
const styles = {
    visual: {
        name: "Visual",
        image: "visual-eye-results.svg",
        list: "visual"
    },
    auditory: {
        name: "Auditory",
        image: "auditory-ear-results.svg",
        list: "auditory"
    },
    "read-write": {
        name: "Reading/Writing",
        image: "read-write-book-results.svg",
        list: "reading"
    },
    kinesthetic: {
        name: "Kinesthetic",
        image: "kinesthetic-tools-results.svg",
        list: "kinesthetic"
    }
};

/* Load quiz scores */
const scores = JSON.parse(sessionStorage.getItem("quizScores") || "null");
const styleKeys = Object.keys(styles);
const totalQuestions = 12;

const validScores = scores &&
    styleKeys.every(style => {
        return Number.isInteger(scores[style]) && scores[style] >= 0;
    }) &&
    styleKeys.reduce((total, style) => {
        return total + scores[style];
    }, 0) === totalQuestions;

/* Page elements */
const content = document.querySelector(".study-tips-content");
const title = document.querySelector(".study-tips-title");
const scoreText = document.querySelector(".study-tips-score");
const imageBox = document.querySelector(".study-tips-image-box");
const tipLists = document.querySelectorAll(".study-tips-list");
const scrollArea = document.querySelector(".study-tips-scroll");
const viewAll = document.querySelector(".study-tips-view-all");
const viewAllText = viewAll.querySelector("span");

let topStyles = [];
let showingAll = false;

/* Display learning style images */
function showImages() {
    imageBox.replaceChildren();

    topStyles.forEach(style => {
        const image = document.createElement("img");

        image.className = "study-tips-style-image";
        image.src = `../results/assets/${styles[style].image}`;
        image.alt = `${styles[style].name} learning style`;

        imageBox.appendChild(image);
    });
}

/* Display study tips */
function showTips() {
    const visibleStyles = showingAll ? styleKeys : topStyles;

    tipLists.forEach(list => {
        list.hidden = !visibleStyles.some(style => {
            return styles[style].list === list.dataset.style;
        });
    });

    viewAllText.textContent = showingAll
        ? "Show personalised study tips"
        : "View tips for all learning styles";

    viewAll.setAttribute("aria-expanded", String(showingAll));

    /* Enable scrolling when multiple styles are visible */
    scrollArea.classList.toggle("is-scrollable", visibleStyles.length > 1);
}

/* Display personalised result */
function showResult() {
    const highestScore = Math.max(
        ...styleKeys.map(style => scores[style])
    );

    topStyles = styleKeys.filter(style => {
        return scores[style] === highestScore;
    });

    const percentage = Math.round(
        highestScore / totalQuestions * 100
    );

    if (topStyles.length === 1) {
        const style = topStyles[0];

        title.textContent = `${styles[style].name} Learner`;
        content.dataset.learningStyle = styles[style].list;
    } else {
        title.textContent = "Multimodal Learner";
        content.dataset.learningStyle = "multimodal";
    }

    scoreText.textContent = `Based on your VARK score of ${percentage}%`;

    showImages();
    showTips();
}

/* View all study tips */
viewAll.setAttribute("role", "button");
viewAll.setAttribute("tabindex", "0");

function toggleAllTips() {
    showingAll = !showingAll;
    showTips();
}

viewAll.addEventListener("click", toggleAllTips);

viewAll.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleAllTips();
    }
});

/* Mini Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../results/results.html";
    }
});

/* Back to Results */
document.querySelector(".study-tips-actions .btn-back").addEventListener("click", () => {
    window.location.href = "../results/results.html";
});

/* Retake Quiz */
document.querySelector(".study-tips-actions .btn-retake").addEventListener("click", () => {
    window.location.href = "../quiz/quiz.html";
});

/* Start page */
if (validScores) {
    showResult();
} else {
    alert("Please complete the quiz to view personalised study tips.");
    window.location.replace("../quiz/quiz.html");
}
