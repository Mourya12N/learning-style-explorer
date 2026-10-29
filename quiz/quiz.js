
/* Quiz questions */
const questions = [
    {
        question: "When you are given new information,\nwhat do you naturally do first?",
        options: [
            ["Draw it out or look for a visual", "Diagrams, charts, maps or images", "visual"],
            ["Talk about it or listen to someone", "Discussions, podcasts or lectures", "auditory"],
            ["Write it down or read about it", "Notes, textbooks or written summaries", "read-write"],
            ["Try it out through practice", "Real examples, activities or experiments", "kinesthetic"]
        ]
    },
    {
        question: "When studying for an exam,\nwhich method do you prefer?",
        options: [
            ["Creating diagrams and mind maps", "Colour coded charts and visual summaries", "visual"],
            ["Listening to recording or discussing with friends", "Podcasts, study groups or verbal explanations", "auditory"],
            ["Re-reading and rewriting your notes", "Written summaries, lists and key points", "read-write"],
            ["Practising with past exam questions", "Hands on practice and repetition", "kinesthetic"]
        ]
    },
    {
        question: "When you need to remember something\nimportant, you usually...",
        options: [
            ["Draw a picture or diagram of it", "Visual representation helps recall", "visual"],
            ["Say it out loud or repeat it verbally", "Speaking and hearing helps retention", "auditory"],
            ["Write it down repeatedly", "Writing reinforces memory", "read-write"],
            ["Associate it with a physical action", "Movement and doing helps recall", "kinesthetic"]
        ]
    },
    {
        question: "In class, you learn best\nwhen the teacher…",
        options: [
            ["Uses diagrams, charts and visual aids", "Graphs, illustration and colour coding", "visual"],
            ["Explains clearly and tells stories", "Verbal explanations and real examples", "auditory"],
            ["Provides handouts and written notes", "Written materials to read and refer back to", "read-write"],
            ["Gives hands on activities to try", "Practical experiments and physical tasks", "kinesthetic"]
        ]
    },
    {
        question: "When reading a textbook,\nyou find it most helpful to…",
        options: [
            ["Focus on the diagrams and figures", "Visual elements and illustrate the content", "visual"],
            ["Read the content aloud to yourself", "Hearing the words helps understanding", "auditory"],
            ["Take detailed written notes as you go", "Writing out key information and summaries", "read-write"],
            ["Try the examples and exercises as you read", "Practising alongside reading", "kinesthetic"]
        ]
    },
    {
        question: "When you are lost in a new place,\nyou prefer to…",
        options: [
            ["Look at a map or visual guide", "Visual spatial understanding of the area", "visual"],
            ["Ask someone for verbal directions", "Hearing directions from a real person", "auditory"],
            ["Read written step by step directions", "Following numbered written instructions", "read-write"],
            ["Just start walking and explore", "Trial and error through physical movement", "kinesthetic"]
        ]
    },
    {
        question: "When solving a difficult problem,\nyou tend to…",
        options: [
            ["Sketch it out as a diagram or flowchart", "Drawing the problem out visually", "visual"],
            ["Talk it through with someone out loud", "Verbal discussion and explanation", "auditory"],
            ["Write out all the steps carefully", "Written step by step approach", "read-write"],
            ["Jump in and try different solutions", "Trial and error through action", "kinesthetic"]
        ]
    },
    {
        question: "When attending a lecture,\nyou find it most helpful to…",
        options: [
            ["Draw diagrams of what is being said", "Converting spoken info into visuals", "visual"],
            ["Just listen carefully and absorb", "Active listening without distractions", "auditory"],
            ["Take detailed written notes throughout", "Writing everything down to review later", "read-write"],
            ["Apply the concepts as they are taught", "Immediate hands on application", "kinesthetic"]
        ]
    },
    {
        question: "In your free time,\nyou are most likely to…",
        options: [
            ["Watch videos, films or look at images", "Visual media and entertainment", "visual"],
            ["Listen to music, podcasts or audiobooks", "Audio based leisure activities", "auditory"],
            ["Read books, articles or write in a journal", "Reading and writing activities", "read-write"],
            ["Play sport or do something physical", "Active and hands on hobbies", "kinesthetic"]
        ]
    },
    {
        question: "When learning a new skill,\nyou prefer to…",
        options: [
            ["Watch a demonstration first", "See it done visually before trying yourself", "visual"],
            ["Have someone talk you through it", "Verbal coaching and step by step explanation", "auditory"],
            ["Read the instructions carefully first", "Following a written step by step guide", "read-write"],
            ["Just jump in and start trying", "Learning by doing and experimenting", "kinesthetic"]
        ]
    },
    {
        question: "When giving someone directions,\nyou tend to…",
        options: [
            ["Draw a map or sketch the route", "Visual representation of the path", "visual"],
            ["Explain verbally using landmarks", "Talking through the route out loud", "auditory"],
            ["Write out step by step directions", "Numbered written instructions", "read-write"],
            ["Walk them there personally", "Physically showing the way", "kinesthetic"]
        ]
    },
    {
        question: "After completing a task,\nyou prefer to check your work by…",
        options: [
            ["Looking it over visually for errors", "Scanning for visual mistakes or inconsistencies", "visual"],
            ["Talking through it aloud to verify", "Saying it out loud to check it makes sense", "auditory"],
            ["Re-reading it carefully from start to finish", "Reading through written content thoroughly", "read-write"],
            ["Testing it out practically", "Trying it out to see if it actually works", "kinesthetic"]
        ]
    }
];

