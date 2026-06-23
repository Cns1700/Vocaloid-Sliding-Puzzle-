const container = document.getElementById('puzzle-container');

// Core grid & state parameters
let gridSize = 3; // Default to 3x3 sliding grid
let tiles = []; // 1D representation of the board cells
let blankRow = 2; // Position tracking for empty slot
let blankCol = 2;
let movesCount = 0;
let hintsLeft = 3;

// History tracking to support legal step-by-step backtracking solver
let moveHistory = [];

// Stopwatch parameters
let elapsedSeconds = 0;
let stopwatchInterval = null;
let stopwatchStarted = false;
let isPaused = false;
let gameWon = false;
let wasAutoSolved = false;

// Saved user attempt stats prior to Auto Solve
let attemptTime = "00:00:00";
let attemptMoves = 0;

const themes = {
    'miku-original': { title: 'Hatsune Miku (Original) 🎼', color: '#00ffcc', img: 'Puzzles/Hatsune-Miku/Hatsune-Miku-images/' },
    'miku-supreme': { title: 'Hatsune Miku (Supreme) 👑', color: '#4da6ff', img: 'Puzzles/Hatsune-Miku/Supreme-images/' },
    'miku-honey': { title: 'Hatsune Miku (Honey Whip) 🦋', color: '#ff007f', img: 'Puzzles/Hatsune-Miku/Honey-Whip-images/' },
    'miku-25ji': { title: 'Hatsune Miku (25-ji) ⚫⚪', color: '#ff00ff', img: 'Puzzles/Hatsune-Miku/25-ji-images/' },
    'vflower': { title: 'VFlower (V3) 🌺', color: '#9933ff', img: 'Puzzles/VFlower-V3/' }
};

// Parse URL parameters to fetch the chosen character and image file
const urlParams = new URLSearchParams(window.location.search);
const activeKey = urlParams.get('char') || 'miku-original';
const puzzleFile = urlParams.get('puzzle') || 'Cyber_Miku_1.jpg';

const currentTheme = themes[activeKey] || themes['miku-original'];
const fullImageURL = `${currentTheme.img}${puzzleFile}`;

// Helper function to dynamically wrap emojis in a reset span to strip text-effects and preserve natural system colors
function wrapEmojis(text) {
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    return text.replace(emojiRegex, '<span class="plain-emoji">$1</span>');
}

document.addEventListener('DOMContentLoaded', () => {
    const gameTitleNode = document.getElementById('game-title');
    if (gameTitleNode) {
        gameTitleNode.innerHTML = wrapEmojis(currentTheme.title);
        gameTitleNode.style.textShadow = `0 0 15px ${currentTheme.color}`;
    }
    
    // Apply theme-specific accent color variables
    document.documentElement.style.setProperty('--modal-theme-color', currentTheme.color);

    // Initialize the view board minimize trigger listener
    setupVictoryModalMinimizeButton();

    // Initialize the puzzle grid setup
    setupSlidingPuzzle();
});

function setupSlidingPuzzle() {
    resetStopwatch();
    movesCount = 0;
    updateMovesDisplay();
    gameWon = false;
    wasAutoSolved = false;
    moveHistory = [];
    
    // Reset visual hints count display
    const hintCountNode = document.getElementById('hints-count');
    if (hintCountNode) {
        hintCountNode.textContent = hintsLeft;
    }

    // Load the target image dynamically to extract its natural aspect ratio
    const targetImage = new Image();
    targetImage.onload = function() {
        const imageWidth = targetImage.naturalWidth || 800;
        const imageHeight = targetImage.naturalHeight || 600;
        const imageAspectRatio = imageWidth / imageHeight;

        // Resize the workspace board to perfectly match the original image
        const viewWidth = Math.min(window.innerWidth * 0.9, 650);
        const viewHeight = viewWidth / imageAspectRatio;

        container.style.width = `${viewWidth}px`;
        container.style.height = `${viewHeight}px`;

        buildGrid(viewWidth, viewHeight);
    };
    targetImage.src = fullImageURL;
}

