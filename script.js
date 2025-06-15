// MedForce Games - Interactive Educational Gaming Platform
// Main JavaScript functionality for all games

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Unlock all levels immediately
    unlockAllLevels();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize game systems
    initializeGameSystems();
    
    // Initialize all games
    initializeBrainTeasers();
    initializeWordScramble();
    initializeSnakeGame();
    initializeKnowledgeQuiz();
    initializeMathQuiz();
}

// UNLOCK ALL LEVELS FUNCTIONALITY
function unlockAllLevels() {
    // Find all level buttons across all games
    const allLevelButtons = document.querySelectorAll('.level-btn');
    
    allLevelButtons.forEach(button => {
        // Remove locked class and add unlocked class
        button.classList.remove('locked');
        button.classList.add('unlocked');
        
        // Make sure the button is clickable
        button.style.pointerEvents = 'auto';
        button.style.opacity = '1';
        
        // Remove any lock icons
        const lockIcon = button.querySelector('::after');
        if (lockIcon) {
            button.style.position = 'relative';
        }
    });
    
    // Remove any CSS that might be adding lock icons
    const style = document.createElement('style');
    style.textContent = `
        .level-btn.locked::after {
            display: none !important;
        }
        .level-btn {
            opacity: 1 !important;
            pointer-events: auto !important;
            cursor: pointer !important;
        }
    `;
    document.head.appendChild(style);
}

// NAVIGATION FUNCTIONALITY
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Game navigation
    navLinks.forEach(link => {
        if (link.hasAttribute('data-game')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const gameType = this.getAttribute('data-game');
                showGame(gameType);
            });
        }
    });

    // Browse games button
    const browseGamesBtn = document.getElementById('browseGamesBtn');
    if (browseGamesBtn) {
        browseGamesBtn.addEventListener('click', function() {
            document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Category card navigation
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const button = card.querySelector('.card-link');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const gameType = this.getAttribute('data-game');
                showGame(gameType);
            });
        }
    });
}

// GAME SYSTEM MANAGEMENT
function initializeGameSystems() {
    // Initialize game containers
    const gameContainers = document.querySelectorAll('.game-container');
    gameContainers.forEach(container => {
        // Add quit button functionality
        const quitBtn = container.querySelector('[id$="-quit-btn"]');
        const homeBtn = container.querySelector('[id$="-home-btn"]');
        
        if (quitBtn) {
            quitBtn.addEventListener('click', () => hideAllGames());
        }
        if (homeBtn) {
            homeBtn.addEventListener('click', () => hideAllGames());
        }
    });
}

