
# Learning Style Explorer (LSE)

Learning Style Explorer is a front-end web application designed to help students identify their preferred learning styles and discover study strategies that support their learning.

The application uses an interactive questionnaire based on four learning-style categories: Visual, Auditory, Reading/Writing and Kinesthetic (VARK).

## Features

- Interactive 12-question learning-style questionnaire
- Learning-style results with percentage scores
- Support for multiple equally preferred learning styles (Multimodal)
- Personalised study tips for each learning style
- Six selectable colour themes
- Login, signup and password reset demonstration pages
- User role selection before starting the quiz
- Quiz progress tracking and answer validation
- Results saving and sharing
- Reusable interface components
- Responsive layouts and accessible interactive elements
- Theme-specific illustrations and decorative SVG assets

## Technologies

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- SVG and PNG image assets
- Git and GitHub
- Visual Studio Code

## Project Structure

The application is organised into separate folders for each page and shared interface components.

- `home/` - Home page
- `login/` - Login page
- `signup/` - Signup page
- `forgot-password/` - Password reset page
- `instructions/` - Quiz instructions
- `user-setup/` - User role selection
- `quiz/` - Learning-style questionnaire
- `loading/` - Results loading screen
- `results/` - Learning-style results and score breakdown
- `study-tips/` - Personalised study strategies
- `settings/` - Theme selection
- `shared/` - Reusable UI components and theme styles

Each page contains its own HTML, CSS, JavaScript and required assets.

Shared components maintain consistent styling and behaviour across the application.

## How to Run

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `home/home.html` in a web browser or using the Live Server extension.
4. Navigate through the application and complete the learning-style quiz.
5. View your results, explore study tips and customise the theme in Settings.

No additional installation or backend server is required.

## How It Works

1. The user reads the quiz instructions.
2. The user selects their role.
3. The user answers 12 learning-style questions.
4. JavaScript calculates the scores for the four learning-style categories.
5. The Results page displays the highest-scoring learning style and percentage breakdown.
6. If multiple styles have the same highest score, the result is Multimodal.
7. The Study Tips page displays strategies associated with the user's strongest learning styles.

## Colour Themes

The application provides six visual themes:

- Summer Drift
- Autumn Glow
- Forest Breeze
- Midnight Mist
- Tropical Sunset
- Earthy Harvest

Theme selection updates the interface colours and supported decorative illustrations.

## Accessibility

The application includes accessibility features such as:

- Semantic HTML elements
- Labels for form inputs
- Keyboard focus indicators
- Alternative text for meaningful images
- Accessible radio buttons and interactive controls
- Consistent navigation and visual feedback

## Privacy and Data

Learning Style Explorer is a front-end demonstration application.

- No user accounts are created on a server.
- Login, signup and password reset pages are demonstrations only.
- Quiz results are calculated locally using JavaScript.
- Quiz scores are stored temporarily using browser session storage.
- Theme preferences are stored locally in the browser.
- No backend database is required.

## Development

This project was developed as part of a Computing Technology web application development assessment.

The interface was initially designed and prototyped in Figma before being implemented using HTML, CSS and JavaScript.

The project focuses on clean and readable code, reusable components, visual consistency, accessibility and a user-friendly experience.