function buildGrid(boardWidth, boardHeight) {
    container.innerHTML = '';
    tiles = [];
    
    const tileWidth = boardWidth / gridSize;
    const tileHeight = boardHeight / gridSize;

    const totalTilesCount = gridSize * gridSize;
    blankRow = gridSize - 1;
    blankCol = gridSize - 1;

    // Generate tiles for all cells except the last slot (which remains empty)
    for (let i = 0; i < totalTilesCount - 1; i++) {
        const tile = document.createElement('div');
        tile.classList.add('puzzle-piece');
        tile.style.width = `${tileWidth}px`;
        tile.style.height = `${tileHeight}px`;

        const correctRow = Math.floor(i / gridSize);
        const correctCol = i % gridSize;

        // Clip background slice parameters corresponding to correct coordinates
        tile.style.backgroundImage = `url('${fullImageURL}')`;
        tile.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;
        tile.style.backgroundPosition = `-${correctCol * tileWidth}px -${correctRow * tileHeight}px`;

        // Create hint helper overlay numbers
        const hintOverlay = document.createElement('span');
        hintOverlay.classList.add('tile-hint-number');
        hintOverlay.textContent = i + 1;
        hintOverlay.style.display = 'none';
        tile.appendChild(hintOverlay);

        // Bind metadata coordinates
        const tileData = {
            id: i,
            correctRow: correctRow,
            correctCol: correctCol,
            currentRow: correctRow,
            currentCol: correctCol,
            element: tile
        };

        // Click handler to trigger sliding transitions
        tile.addEventListener('click', () => {
            if (isPaused || gameWon) return;
            tryMoveTile(tileData);
        });

        tiles.push(tileData);
        container.appendChild(tile);
    }

    // Add empty cell placeholder
    tiles.push(null);

    // Build the final hidden blank tile which fades in on solve completion
    const blankTile = document.createElement('div');
    blankTile.classList.add('puzzle-piece');
    blankTile.id = 'blank-tile-element';
    blankTile.style.width = `${tileWidth}px`;
    blankTile.style.height = `${tileHeight}px`;
    blankTile.style.backgroundImage = `url('${fullImageURL}')`;
    blankTile.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;
    blankTile.style.backgroundPosition = `-${(gridSize - 1) * tileWidth}px -${(gridSize - 1) * tileHeight}px`;
    blankTile.style.left = `${(gridSize - 1) * tileWidth}px`;
    blankTile.style.top = `${(gridSize - 1) * tileHeight}px`;
    blankTile.style.opacity = '0';
    blankTile.style.display = 'none';
    container.appendChild(blankTile);

    // Shuffle the puzzle board through guaranteed solvable sliding moves
    shuffleBoard();
    repositionAllTiles(tileWidth, tileHeight);
}

function tryMoveTile(tile, isInteractive = true) {
    const rowDiff = Math.abs(tile.currentRow - blankRow);
    const colDiff = Math.abs(tile.currentCol - blankCol);

    // Determine if clicked tile is adjacent to the blank cell space
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        if (isInteractive && !stopwatchStarted) {
            startStopwatch();
        }

        // Track and log the moves into history with quick backtrack cancellation optimization
        if (isInteractive) {
            pushMoveToHistory(tile.id);
        }

        // Swap coordinates
        const tempRow = tile.currentRow;
        const tempCol = tile.currentCol;

        tile.currentRow = blankRow;
        tile.currentCol = blankCol;

        blankRow = tempRow;
        blankCol = tempCol;

        // Trigger visual sliding movement translation
        const tileWidth = container.clientWidth / gridSize;
        const tileHeight = container.clientHeight / gridSize;
        tile.element.style.left = `${tile.currentCol * tileWidth}px`;
        tile.element.style.top = `${tile.currentRow * tileHeight}px`;

        if (isInteractive) {
            movesCount++;
            updateMovesDisplay();
            checkVictory();
        }
    }
}