function showGame(gameType) {
    hideAllGames();
    const gameContainer = document.getElementById(`${gameType}-game`);
    if (gameContainer) {
        gameContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideAllGames() {
    const gameContainers = document.querySelectorAll('.game-container');
    gameContainers.forEach(container => {
        container.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// BRAIN TEASERS GAME
function initializeBrainTeasers() {
    const gameData = {
        currentLevel: 1,
        currentQuestion: 0,
        score: 0,
        hints: 3,
        questions: {
            1: [ // Riddles
                {
                    question: "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
                    answer: "keyboard",
                    hint: "You're probably using one right now to type!"
                },
                {
                    question: "What has hands but cannot clap?",
                    answer: "clock",
                    hint: "It tells you the time."
                },
                {
                    question: "What gets wet while drying?",
                    answer: "towel",
                    hint: "You use it after a shower."
                }
            ],
            2: [ // Math Puzzles
                {
                    question: "If you have 3 apples and you take away 2, how many do you have?",
                    answer: "2",
                    hint: "Think about what 'take away' means."
                },
                {
                    question: "What is 15 + 27?",
                    answer: "42",
                    hint: "Add the ones place first, then the tens place."
                }
            ],
            3: [ // Pattern Recognition
                {
                    question: "What comes next in this sequence: 2, 4, 8, 16, ?",
                    answer: "32",
                    hint: "Each number is double the previous one."
                }
            ],
            4: [ // Rebus Puzzles
                {
                    question: "What does this represent: STAND I",
                    answer: "understand",
                    hint: "Look at where the 'I' is positioned."
                }
            ],
            5: [ // Rapid Fire
                {
                    question: "How many sides does a triangle have?",
                    answer: "3",
                    hint: "It's in the name!"
                }
            ]
        }
    };

    // Level selection - ALL LEVELS UNLOCKED
    const levelButtons = document.querySelectorAll('#brain-teasers-game .level-btn');
    levelButtons.forEach((button, index) => {
        const level = parseInt(button.getAttribute('data-level'));
        
        // Make sure all levels are unlocked and clickable
        button.classList.remove('locked');
        button.classList.add('unlocked');
        
        button.addEventListener('click', function() {
            // Allow any level to be started immediately
            gameData.currentLevel = level;
            gameData.currentQuestion = 0;
            gameData.score = 0;
            gameData.hints = 3;
            startBrainTeaserLevel(level);
        });
    });

    // Game controls
    const restartBtn = document.getElementById('brain-restart-btn');
    const backBtn = document.getElementById('brain-back-btn');
    const submitBtn = document.getElementById('brain-submit-btn');
    const hintBtn = document.getElementById('brain-hint-btn');
    const skipBtn = document.getElementById('brain-skip-btn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            gameData.currentQuestion = 0;
            gameData.score = 0;
            gameData.hints = 3;
            startBrainTeaserLevel(gameData.currentLevel);
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('brain-level-select').style.display = 'block';
            document.getElementById('brain-game-play').style.display = 'none';
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => submitBrainTeaserAnswer());
    }

    if (hintBtn) {
        hintBtn.addEventListener('click', () => showBrainTeaserHint());
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', () => skipBrainTeaserQuestion());
    }

    // Answer input enter key
    const answerInput = document.getElementById('brain-answer-input');
    if (answerInput) {
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitBrainTeaserAnswer();
            }
        });
    }

    function startBrainTeaserLevel(level) {
        document.getElementById('brain-level-select').style.display = 'none';
        document.getElementById('brain-game-play').style.display = 'block';
        
        updateBrainTeaserStats();
        loadBrainTeaserQuestion();
        
        // Enable timer for rapid fire level
        if (level === 5) {
            document.getElementById('brain-timer').style.display = 'block';
            startBrainTeaserTimer();
        } else {
            document.getElementById('brain-timer').style.display = 'none';
        }
    }

    function loadBrainTeaserQuestion() {
        const questions = gameData.questions[gameData.currentLevel];
        if (!questions || gameData.currentQuestion >= questions.length) {
            completeBrainTeaserLevel();
            return;
        }

        const question = questions[gameData.currentQuestion];
        document.getElementById('brain-question-text').textContent = question.question;
        document.getElementById('brain-answer-input').value = '';
        document.getElementById('brain-feedback').textContent = '';
    }

    function submitBrainTeaserAnswer() {
        const userAnswer = document.getElementById('brain-answer-input').value.toLowerCase().trim();
        const questions = gameData.questions[gameData.currentLevel];
        const currentQuestion = questions[gameData.currentQuestion];
        
        if (userAnswer === currentQuestion.answer.toLowerCase()) {
            showBrainTeaserFeedback('Correct! Well done!', 'correct');
            gameData.score += 10;
            gameData.currentQuestion++;
            setTimeout(() => {
                loadBrainTeaserQuestion();
                updateBrainTeaserStats();
            }, 1500);
        } else {
            showBrainTeaserFeedback('Incorrect. Try again!', 'incorrect');
        }
    }

    function showBrainTeaserHint() {
        if (gameData.hints > 0) {
            const questions = gameData.questions[gameData.currentLevel];
            const currentQuestion = questions[gameData.currentQuestion];
            showBrainTeaserFeedback(`Hint: ${currentQuestion.hint}`, 'hint');
            gameData.hints--;
            updateBrainTeaserStats();
        } else {
            showBrainTeaserFeedback('No hints remaining!', 'incorrect');
        }
    }

    function skipBrainTeaserQuestion() {
        gameData.currentQuestion++;
        loadBrainTeaserQuestion();
        updateBrainTeaserStats();
    }

    function showBrainTeaserFeedback(message, type) {
        const feedback = document.getElementById('brain-feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
    }

    function updateBrainTeaserStats() {
        document.getElementById('brain-current-level').textContent = gameData.currentLevel;
        document.getElementById('brain-score').textContent = gameData.score;
        document.getElementById('brain-hints').textContent = gameData.hints;
    }

    function completeBrainTeaserLevel() {
        showBrainTeaserFeedback(`Level ${gameData.currentLevel} completed! Score: ${gameData.score}`, 'correct');
        // All levels remain unlocked - no need to unlock next level
    }

    function startBrainTeaserTimer() {
        let timeLeft = 60;
        const timerElement = document.getElementById('brain-time');
        
        const timer = setInterval(() => {
            timerElement.textContent = timeLeft;
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(timer);
                completeBrainTeaserLevel();
            }
        }, 1000);
    }
}

// WORD SCRAMBLE GAME
function initializeWordScramble() {
    const gameData = {
        currentLevel: 1,
        currentWord: 0,
        score: 0,
        wordsPerLevel: 10,
        words: {
            1: ['GAME', 'PLAY', 'WORD', 'QUIZ', 'LEARN'],
            2: ['BRAIN', 'SMART', 'THINK', 'SOLVE', 'LOGIC'],
            3: ['PUZZLE', 'ANSWER', 'RIDDLE', 'CLEVER', 'WISDOM'],
            4: ['SCIENCE', 'STUDENT', 'TEACHER', 'LIBRARY', 'READING'],
            5: ['EDUCATION', 'KNOWLEDGE', 'DISCOVERY', 'ADVENTURE', 'CHALLENGE']
        },
        currentScrambled: '',
        currentAnswer: ''
    };

    // Level selection - ALL LEVELS UNLOCKED
    const levelButtons = document.querySelectorAll('#word-scramble-game .level-btn');
    levelButtons.forEach(button => {
        const level = parseInt(button.getAttribute('data-level'));
        
        // Make sure all levels are unlocked and clickable
        button.classList.remove('locked');
        button.classList.add('unlocked');
        
        button.addEventListener('click', function() {
            // Allow any level to be started immediately
            gameData.currentLevel = level;
            gameData.currentWord = 0;
            gameData.score = 0;
            startWordScrambleLevel(level);
        });
    });

    // Game controls
    const restartBtn = document.getElementById('word-restart-btn');
    const backBtn = document.getElementById('word-back-btn');
    const submitBtn = document.getElementById('word-submit-btn');
    const hintBtn = document.getElementById('word-hint-btn');
    const speakBtn = document.getElementById('word-speak-btn');
    const shuffleBtn = document.getElementById('word-shuffle-btn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            gameData.currentWord = 0;
            gameData.score = 0;
            startWordScrambleLevel(gameData.currentLevel);
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('word-level-select').style.display = 'block';
            document.getElementById('word-game-play').style.display = 'none';
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => submitWordAnswer());
    }

    if (hintBtn) {
        hintBtn.addEventListener('click', () => showWordHint());
    }

    if (speakBtn) {
        speakBtn.addEventListener('click', () => speakWord());
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => shuffleWord());
    }

    // Word input enter key
    const wordInput = document.getElementById('word-input');
    if (wordInput) {
        wordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitWordAnswer();
            }
        });
    }

    function startWordScrambleLevel(level) {
        document.getElementById('word-level-select').style.display = 'none';
        document.getElementById('word-game-play').style.display = 'block';
        
        updateWordStats();
        loadNewWord();
    }

    function loadNewWord() {
        const words = gameData.words[gameData.currentLevel];
        if (!words || gameData.currentWord >= gameData.wordsPerLevel) {
            completeWordLevel();
            return;
        }

        const randomWord = words[Math.floor(Math.random() * words.length)];
        gameData.currentAnswer = randomWord;
        gameData.currentScrambled = scrambleWord(randomWord);
        
        displayScrambledWord();
        document.getElementById('word-input').value = '';
        document.getElementById('word-feedback').textContent = '';
    }

    function scrambleWord(word) {
        const letters = word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        return letters.join('');
    }

    function displayScrambledWord() {
        const container = document.getElementById('scrambled-word');
        container.innerHTML = '';
        
        for (let letter of gameData.currentScrambled) {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            letterDiv.textContent = letter;
            container.appendChild(letterDiv);
        }
    }

    function submitWordAnswer() {
        const userAnswer = document.getElementById('word-input').value.toUpperCase().trim();
        
        if (userAnswer === gameData.currentAnswer) {
            showWordFeedback('Correct! Well done!', 'correct');
            gameData.score += 10;
            gameData.currentWord++;
            setTimeout(() => {
                loadNewWord();
                updateWordStats();
            }, 1500);
        } else {
            showWordFeedback('Incorrect. Try again!', 'incorrect');
        }
    }

    function showWordHint() {
        const hint = `The word starts with "${gameData.currentAnswer[0]}"`;
        showWordFeedback(hint, 'hint');
    }

    function speakWord() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(gameData.currentAnswer);
            speechSynthesis.speak(utterance);
        }
    }

    function shuffleWord() {
        gameData.currentScrambled = scrambleWord(gameData.currentAnswer);
        displayScrambledWord();
    }

    function showWordFeedback(message, type) {
        const feedback = document.getElementById('word-feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
    }

    function updateWordStats() {
        document.getElementById('word-current-level').textContent = gameData.currentLevel;
        document.getElementById('word-score').textContent = gameData.score;
        document.getElementById('word-progress').textContent = `${gameData.currentWord}/${gameData.wordsPerLevel}`;
    }

    function completeWordLevel() {
        showWordFeedback(`Level ${gameData.currentLevel} completed! Score: ${gameData.score}`, 'correct');
        // All levels remain unlocked - no need to unlock next level
    }
}

