let selectedAnswer = null;

fetch('backgroundright.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('backg').innerHTML = data;
});

const questions = {
    1: [
        { videoSrc: '/videos/sample.mp4', options: ['hello', 'bye', 'welcome', 'thank you'], correctAnswer: 'hello' },
        { videoSrc: '/videos/sample.mp4', options: ['hungry', 'happy', 'sad', 'welcome'], correctAnswer: 'welcome' },
        { videoSrc: '/videos/sample.mp4', options: ['angry', 'hungry', 'thank you', 'hello'], correctAnswer: 'thank you' },
        { videoSrc: '/videos/sample.mp4', options: ['happy', 'sorry', 'sign', 'sad'], correctAnswer: 'sorry' },
        { videoSrc: '/videos/sample.mp4', options: ['hi', 'bye', 'happy', 'pain'], correctAnswer: 'bye' }
    ],
    2: [
        { videoSrc: '/videos/sample.mp4', options: ['no', 'yes', 'good', 'sad'], correctAnswer: 'yes' },
        { videoSrc: '/videos/sample.mp4', options: ['ok', 'yes', 'welcome', 'no'], correctAnswer: 'no' },
        { videoSrc: '/videos/sample.mp4', options: ['I/me', 'thank you', 'go', 'food'], correctAnswer: 'I/me' },
        { videoSrc: '/videos/sample.mp4', options: ['nice', 'Option E', 'wrong', 'sign'], correctAnswer: 'sign' },
        { videoSrc: '/videos/sample.mp4', options: ['language', 'hello', 'India', 'happy'], correctAnswer: 'language' }
    ],
    3: [
        { videoSrc: '/videos/sample.mp4', options: ['Correct Answer', 'Option G', 'Option H', 'Option I'] },
        { videoSrc: '/videos/sample.mp4', options: ['Correct Answer', 'Option G', 'Option H', 'Option I'] },
        { videoSrc: '/videos/sample.mp4', options: ['Correct Answer', 'Option G', 'Option H', 'Option I'] },
        { videoSrc: '/videos/sample.mp4', options: ['Correct Answer', 'Option G', 'Option H', 'Option I'] },
        { videoSrc: '/videos/sample.mp4', options: ['Correct Answer', 'Option G', 'Option H', 'Option I'] }
    ],
    4: [
        { videoSrc: '/videos/sample.mp4', options: ['Option J', 'Option K', 'Option L', 'Correct Answer'] },
        { videoSrc: '/videos/sample.mp4', options: ['Option J', 'Option K', 'Option L', 'Correct Answer'] },
        { videoSrc: '/videos/sample.mp4', options: ['Option J', 'Option K', 'Option L', 'Correct Answer'] },
        { videoSrc: '/videos/sample.mp4', options: ['Option J', 'Option K', 'Option L', 'Correct Answer'] },
        { videoSrc: '/videos/sample.mp4', options: ['Option J', 'Option K', 'Option L', 'Correct Answer'] }
    ]
};

let currentIndex = 0;
let currentLevel = 1;

// Function to show the quiz and hide the welcome screen
function startQuiz() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('difficultyScreen').style.display = 'block';
}

function selectDifficulty(level) {
    currentLevel = level;
    sessionStorage.setItem('currentLevel', currentLevel);
    document.getElementById('difficultyScreen').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentLevel][currentIndex];
    document.getElementById('video').src = question.videoSrc;

    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => selectOption(button);
        optionsContainer.appendChild(button);
    });

    document.getElementById('checkButton').disabled = false;
    document.getElementById('result').textContent = '';
}

function selectOption(button) {
    document.querySelectorAll('.option').forEach(option => option.classList.remove('selected'));
    button.classList.add('selected');
    selectedAnswer = button.textContent;
}

function checkAnswer() {
    const question = questions[currentLevel][currentIndex];
    const result = selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect!';
    document.getElementById('result').textContent = result;
}

document.getElementById('prevButton').onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
    }
};

document.getElementById('nextButton').onclick = () => {
    if (currentLevel === 1 && currentIndex === questions[currentLevel].length - 1) {
        // Redirect to celebration page after the last question of Level 1
        window.location.href = 'celebration.html?next=level2';
    } else if (currentLevel === 2 && currentIndex === questions[currentLevel].length - 1) {
        // Redirect to celebration page after the last question of Level 2
        window.location.href = 'celebration.html?next=level3';
    } else if (currentLevel === 3 && currentIndex === questions[currentLevel].length - 1) {
        // Redirect to celebration page after the last question of Level 3
        window.location.href = 'celebration.html?next=level4';
    } else if (currentIndex < questions[currentLevel].length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        currentIndex++;
        loadQuestion();
    }
};





// Back arrow button
document.getElementById('backArrow').onclick = () => {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('difficultyScreen').style.display = 'block';
};

// Function to initialize the welcome screen and transition to difficulty selection
function init() {
    setTimeout(() => {
        startQuiz();
    }, 3000); // 3 seconds delay for the welcome screen
}

// Restore state on reload
window.onload = function() {
    if (sessionStorage.getItem('navigateFromIndex') === 'true') {
        sessionStorage.removeItem('navigateFromIndex');
        init(); // Start welcome screen when coming from index.html
    } else {
        if (sessionStorage.getItem('currentLevel') && sessionStorage.getItem('currentIndex')) {
            currentLevel = parseInt(sessionStorage.getItem('currentLevel'), 10);
            currentIndex = parseInt(sessionStorage.getItem('currentIndex'), 10);
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('difficultyScreen').style.display = 'none';
            document.getElementById('quizContainer').style.display = 'block';
            loadQuestion();
        } else {
            init();
        }
    }
};

// Save state on question change
window.onbeforeunload = function() {
    sessionStorage.setItem('currentLevel', currentLevel);
    sessionStorage.setItem('currentIndex', currentIndex);
};

// Set a flag when navigating from index.html
window.addEventListener('load', () => {
    if (document.referrer.includes('index.html')) {
        sessionStorage.setItem('navigateFromIndex', 'true');
    }
});