function pushMoveToHistory(tileId) {
    // If the player slides a piece, then immediately slides it back, remove it to optimize solver pathing!
    if (moveHistory.length > 0 && moveHistory[moveHistory.length - 1] === tileId) {
        moveHistory.pop();
    } else {
        moveHistory.push(tileId);
    }
}

function repositionAllTiles(tileWidth, tileHeight) {
    tiles.forEach(tile => {
        if (tile) {
            tile.element.style.left = `${tile.currentCol * tileWidth}px`;
            tile.element.style.top = `${tile.currentRow * tileHeight}px`;
        }
    });
}

function shuffleBoard() {
    const shuffleSteps = gridSize * gridSize * 40;

    for (let step = 0; step < shuffleSteps; step++) {
        // Collect all currently slidable tiles next to the empty cell
        const options = tiles.filter(tile => {
            if (!tile) return false;
            const rowDiff = Math.abs(tile.currentRow - blankRow);
            const colDiff = Math.abs(tile.currentCol - blankCol);
            return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
        });

        if (options.length > 0) {
            // Perform random coordinate swaps
            const choice = options[Math.floor(Math.random() * options.length)];
            
            // Record shuffled coordinate swaps directly into solving path history
            pushMoveToHistory(choice.id);

            const tempRow = choice.currentRow;
            const tempCol = choice.currentCol;

            choice.currentRow = blankRow;
            choice.currentCol = blankCol;

            blankRow = tempRow;
            blankCol = tempCol;
        }
    }
}

function checkVictory() {
    let matchesSolved = true;

    tiles.forEach(tile => {
        if (tile) {
            if (tile.currentRow !== tile.correctRow || tile.currentCol !== tile.correctCol) {
                matchesSolved = false;
            }
        }
    });

    if (matchesSolved) {
        gameWon = true;
        pauseStopwatch();

        // Reveal the missing block segment of the puzzle to complete the image!
        revealBlankTile();

        setTimeout(() => {
            const timeString = formatTime(elapsedSeconds);
            const msgNode = document.getElementById('victory-message');
            const titleNode = document.getElementById('victory-title');
            
            if (wasAutoSolved) {
                if (titleNode) {
                    titleNode.innerHTML = `❌ Try Again?`;
                }
                if (msgNode) {
                    msgNode.innerHTML = `
                        <strong>Your Personal Attempt:</strong><br>
                        ⏱ Time: ${attemptTime} | 🔄 Moves: ${attemptMoves}<br><br>
                        <strong>Auto Solver (Optimal Path):</strong><br>
                        ⏱ Time: ${timeString} | 🔄 Moves: ${movesCount}
                    `;
                }
                setupSharingLinks(attemptTime, attemptMoves, true);
            } else {
                if (titleNode) {
                    titleNode.innerHTML = `🎉 Congratulations!`;
                }
                if (msgNode) {
                    msgNode.innerHTML = `You completed the sliding puzzle in <strong>${timeString}</strong> with <strong>${movesCount}</strong> total moves! 🏆✨`;
                }
                setupSharingLinks(timeString, movesCount, false);
            }
            showVictoryModal();
        }, 600);
    }
}

function revealBlankTile() {
    const blankTile = document.getElementById('blank-tile-element');
    if (blankTile) {
        blankTile.style.display = 'block';
        setTimeout(() => {
            blankTile.style.transition = 'opacity 0.5s ease-in-out';
            blankTile.style.opacity = '1';
        }, 50);
    }
}

