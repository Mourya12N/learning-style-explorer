
/* Learning style information */
const styles = {
    visual: {
        name: "Visual",
        description: "You prefer images, diagrams and visual content",
        image: "visual-eye-results.svg"
    },
    auditory: {
        name: "Auditory",
        description: "You prefer listening, speaking and discussions",
        image: "auditory-ear-results.svg"
    },
    "read-write": {
        name: "Reading/Writing",
        description: "You prefer reading, notes and written information",
        image: "read-write-book-results.svg"
    },
    kinesthetic: {
        name: "Kinesthetic",
        description: "You prefer hands-on activities and practical learning",
        image: "kinesthetic-tools-results.svg"
    }
};

/* Load quiz scores */
const scores = JSON.parse(sessionStorage.getItem("quizScores") || "null");
const styleKeys = Object.keys(styles);
const totalQuestions = 12;

let resultSummary = "";

/* Check quiz scores */
const validScores = scores &&
    styleKeys.every(style => {
        return Number.isInteger(scores[style]) && scores[style] >= 0;
    }) &&
    styleKeys.reduce((total, style) => {
        return total + scores[style];
    }, 0) === totalQuestions;

/* Convert answers to percentage */
function getPercentage(count) {
    return Math.round(count / totalQuestions * 100);
}

/* Display learning style images */
function showImages(topStyles) {
    const imageBox = document.querySelector(".results-image-box");

    imageBox.replaceChildren();

    topStyles.forEach(style => {
        const image = document.createElement("img");

        image.className = "results-style-image";
        image.src = `assets/${styles[style].image}`;
        image.alt = `${styles[style].name} learning style`;

        imageBox.appendChild(image);
    });
}

/* Display main result */
function showMainResult(topStyles) {
    const styleName = document.getElementById("results-style-name");
    const description = document.querySelector(".results-description");
    const score = document.querySelector(".results-score");

    const highestPercentage = getPercentage(scores[topStyles[0]]);

    if (topStyles.length === 1) {
        const style = topStyles[0];

        styleName.textContent = styles[style].name;
        description.textContent = styles[style].description;

    } else {
        styleName.textContent = "Multimodal";

        const names = topStyles.map(style => styles[style].name);

        description.textContent =
            `Your strongest learning styles are ${names.join(", ")}.`;
    }

    /* Adjust longer headings */
    styleName.dataset.long =
        String(styleName.textContent.length > 12);

    score.textContent = `Top Score: ${highestPercentage}%`;

    showImages(topStyles);
}

/* Update score breakdown */
function showBreakdown() {
    const categories = [
        ["visual", ".results-visual"],
        ["auditory", ".results-auditory"],
        ["read-write", ".results-reading"],
        ["kinesthetic", ".results-kinesthetic"]
    ];

    categories.forEach(([style, selector]) => {
        const item = document.querySelector(selector);
        const percentage = getPercentage(scores[style]);

        item.querySelector(".results-score-heading span").textContent =
            `${percentage}%`;

        item.querySelector(".results-score-fill").style.width =
            `${percentage}%`;

        item.querySelector(".results-score-track")
            .setAttribute("aria-valuenow", percentage);
    });
}

/* Match Results colours and decorations */
function showResultColours(mainStyle) {
    const content = document.querySelector(".results-content");

    content.dataset.learningStyle =
        mainStyle === "read-write" ? "reading" : mainStyle;

    const decorations = {
        ".results-squares": "decorative-squares-results",
        ".results-squares-small": "decorative-squares-small-results"
    };

    Object.entries(decorations).forEach(([selector, name]) => {
        const image = document.querySelector(selector);

        if (image) {
            image.src = `assets/${name}-${mainStyle}.svg`;
        }
    });
}

/* Prepare results */
if (!validScores) {
    alert("Please complete the quiz to view your results.");
    window.location.replace("../quiz/quiz.html");

} else {
    const highestScore = Math.max(
        ...styleKeys.map(style => scores[style])
    );

    const topStyles = styleKeys.filter(style => {
        return scores[style] === highestScore;
    });

    /* Save highest learning styles for Study Tips */
    sessionStorage.setItem("topStyles", JSON.stringify(topStyles));

    showMainResult(topStyles);
    showBreakdown();
    showResultColours(topStyles[0]);

    /* Create results summary */
    resultSummary = [
        "Learning Style Explorer - Quiz Results",
        "",
        `Result: ${topStyles.length === 1 ? styles[topStyles[0]].name : "Multimodal"} Learner`,
        `Highest Styles: ${topStyles.map(style => styles[style].name).join(", ")}`,
        "",
        ...styleKeys.map(style => {
            return `${styles[style].name}: ${getPercentage(scores[style])}%`;
        })
    ].join("\n");

    /* View study tips */
    document.getElementById("view-study-tips").addEventListener("click", () => {
        window.location.href = "../study-tips/study-tips.html";
    });

    /* Save results */
    document.querySelector(".btn-save").addEventListener("click", () => {
        const file = new Blob([resultSummary], {
            type: "text/plain"
        });

        const url = URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = url;
        link.download = "learning-style-results.txt";
        link.click();

        URL.revokeObjectURL(url);
    });

    /* Share results */
    document.querySelector(".btn-share").addEventListener("click", async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My Learning Style Results",
                    text: resultSummary
                });
            } else {
                await navigator.clipboard.writeText(resultSummary);
                alert("Results copied to clipboard!");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                prompt("Copy your results:", resultSummary);
            }
        }
    });
}