// SNAKE GAME
function initializeSnakeGame() {
    let gameState = {
        currentLevel: 1,
        score: 0,
        highScore: localStorage.getItem('snakeHighScore') || 0,
        snake: [{x: 200, y: 200}],
        food: {x: 0, y: 0},
        direction: {x: 0, y: 0},
        gameRunning: false,
        canvas: null,
        ctx: null,
        gameSpeed: 150
    };

    // Level selection - ALL LEVELS UNLOCKED
    const levelButtons = document.querySelectorAll('#snake-game .level-btn');
    levelButtons.forEach(button => {
        const level = parseInt(button.getAttribute('data-level'));
        
        // Make sure all levels are unlocked and clickable
        button.classList.remove('locked');
        button.classList.add('unlocked');
        
        button.addEventListener('click', function() {
            // Allow any level to be started immediately
            gameState.currentLevel = level;
            gameState.score = 0;
            setGameSpeed(level);
            startSnakeGame();
        });
    });

    // Game controls
    const restartBtn = document.getElementById('snake-restart-btn');
    const backBtn = document.getElementById('snake-back-btn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            gameState.score = 0;
            startSnakeGame();
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            gameState.gameRunning = false;
            document.getElementById('snake-level-select').style.display = 'block';
            document.getElementById('snake-game-play').style.display = 'none';
        });
    }

    function setGameSpeed(level) {
        const speeds = {1: 150, 2: 120, 3: 100, 4: 80, 5: 60};
        gameState.gameSpeed = speeds[level] || 150;
    }

    function startSnakeGame() {
        document.getElementById('snake-level-select').style.display = 'none';
        document.getElementById('snake-game-play').style.display = 'block';
        
        gameState.canvas = document.getElementById('snake-canvas');
        gameState.ctx = gameState.canvas.getContext('2d');
        
        resetGame();
        updateSnakeStats();
        gameLoop();
    }

    function resetGame() {
        gameState.snake = [{x: 200, y: 200}];
        gameState.direction = {x: 0, y: 0};
        gameState.gameRunning = true;
        generateFood();
    }

    function generateFood() {
        gameState.food = {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20
        };
    }

    function gameLoop() {
        if (!gameState.gameRunning) return;
        
        setTimeout(() => {
            clearCanvas();
            moveSnake();
            drawFood();
            drawSnake();
            checkCollisions();
            gameLoop();
        }, gameState.gameSpeed);
    }

    function clearCanvas() {
        gameState.ctx.fillStyle = 'hsl(240, 8%, 10%)';
        gameState.ctx.fillRect(0, 0, gameState.canvas.width, gameState.canvas.height);
    }

    function moveSnake() {
        const head = {
            x: gameState.snake[0].x + gameState.direction.x,
            y: gameState.snake[0].y + gameState.direction.y
        };
        
        gameState.snake.unshift(head);
        
        if (head.x === gameState.food.x && head.y === gameState.food.y) {
            gameState.score += 10;
            generateFood();
            updateSnakeStats();
        } else {
            gameState.snake.pop();
        }
    }

    function drawSnake() {
        gameState.ctx.fillStyle = '#BC00FF';
        gameState.snake.forEach((segment, index) => {
            if (index === 0) {
                gameState.ctx.fillStyle = '#00F0FF'; // Head
            } else {
                gameState.ctx.fillStyle = '#BC00FF'; // Body
            }
            gameState.ctx.fillRect(segment.x, segment.y, 20, 20);
        });
    }

    function drawFood() {
        gameState.ctx.fillStyle = '#FFD700';
        gameState.ctx.fillRect(gameState.food.x, gameState.food.y, 20, 20);
    }

    function checkCollisions() {
        const head = gameState.snake[0];
        
        // Wall collision
        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
            gameOver();
            return;
        }
        
        // Self collision
        for (let i = 1; i < gameState.snake.length; i++) {
            if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) {
                gameOver();
                return;
            }
        }
    }

    function gameOver() {
        gameState.gameRunning = false;
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            localStorage.setItem('snakeHighScore', gameState.highScore);
        }
        updateSnakeStats();
        alert(`Game Over! Score: ${gameState.score}`);
    }

    function updateSnakeStats() {
        document.getElementById('snake-current-level').textContent = gameState.currentLevel;
        document.getElementById('snake-score').textContent = gameState.score;
        document.getElementById('snake-high-score').textContent = gameState.highScore;
        document.getElementById('snake-length').textContent = gameState.snake.length;
    }

    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (!gameState.gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (gameState.direction.y === 0) {
                    gameState.direction = {x: 0, y: -20};
                }
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (gameState.direction.y === 0) {
                    gameState.direction = {x: 0, y: 20};
                }
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (gameState.direction.x === 0) {
                    gameState.direction = {x: -20, y: 0};
                }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (gameState.direction.x === 0) {
                    gameState.direction = {x: 20, y: 0};
                }
                break;
        }
    });

    // Touch controls
    const touchButtons = document.querySelectorAll('#snake-game .touch-btn');
    touchButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!gameState.gameRunning) return;
            
            const direction = this.getAttribute('data-direction');
            switch(direction) {
                case 'up':
                    if (gameState.direction.y === 0) {
                        gameState.direction = {x: 0, y: -20};
                    }
                    break;
                case 'down':
                    if (gameState.direction.y === 0) {
                        gameState.direction = {x: 0, y: 20};
                    }
                    break;
                case 'left':
                    if (gameState.direction.x === 0) {
                        gameState.direction = {x: -20, y: 0};
                    }
                    break;
                case 'right':
                    if (gameState.direction.x === 0) {
                        gameState.direction = {x: 20, y: 0};
                    }
                    break;
            }
        });
    });
}