function startStopwatch() {
    stopwatchStarted = true;
    const startTimeStamp = Date.now() - (elapsedSeconds * 1000);
    
    stopwatchInterval = setInterval(() => {
        elapsedSeconds = Math.floor((Date.now() - startTimeStamp) / 1000);
        updateTimerDisplay();
    }, 1000);
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    pauseStopwatch();
    elapsedSeconds = 0;
    stopwatchStarted = false;
    isPaused = false;
    updateTimerDisplay();
    
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) pauseBtn.innerHTML = '⏸ Pause';

    const overlay = document.getElementById('pause-modal-overlay');
    if (overlay) overlay.classList.remove('show');
}

function updateTimerDisplay() {
    const displayNode = document.getElementById('timer-display');
    if (displayNode) {
        displayNode.textContent = `⏱ ${formatTime(elapsedSeconds)}`;
    }
}

function updateMovesDisplay() {
    const movesNode = document.getElementById('move-display');
    if (movesNode) {
        movesNode.textContent = `Moves: ${movesCount}`;
    }
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function togglePauseGame() {
    if (!stopwatchStarted || gameWon) return;

    const pauseBtn = document.getElementById('pause-btn');
    const pauseOverlay = document.getElementById('pause-modal-overlay');
    const pieces = container.querySelectorAll('.puzzle-piece');

    isPaused = !isPaused;

    if (isPaused) {
        pauseStopwatch();
        if (pauseBtn) pauseBtn.innerHTML = '▶ Resume';
        if (pauseOverlay) pauseOverlay.classList.add('show');
        pieces.forEach(p => p.style.opacity = '0');
    } else {
        startStopwatch();
        if (pauseBtn) pauseBtn.innerHTML = '⏸ Pause';
        if (pauseOverlay) pauseOverlay.classList.remove('show');
        pieces.forEach(p => p.style.opacity = '1');
    }
}

function triggerHint() {
    if (isPaused || gameWon || hintsLeft <= 0) return;

    hintsLeft--;
    const hintCountNode = document.getElementById('hints-count');
    if (hintCountNode) {
        hintCountNode.textContent = hintsLeft;
    }

    // Toggle on visible text overlays
    const hintNumbers = container.querySelectorAll('.tile-hint-number');
    hintNumbers.forEach(num => num.style.display = 'block');

    // Automatically clean up numbers overlay after 4 seconds
    setTimeout(() => {
        hintNumbers.forEach(num => num.style.display = 'none');
    }, 4000);
}

function triggerAutoSolve() {
    if (isPaused || gameWon) return;

    // Save actual user game attempt statistics prior to Auto Solving
    attemptTime = formatTime(elapsedSeconds);
    attemptMoves = movesCount;

    pauseStopwatch();
    
    // Set game parameters
    wasAutoSolved = true;

    // Reset visual board stopwatch and move tally to show optimal metrics dynamically in real-time
    elapsedSeconds = 0;
    movesCount = 0;
    updateTimerDisplay();
    updateMovesDisplay();

    // Start clock running specifically for the solver's execution run
    let solverStartTime = Date.now();
    let solverStopwatch = setInterval(() => {
        elapsedSeconds = Math.floor((Date.now() - solverStartTime) / 1000);
        updateTimerDisplay();
    }, 1000);

    // Periodical stepping speed configuration (300ms per slide is visually clear, moderate and clean!)
    const stepDuration = 300;

    const solveInterval = setInterval(() => {
        if (moveHistory.length === 0) {
            clearInterval(solveInterval);
            clearInterval(solverStopwatch);
            checkVictory();
            return;
        }

        // Pop last move, finding tile to slide reverse-directionally into blankRow/blankCol
        const lastTileId = moveHistory.pop();
        const tileToSlide = tiles.find(t => t && t.id === lastTileId);
        
        if (tileToSlide) {
            // Legally shift the selected tile directly into empty adjacent slot
            tryMoveTile(tileToSlide, false);
            movesCount++;
            updateMovesDisplay();
        }
    }, stepDuration);
}

function setupSharingLinks(timeString, moves, isAuto) {
    const currentURL = encodeURIComponent(window.location.href);
    let textPrompt = "";
    if (isAuto) {
        textPrompt = `I attempted this ${currentTheme.title} Sliding Puzzle! My personal attempt before Auto Solve was ${timeString} with ${moves} moves! Can you solve it faster? 🧩✨`;
    } else {
        textPrompt = `I just solved the ${currentTheme.title} sliding puzzle in ${timeString} with only ${moves} moves! Can you beat my score? 🧩✨`;
    }
    const encodedText = encodeURIComponent(textPrompt);

    // X / Twitter Sharing
    const xBtn = document.getElementById('share-x-btn');
    if (xBtn) {
        xBtn.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${currentURL}`;
    }

    // Facebook Sharing
    const fbBtn = document.getElementById('share-fb-btn');
    if (fbBtn) {
        fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}&quote=${encodedText}`;
    }
}

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

function shareInstagram() {
    const displayTime = wasAutoSolved ? attemptTime : formatTime(elapsedSeconds);
    const displayMoves = wasAutoSolved ? attemptMoves : movesCount;
    showToast(`Time: ${displayTime} | Moves: ${displayMoves}. Take a screenshot of your solved board and share it to your story! 📸🌟`);
}

function showModificationModal() {
    const overlay = document.getElementById('mod-modal-overlay');
    const input = document.getElementById('grid-size-input');
    if (input) input.value = gridSize;
    if (overlay) overlay.classList.add('show');
}

function hideModificationModal() {
    const overlay = document.getElementById('mod-modal-overlay');
    if (overlay) overlay.classList.remove('show');
}

function submitGridModification() {
    const input = document.getElementById('grid-size-input');
    const size = parseInt(input.value);
    
    if (isNaN(size) || size < 3 || size > 8) {
        input.style.borderColor = "#ff007f";
        setTimeout(() => { input.style.borderColor = ""; }, 1000);
        return;
    }
    
    gridSize = size;
    hideModificationModal();
    setupSlidingPuzzle();
}

function showVictoryModal() {
    const overlay = document.getElementById('victory-modal-overlay');
    if (overlay) overlay.classList.add('show');
}

function restartCurrentPuzzle() {
    const overlay = document.getElementById('victory-modal-overlay');
    if (overlay) overlay.classList.remove('show');
    setupSlidingPuzzle();
}

function setupVictoryModalMinimizeButton() {
    const actions = document.querySelector('#victory-modal-overlay .modal-actions');
    if (!actions) return;

    if (!document.getElementById('minimize-victory-btn')) {
        const minBtn = document.createElement('button');
        minBtn.id = 'minimize-victory-btn';
        minBtn.className = 'modal-btn cancel';
        minBtn.innerHTML = 'View Board 🖼️';
        minBtn.addEventListener('click', () => {
            const overlay = document.getElementById('victory-modal-overlay');
            if (overlay) overlay.classList.remove('show');
            showRestoreButton();
        });
        actions.appendChild(minBtn);
    }
}

function showRestoreButton() {
    let restoreBtn = document.getElementById('restore-victory-modal-btn');
    if (!restoreBtn) {
        restoreBtn = document.createElement('button');
        restoreBtn.id = 'restore-victory-modal-btn';
        restoreBtn.className = 'size-btn';
        restoreBtn.style.position = 'fixed';
        restoreBtn.style.bottom = '20px';
        restoreBtn.style.right = '20px';
        restoreBtn.style.zIndex = '100001';
        restoreBtn.style.boxShadow = `0 0 15px ${currentTheme.color}`;
        restoreBtn.style.borderColor = currentTheme.color;
        restoreBtn.innerHTML = '🏆 Show Victory Menu';
        restoreBtn.addEventListener('click', () => {
            const overlay = document.getElementById('victory-modal-overlay');
            if (overlay) overlay.classList.add('show');
            restoreBtn.style.display = 'none';
        });
        document.body.appendChild(restoreBtn);
    }
    restoreBtn.style.display = 'block';
}