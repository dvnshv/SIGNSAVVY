let selectedAnswer = null;
const correctAnswer = 'Correct Answer';
fetch('backgroundleft.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('backg').innerHTML = data;
});
// Sample questions and videos
const questions = [
    { videoSrc: '/videos/sample.mp4', options: ['Option A', 'Option B', 'Option C', 'Correct Answer'] },
    { videoSrc: '/videos/sample2.mp4', options: ['Option D', 'Option E', 'Correct Answer', 'Option F'] },
    { videoSrc: '/videos/sample3.mp4', options: ['Correct Answer', 'Option G', 'Option H', 'Option I'] }
];
let currentIndex = 0;

// Function to show the quiz and hide the welcome screen
function startQuiz() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    localStorage.setItem('quizStarted', 'true'); // Save state
    showQuestion(currentIndex);
}

document.getElementById('forwardArrow').addEventListener('click', startQuiz);

// Function to select an answer
function selectAnswer(option) {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = [...buttons].find(button => button.textContent === option);
    selectedButton.classList.add('selected');

    selectedAnswer = option;
    document.getElementById('checkButton').disabled = false;
}

// Function to check the selected answer
function checkAnswer() {
    const resultElement = document.getElementById('result');
    if (selectedAnswer === correctAnswer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = 'Incorrect, try again.';
        resultElement.style.color = 'red';
    }
}

// Function to show the question and video
function showQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    currentIndex = index;

    const question = questions[index];
    document.getElementById('video').src = question.videoSrc;

    const buttonsContainer = document.querySelector('.options');
    buttonsContainer.innerHTML = ''; // Clear existing buttons

    // Create new buttons for each option
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => selectAnswer(option); // Assign event listener
        buttonsContainer.appendChild(button);
    });

    // Reset previous selection
    selectedAnswer = null;
    document.getElementById('checkButton').disabled = true;
    document.getElementById('result').textContent = '';
}

// Navigation buttons event listeners
document.getElementById('prevButton').addEventListener('click', () => {
    showQuestion(currentIndex - 1);
});

document.getElementById('nextButton').addEventListener('click', () => {
    showQuestion(currentIndex + 1);
});

// Save currentIndex to localStorage before page unloads
window.addEventListener('beforeunload', () => {
    localStorage.setItem('currentIndex', currentIndex);
});

// Load state from localStorage when page loads
window.addEventListener('load', () => {
    const savedIndex = localStorage.getItem('currentIndex');
    const quizStarted = localStorage.getItem('quizStarted');

    if (quizStarted === 'true') {
        startQuiz();
        if (savedIndex !== null) {
            currentIndex = parseInt(savedIndex, 10);
            showQuestion(currentIndex);
        }
    }
});