// KNOWLEDGE QUIZ GAME
function initializeKnowledgeQuiz() {
    const gameData = {
        currentLevel: 1,
        currentQuestion: 0,
        score: 0,
        streak: 0,
        questionsPerLevel: 10,
        questions: {
            1: [ // Science
                {
                    question: "What is the chemical symbol for water?",
                    options: ["H2O", "CO2", "NaCl", "O2"],
                    correct: 0
                },
                {
                    question: "How many bones are in the human body?",
                    options: ["206", "208", "210", "204"],
                    correct: 0
                },
                {
                    question: "What planet is known as the Red Planet?",
                    options: ["Venus", "Mars", "Jupiter", "Saturn"],
                    correct: 1
                }
            ],
            2: [ // Technology
                {
                    question: "What does CPU stand for?",
                    options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Unit", "Computer Processing Unit"],
                    correct: 0
                },
                {
                    question: "Who founded Microsoft?",
                    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
                    correct: 1
                }
            ],
            3: [ // History
                {
                    question: "In which year did World War II end?",
                    options: ["1944", "1945", "1946", "1947"],
                    correct: 1
                }
            ],
            4: [ // Geography
                {
                    question: "What is the capital of Australia?",
                    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
                    correct: 2
                }
            ],
            5: [ // Mixed Expert
                {
                    question: "What is the largest mammal in the world?",
                    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                    correct: 1
                }
            ]
        }
    };

    // Level selection - ALL LEVELS UNLOCKED
    const levelButtons = document.querySelectorAll('#knowledge-quiz-game .level-btn');
    levelButtons.forEach(button => {
        const level = parseInt(button.getAttribute('data-level'));
        
        // Make sure all levels are unlocked and clickable
        button.classList.remove('locked');
        button.classList.add('unlocked');
        
        button.addEventListener('click', function() {
            // Allow any level to be started immediately
            gameData.currentLevel = level;
            gameData.currentQuestion = 0;
            gameData.score = 0;
            gameData.streak = 0;
            startKnowledgeQuiz(level);
        });
    });

    // Game controls
    const restartBtn = document.getElementById('knowledge-restart-btn');
    const backBtn = document.getElementById('knowledge-back-btn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            gameData.currentQuestion = 0;
            gameData.score = 0;
            gameData.streak = 0;
            startKnowledgeQuiz(gameData.currentLevel);
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('knowledge-level-select').style.display = 'block';
            document.getElementById('knowledge-game-play').style.display = 'none';
        });
    }

    function startKnowledgeQuiz(level) {
        document.getElementById('knowledge-level-select').style.display = 'none';
        document.getElementById('knowledge-game-play').style.display = 'block';
        
        updateKnowledgeStats();
        loadKnowledgeQuestion();
    }

    function loadKnowledgeQuestion() {
        const questions = gameData.questions[gameData.currentLevel];
        if (!questions || gameData.currentQuestion >= Math.min(questions.length, gameData.questionsPerLevel)) {
            completeKnowledgeQuiz();
            return;
        }

        const question = questions[gameData.currentQuestion % questions.length];
        document.getElementById('knowledge-question-text').textContent = question.question;
        
        const optionButtons = document.querySelectorAll('#knowledge-quiz-game .quiz-option');
        optionButtons.forEach((button, index) => {
            button.textContent = question.options[index];
            button.className = 'quiz-option';
            button.onclick = () => selectKnowledgeAnswer(index);
        });
        
        document.getElementById('knowledge-feedback').textContent = '';
    }

    function selectKnowledgeAnswer(selectedIndex) {
        const questions = gameData.questions[gameData.currentLevel];
        const currentQuestion = questions[gameData.currentQuestion % questions.length];
        const optionButtons = document.querySelectorAll('#knowledge-quiz-game .quiz-option');
        
        optionButtons.forEach((button, index) => {
            button.onclick = null; // Disable further clicks
            if (index === currentQuestion.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex) {
                button.classList.add('incorrect');
            }
        });
        
        if (selectedIndex === currentQuestion.correct) {
            showKnowledgeFeedback('Correct!', 'correct');
            gameData.score += 10;
            gameData.streak++;
        } else {
            showKnowledgeFeedback('Incorrect!', 'incorrect');
            gameData.streak = 0;
        }
        
        gameData.currentQuestion++;
        updateKnowledgeStats();
        
        setTimeout(() => {
            loadKnowledgeQuestion();
        }, 2000);
    }

    function showKnowledgeFeedback(message, type) {
        const feedback = document.getElementById('knowledge-feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
    }

    function updateKnowledgeStats() {
        document.getElementById('knowledge-current-level').textContent = gameData.currentLevel;
        document.getElementById('knowledge-score').textContent = gameData.score;
        document.getElementById('knowledge-progress').textContent = `${gameData.currentQuestion}/${gameData.questionsPerLevel}`;
        document.getElementById('knowledge-streak').textContent = gameData.streak;
    }

    function completeKnowledgeQuiz() {
        showKnowledgeFeedback(`Quiz completed! Final Score: ${gameData.score}`, 'correct');
        // All levels remain unlocked - no need to unlock next level
    }
}

