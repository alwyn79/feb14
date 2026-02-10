// --- State Management ---
const state = {
    currentSection: 'home',
    clueIndex: 0,
    quizIndex: 0,
    points: 0,
    musicPlaying: false
};

const data = {
    clues: [
        { q: "Where did we first meet? (Hint: The city name)", a: "London" },
        { q: "What's my favorite flavor of ice cream?", a: "Vanilla" },
        { q: "What was the name of the first movie we watched together?", a: "Inception" }
    ],
    quiz: [
        { q: "What's my favorite thing about you?", options: ["Your smile", "Your brain", "Your heart", "All of the above"], correct: 3 },
        { q: "Where would I love to go on a date next?", options: ["Beach", "Mountain", "Space", "My sofa with you"], correct: 3 },
        { q: "What's our secret code word?", options: ["Pizza", "Lovey", "Snuggles", "Bubbles"], correct: 1 }
    ],
    compliments: [
        "You're the person I never want to stop talking to.",
        "Your smile is my favorite thing in the world.",
        "You're smarter than you give yourself credit for.",
        "Being with you feels like home.",
        "You have the kindest soul I've ever met.",
        "I'm so proud of everything you do."
    ]
};

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    showSection('home');
});

function createFloatingHearts() {
    const container = document.getElementById('floatingElements');
    const emojis = ['❤️', '💖', '✨', '🌸', '🧁', '🌈'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        container.appendChild(heart);
    }
}

// --- Navigation ---
function showSection(sectionId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    // Update dots
    document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
    const dots = { 'home': 0, 'clues': 1, 'quiz': 2, 'compliments': 3, 'secret': 4 };
    document.querySelectorAll('.nav-dot')[dots[sectionId]].classList.add('active');

    state.currentSection = sectionId;
    if (sectionId === 'quiz') loadQuiz();
}

// --- Music ---
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const icon = document.getElementById('musicIcon');
    if (state.musicPlaying) {
        audio.pause();
        icon.innerText = '🔇';
    } else {
        audio.play().catch(e => console.log("User interaction needed for audio"));
        icon.innerText = '🎵';
    }
    state.musicPlaying = !state.musicPlaying;
}

// --- Treasure Hunt ---
function checkClue() {
    const input = document.getElementById('clueInput');
    const currentClue = data.clues[state.clueIndex];

    if (input.value.toLowerCase().trim() === currentClue.a.toLowerCase()) {
        state.clueIndex++;
        if (state.clueIndex < data.clues.length) {
            updateClue();
            input.value = '';
            alert("Correct! 🎉 Next clue unlocked!");
        } else {
            document.getElementById('clueContainer').innerHTML = `
                <h3 class="bouncy-text">You found the treasure! 🏆</h3>
                <p>You know us so well. Let's move on!</p>
                <button class="btn-main" onclick="showSection('quiz')">Onward! ✨</button>
            `;
        }
    } else {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
        alert("Try again, my love! ❤️");
    }

    // Update progress
    const progress = (state.clueIndex / data.clues.length) * 100;
    document.getElementById('clueProgress').style.width = progress + '%';
}

function updateClue() {
    document.getElementById('activeClue').innerText = `Clue #${state.clueIndex + 1}: ${data.clues[state.clueIndex].q}`;
}

// --- Quiz ---
function loadQuiz() {
    const container = document.getElementById('quizOptions');
    const question = data.quiz[state.quizIndex];
    document.getElementById('activeQuestion').innerText = question.q;

    container.innerHTML = '';
    question.options.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-opt';
        btn.innerText = opt;
        btn.onclick = () => selectOption(i);
        container.appendChild(btn);
    });
}

function selectOption(index) {
    const question = data.quiz[state.quizIndex];
    const options = document.querySelectorAll('.quiz-opt');

    if (index === question.correct) {
        options[index].classList.add('correct');
        setTimeout(() => {
            state.quizIndex++;
            if (state.quizIndex < data.quiz.length) {
                loadQuiz();
            } else {
                document.getElementById('quizContainer').innerHTML = `
                    <h3>Perfect Score! 🌟</h3>
                    <p>I guess you've been paying attention!</p>
                    <button class="btn-main" onclick="showSection('compliments')">Collect Reward 🎁</button>
                `;
            }
        }, 1000);
    } else {
        options[index].classList.add('wrong');
        setTimeout(() => options[index].classList.remove('wrong'), 500);
    }
}

// --- Compliments ---
function generateCompliment() {
    const display = document.getElementById('complimentDisplay');
    const random = data.compliments[Math.floor(Math.random() * data.compliments.length)];
    display.innerText = random;
    display.classList.add('pop-in');
    setTimeout(() => display.classList.remove('pop-in'), 500);
}

function revealSecret(el, msg) {
    el.innerText = '💖';
    el.classList.add('revealed');
    const bubble = document.createElement('div');
    bubble.className = 'secret-bubble';
    bubble.innerText = msg;
    document.body.appendChild(bubble);

    // Position bubble near element
    const rect = el.getBoundingClientRect();
    bubble.style.position = 'fixed';
    bubble.style.left = rect.left + 'px';
    bubble.style.top = (rect.top - 40) + 'px';

    setTimeout(() => bubble.remove(), 2000);
}

// --- Secret Letter ---
function unlockLetter() {
    const pass = document.getElementById('vaultPass').value;
    if (pass == '1402' || pass === 'today') { // Hardcoded for demo
        document.getElementById('letterLock').classList.add('hidden');
        document.getElementById('theLetter').classList.remove('hidden');
        confettiCelebration();
    } else {
        alert("Wrong password! Hint: Valentine's day date (DDMM)");
    }
}

function confettiCelebration() {
    for (let i = 0; i < 100; i++) {
        const c = document.createElement('div');
        c.className = 'heart-particle';
        c.innerText = '🌸';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 3000);
    }
}
