# Teacher MCQ Quiz Creator

## Project Brief
A simple web app for teachers to quickly generate, edit, and preview multiple-choice quizzes for any topic using AI (OpenAI API). The app is designed for functional, clean, and thoughtful UX, allowing teachers to efficiently modify questions and visualize the student experience. No technical experience required.

---
## Features
- **Generate MCQ quizzes** on any topic using AI
- **Edit questions and answers** instantly
- **Preview as a student** and see scoring
- **Toggle between teacher and student modes** at any time
- **Progress bar** for easy tracking of quiz completion

---
## How to Run and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed (download and install if you don’t have it)
- An OpenAI API key (provided by your instructor or from [OpenAI](https://platform.openai.com/))

### Setup Steps
1. **Download or clone this repository**
   - Click the green "Code" button above and choose "Download ZIP" or use `git clone <repo-url>`
2. **Open the folder** in VS Code or your preferred editor
3. **Install dependencies**
   - Open a terminal in the project folder and run:
     ```bash
     npm install
     ```
4. **Add your OpenAI API key**
   - Open `src/QuizGenerator.jsx` and replace the placeholder API key with your own
5. **Start the app**
   - In the terminal, run:
     ```bash
     npm run dev
     ```
   - The app will open in your browser (usually at [http://localhost:5175](http://localhost:5175))

---
## Component Structure
- **QuizGenerator:** For teachers to enter topic and number of questions, and generate the quiz using AI
- **QuizEditor:** Allows teachers to edit question text, answer options, and correct answers instantly
- **StudentPreview:** Lets teachers preview the quiz as a student, select answers, and see the score
- **Navbar:** Contains the logo, toggle button for teacher/student mode, and navigation controls
- **UI Components:** All buttons, inputs, cards, and toggles use shadcn/ui for consistency and accessibility

---
## Design Decisions
- **Color palette:** Chosen for simplicity and clarity, using orange and white for a clean, professional look that is familiar and widely used in educational tools
- **Teacher/Student toggle:** Placed on the navbar for easy, instant switching between modes
- **Save Changes button:** Added to the editor for HCI-friendly, explicit saving of edits
- **Progress bar:** Clearly shows quiz progress, helping users understand how many questions remain
- **Next button activation:** The Next button in student mode only lights up when an option is selected, making navigation intuitive and preventing errors

---
## Future Improvements
- Ability to **add or remove questions** in the editor
- Option to **save quizzes** for later or export results
- Support for **different question types** (e.g., true/false, short answer)
- Add **user authentication** for teachers
- Improve accessibility for screen readers
- Add analytics or reporting for quiz results

---
## Support
If you have any issues or questions, please contact the repository owner or your instructor.

---
Enjoy creating quizzes!