// MATH QUIZ GAME
function initializeMathQuiz() {
    const gameData = {
        currentLevel: 1,
        currentQuestion: 0,
        score: 0,
        hints: 5,
        questionsPerLevel: 10
    };

    // Level selection - ALL LEVELS UNLOCKED
    const levelButtons = document.querySelectorAll('#math-quiz-game .level-btn');
    levelButtons.forEach(button => {
        const level = parseInt(button.getAttribute('data-level'));
        
        // Make sure all levels are unlocked and clickable
        button.classList.remove('locked');
        button.classList.add('unlocked');
        
        button.addEventListener('click', function() {
            // Allow any level to be started immediately
            gameData.currentLevel = level;
            gameData.currentQuestion = 0;
            gameData.score = 0;
            gameData.hints = 5;
            startMathQuiz(level);
        });
    });

    // Game controls
    const restartBtn = document.getElementById('math-restart-btn');
    const backBtn = document.getElementById('math-back-btn');
    const submitBtn = document.getElementById('math-submit-btn');
    const hintBtn = document.getElementById('math-hint-btn');
    const speakBtn = document.getElementById('math-speak-btn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            gameData.currentQuestion = 0;
            gameData.score = 0;
            gameData.hints = 5;
            startMathQuiz(gameData.currentLevel);
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('math-level-select').style.display = 'block';
            document.getElementById('math-game-play').style.display = 'none';
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => submitMathAnswer());
    }

    if (hintBtn) {
        hintBtn.addEventListener('click', () => showMathHint());
    }

    if (speakBtn) {
        speakBtn.addEventListener('click', () => speakMathQuestion());
    }

    // Math input enter key
    const mathInput = document.getElementById('math-answer-input');
    if (mathInput) {
        mathInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitMathAnswer();
            }
        });
    }

    function startMathQuiz(level) {
        document.getElementById('math-level-select').style.display = 'none';
        document.getElementById('math-game-play').style.display = 'block';
        
        updateMathStats();
        loadMathQuestion();
    }

    function generateMathQuestion(level) {
        let question, answer, hint;
        
        switch(level) {
            case 1: // Addition
                const a1 = Math.floor(Math.random() * 50) + 1;
                const b1 = Math.floor(Math.random() * 50) + 1;
                question = `${a1} + ${b1} = ?`;
                answer = a1 + b1;
                hint = `Try adding ${a1} and ${b1} step by step.`;
                break;
                
            case 2: // Subtraction
                const a2 = Math.floor(Math.random() * 50) + 25;
                const b2 = Math.floor(Math.random() * 25) + 1;
                question = `${a2} - ${b2} = ?`;
                answer = a2 - b2;
                hint = `Try subtracting ${b2} from ${a2}.`;
                break;
                
            case 3: // Multiplication
                const a3 = Math.floor(Math.random() * 12) + 1;
                const b3 = Math.floor(Math.random() * 12) + 1;
                question = `${a3} × ${b3} = ?`;
                answer = a3 * b3;
                hint = `Think of the ${a3} times table.`;
                break;
                
            case 4: // Division
                const b4 = Math.floor(Math.random() * 10) + 2;
                const answer4 = Math.floor(Math.random() * 10) + 1;
                const a4 = b4 * answer4;
                question = `${a4} ÷ ${b4} = ?`;
                answer = answer4;
                hint = `How many times does ${b4} go into ${a4}?`;
                break;
                
            case 5: // Mixed Operations
                const operations = ['+', '-', '×', '÷'];
                const op = operations[Math.floor(Math.random() * operations.length)];
                
                if (op === '+') {
                    const a5 = Math.floor(Math.random() * 30) + 1;
                    const b5 = Math.floor(Math.random() * 30) + 1;
                    question = `${a5} + ${b5} = ?`;
                    answer = a5 + b5;
                    hint = `Add the numbers together.`;
                } else if (op === '-') {
                    const a5 = Math.floor(Math.random() * 50) + 25;
                    const b5 = Math.floor(Math.random() * 25) + 1;
                    question = `${a5} - ${b5} = ?`;
                    answer = a5 - b5;
                    hint = `Subtract the second number from the first.`;
                } else if (op === '×') {
                    const a5 = Math.floor(Math.random() * 10) + 1;
                    const b5 = Math.floor(Math.random() * 10) + 1;
                    question = `${a5} × ${b5} = ?`;
                    answer = a5 * b5;
                    hint = `Multiply the numbers together.`;
                } else {
                    const b5 = Math.floor(Math.random() * 8) + 2;
                    const answer5 = Math.floor(Math.random() * 8) + 1;
                    const a5 = b5 * answer5;
                    question = `${a5} ÷ ${b5} = ?`;
                    answer = answer5;
                    hint = `Divide the first number by the second.`;
                }
                break;
        }
        
        return { question, answer, hint };
    }

    function loadMathQuestion() {
        if (gameData.currentQuestion >= gameData.questionsPerLevel) {
            completeMathQuiz();
            return;
        }

        const questionData = generateMathQuestion(gameData.currentLevel);
        gameData.currentQuestionData = questionData;
        
        document.getElementById('math-question-text').textContent = questionData.question;
        document.getElementById('math-answer-input').value = '';
        document.getElementById('math-feedback').textContent = '';
    }

    function submitMathAnswer() {
        const userAnswer = parseInt(document.getElementById('math-answer-input').value);
        
        if (userAnswer === gameData.currentQuestionData.answer) {
            showMathFeedback('Correct! Well done!', 'correct');
            gameData.score += 10;
            gameData.currentQuestion++;
            setTimeout(() => {
                loadMathQuestion();
                updateMathStats();
            }, 1500);
        } else {
            showMathFeedback('Incorrect. Try again!', 'incorrect');
        }
    }

    function showMathHint() {
        if (gameData.hints > 0) {
            showMathFeedback(`Hint: ${gameData.currentQuestionData.hint}`, 'hint');
            gameData.hints--;
            updateMathStats();
        } else {
            showMathFeedback('No hints remaining!', 'incorrect');
        }
    }

    function speakMathQuestion() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(gameData.currentQuestionData.question);
            speechSynthesis.speak(utterance);
        }
    }

    function showMathFeedback(message, type) {
        const feedback = document.getElementById('math-feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
    }

    function updateMathStats() {
        document.getElementById('math-current-level').textContent = gameData.currentLevel;
        document.getElementById('math-score').textContent = gameData.score;
        document.getElementById('math-progress').textContent = `${gameData.currentQuestion}/${gameData.questionsPerLevel}`;
        document.getElementById('math-hints').textContent = gameData.hints;
    }

    function completeMathQuiz() {
        showMathFeedback(`Level ${gameData.currentLevel} completed! Score: ${gameData.score}`, 'correct');
        // All levels remain unlocked - no need to unlock next level
    }
}