/* Quiz state */
let currentQuestion = 0;
const answers = Array(questions.length).fill(null);

/* Quiz elements */
const progressHeading = document.getElementById("quiz-progress-heading");
const progressPercentage = document.getElementById("quiz-progress-percentage");
const progressFill = document.getElementById("quiz-progress-fill");
const progressBar = document.getElementById("quiz-progress-bar");

const questionLabel = document.getElementById("quiz-question-label");
const questionHeading = document.getElementById("quiz-question");

const dots = document.querySelectorAll(".quiz-dot");
const options = document.querySelectorAll(".quiz-options .radio-option");
const radios = document.querySelectorAll(".radio-input");

const backButton = document.getElementById("quiz-back");
const nextButton = document.getElementById("quiz-next");

/* Show current question */
function showQuestion() {
    const number = currentQuestion + 1;
    const question = questions[currentQuestion];
    const percentage = Math.round(number / questions.length * 100);

    /* Update progress */
    progressHeading.textContent = `Question ${number} of ${questions.length}`;
    progressPercentage.textContent = `${percentage}%`;
    progressFill.style.width = `${number / questions.length * 100}%`;
    progressBar.setAttribute("aria-valuenow", number);

    dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index <= currentQuestion);
    });

    /* Update question */
    questionLabel.textContent = `QUESTION ${number}`;
    questionHeading.textContent = question.question;

    /* Update answers */
    options.forEach((option, index) => {
        const [title, description, value] = question.options[index];

        option.querySelector(".radio-title").textContent = title;
        option.querySelector(".radio-description").textContent = description;

        const radio = option.querySelector(".radio-input");
        radio.value = value;
        radio.checked = answers[currentQuestion] === value;
    });

    /* Update navigation */
    backButton.disabled = false;
    nextButton.textContent = number === questions.length ? "Submit" : "Next";
}

/* Save selected answer */
radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        answers[currentQuestion] = radio.value;
    });
});

/* Previous question or User Setup */
backButton.addEventListener("click", () => {
    if (currentQuestion === 0) {
        window.location.href = "../user-setup/user-setup.html";
        return;
    }

    currentQuestion--;
    showQuestion();
});

/* Next question or submit */
nextButton.addEventListener("click", () => {
    if (!answers[currentQuestion]) {
        alert("Please select an answer before continuing.");
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        return;
    }

    /* Calculate VARK scores */
    const scores = {
        visual: 0,
        auditory: 0,
        "read-write": 0,
        kinesthetic: 0
    };

    answers.forEach((answer) => {
        scores[answer]++;
    });

    /* Save results for the Results screen */
    sessionStorage.setItem("quizScores", JSON.stringify(scores));
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));

    /* Open Loading screen */
    window.location.href = "../loading/loading.html";
});

/* Mini Back navigation */
document.querySelector(".btn-mini-back").addEventListener("click", (event) => {
    event.preventDefault();

    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../home/home.html";
    }
});

/* Start quiz */
showQuestion();

/* Match Quiz decorations to the selected theme */
const quizTheme = document.body.dataset.theme || "summer-drift";
const quizSquares = document.querySelector(
    'img[src="assets/decorative-squares-quiz.svg"]'
);

if (quizSquares) {
    quizSquares.src = `assets/decorative-squares-quiz-${quizTheme}.svg`;
}
