/* ============================================================
   Vocaloid Sliding Puzzle — engine_logic.js
   Cleaned + real A* Auto Solve (Item 1–3 combined review)

   Sections (search for "===="):
     1. GLOBAL STATE & THEMES
     2. BOARD STATE KEYS & HISTORY
     3. SETUP / GRID BUILD / SHUFFLE
     4. MOVE HANDLING
     5. A* SOLVER (Auto Solve)
     6. VICTORY & CERTIFICATE
     7. STOPWATCH / PAUSE / HINT
     8. MODALS & UI HELPERS
     9. RECORDS / PEEK / DAILY
   ============================================================ */

// ============================================================
// 1. GLOBAL STATE & THEMES
// ============================================================

const container = document.getElementById('puzzle-container');

// Core grid & state parameters
let gridRows = 3;
let gridCols = 3;
let pendingGridSize = 3;
let tiles = [];          // array of tile objects (or null for blank slot in the logical array)
let blankRow = 2;
let blankCol = 2;
let movesCount = 0;
let hintsLeft = 3;
let peeksLeft = 3;
let isDailyRun = false;

// History tracking (used for cycle pruning during play + shuffle, and as A* fallback)
let moveHistory = [];
let stateHistory = [];
let visitedStates = new Set();

// Stopwatch / game flags
let elapsedSeconds = 0;
let stopwatchInterval = null;
let stopwatchStarted = false;
let isPaused = false;
let pausedForGridModal = false;
let pausedForPeek = false;
let peekActive = false;
let heldPauseOverlay = false;
let gameWon = false;
let wasAutoSolved = false;
let isAutoSolving = false;

// Saved user attempt stats prior to Auto Solve
let attemptTime = "00:00:00";
let attemptMoves = 0;

// Accessibility focus restoration
let lastFocusedElement = null;

const themes = {
    'miku-original': { title: 'Hatsune Miku (Original) 🎼', color: '#00ffcc', img: 'Puzzles/Hatsune-Miku/Hatsune-Miku-images/' },
    'miku-supreme':  { title: 'Hatsune Miku (Supreme) 👑',  color: '#4da6ff', img: 'Puzzles/Hatsune-Miku/Supreme-images/' },
    'miku-honey':    { title: 'Hatsune Miku (Honey Whip) 🦋', color: '#ff007f', img: 'Puzzles/Hatsune-Miku/Honey-Whip-images/' },
    'miku-25ji':     { title: 'Hatsune Miku (25-ji) ⚫⚪',   color: '#ff00ff', img: 'Puzzles/Hatsune-Miku/25-ji-images/' },
    'vflower':       { title: 'VFlower (V3) 🌺',            color: '#9933ff', img: 'Puzzles/VFlower-V3/' }
};

const urlParams = new URLSearchParams(window.location.search);
const activeKey = urlParams.get('char') || 'miku-original';
const puzzleFile = urlParams.get('puzzle') || 'Cyber_Miku_1.jpg';
const currentTheme = themes[activeKey] || themes['miku-original'];
const fullImageURL = `${currentTheme.img}${puzzleFile}`;
isDailyRun = urlParams.get('daily') === '1';
const urlRows = parseInt(urlParams.get('rows'), 10);
const urlCols = parseInt(urlParams.get('cols'), 10);
if (!isNaN(urlRows) && urlRows >= 3 && urlRows <= 8) gridRows = urlRows;
if (!isNaN(urlCols) && urlCols >= 3 && urlCols <= 8) gridCols = urlCols;

// Helper: wrap emojis so text-shadow / effects do not recolor them
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
    document.documentElement.style.setProperty('--modal-theme-color', currentTheme.color);
    setupVictoryModalMinimizeButton();
    if (typeof updateRankPanel === 'function') updateRankPanel();
    if (isDailyRun) {
        const titleNode = document.getElementById('game-title');
        if (titleNode) {
            titleNode.innerHTML = wrapEmojis('Daily Stage · ' + currentTheme.title);
        }
    }
    setupSlidingPuzzle();
});


// ============================================================
// 2. BOARD STATE KEYS & HISTORY
// ============================================================

/** Compact unique key of the current board for cycle detection. */
function getBoardStateKey() {
    const total = gridRows * gridCols;
    const stateGrid = new Array(total);
    for (let i = 0; i < total; i++) stateGrid[i] = -1;

    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (tile) {
            stateGrid[tile.currentRow * gridCols + tile.currentCol] = tile.id;
        }
    }
    stateGrid[blankRow * gridCols + blankCol] = -1;
    return stateGrid.join(',');
}

/**
 * Records a move and prunes cycles (player returned to a previous board state).
 * Keeps an ordered path so moveHistory can be truncated correctly.
 */
function pushMoveToHistory(tileId) {
    const currentState = getBoardStateKey();

    if (visitedStates.has(currentState)) {
        const existingIndex = stateHistory.indexOf(currentState);
        if (existingIndex !== -1) {
            stateHistory.length = existingIndex + 1;
            moveHistory.length = existingIndex;
            visitedStates = new Set(stateHistory);
        }
    } else {
        stateHistory.push(currentState);
        moveHistory.push(tileId);
        visitedStates.add(currentState);
    }
}


// ============================================================
// 3. SETUP / GRID BUILD / SHUFFLE
// ============================================================

function setupSlidingPuzzle() {
    resetStopwatch();
    movesCount = 0;
    updateMovesDisplay();
    gameWon = false;
    wasAutoSolved = false;
    hintsLeft = 3;
    peeksLeft = 3;
    moveHistory = [];
    stateHistory = [];
    visitedStates = new Set();

    const hintCountNode = document.getElementById('hints-count');
    if (hintCountNode) hintCountNode.textContent = hintsLeft;
    const peekCountNode = document.getElementById('peeks-count');
    if (peekCountNode) peekCountNode.textContent = peeksLeft;
    const hintBtn = document.getElementById('hint-btn');
    const peekBtn = document.getElementById('peek-btn');
    if (hintBtn) hintBtn.disabled = hintsLeft <= 0;
    if (peekBtn) peekBtn.disabled = peeksLeft <= 0;

    const certWrapper = document.getElementById('certificate-render-area');
    if (certWrapper) certWrapper.innerHTML = '';

    const targetImage = new Image();
    targetImage.onload = function () {
        const imageWidth = targetImage.naturalWidth || 800;
        const imageHeight = targetImage.naturalHeight || 600;

        // Fit board inside a shared "play area" so landscape and portrait
        // both land at similar on-screen sizes (no giant portrait boards).
        // Leave room for header + control bar + itch embed chrome.
        const maxW = Math.min(window.innerWidth * 0.72, 600);
        const maxH = Math.min(window.innerHeight * 0.58, 520);

        const scale = Math.min(maxW / imageWidth, maxH / imageHeight);
        const viewWidth = Math.max(180, Math.round(imageWidth * scale));
        const viewHeight = Math.max(180, Math.round(imageHeight * scale));

        container.style.width = `${viewWidth}px`;
        container.style.height = `${viewHeight}px`;

        buildGrid(viewWidth, viewHeight);
        if (typeof updateRankPanel === 'function') updateRankPanel();
    };
    targetImage.src = fullImageURL;
}

function buildGrid(boardWidth, boardHeight) {
    container.innerHTML = '';
    tiles = [];

    const tileWidth = boardWidth / gridCols;
    const tileHeight = boardHeight / gridRows;
    const totalTilesCount = gridRows * gridCols;

    blankRow = gridRows - 1;
    blankCol = gridCols - 1;

    for (let i = 0; i < totalTilesCount - 1; i++) {
        const tile = document.createElement('button');
        tile.classList.add('puzzle-piece');
        tile.setAttribute('type', 'button');
        tile.style.width = `${tileWidth}px`;
        tile.style.height = `${tileHeight}px`;

        const correctRow = Math.floor(i / gridCols);
        const correctCol = i % gridCols;

        tile.style.backgroundImage = `url('${fullImageURL}')`;
        tile.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;
        tile.style.backgroundPosition = `-${correctCol * tileWidth}px -${correctRow * tileHeight}px`;

        const hintOverlay = document.createElement('span');
        hintOverlay.classList.add('tile-hint-number');
        hintOverlay.textContent = i + 1;
        hintOverlay.style.display = 'none';
        tile.appendChild(hintOverlay);

        tile.setAttribute('aria-label', `Tile ${i + 1}. Position: Row ${correctRow + 1}, Column ${correctCol + 1}`);

        const tileData = {
            id: i,
            correctRow,
            correctCol,
            currentRow: correctRow,
            currentCol: correctCol,
            element: tile
        };

        tile.addEventListener('click', () => {
            if (isPaused || gameWon || isAutoSolving || peekActive) return;
            tryMoveTile(tileData);
        });

        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isPaused || gameWon || isAutoSolving || peekActive) return;
                tryMoveTile(tileData);
            }
        });

        tiles.push(tileData);
        container.appendChild(tile);
    }

    tiles.push(null); // logical blank slot

    // Hidden blank tile that fades in on solve
    const blankTile = document.createElement('div');
    blankTile.classList.add('puzzle-piece');
    blankTile.id = 'blank-tile-element';
    blankTile.style.width = `${tileWidth}px`;
    blankTile.style.height = `${tileHeight}px`;
    blankTile.style.backgroundImage = `url('${fullImageURL}')`;
    blankTile.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;
    blankTile.style.backgroundPosition = `-${(gridCols - 1) * tileWidth}px -${(gridRows - 1) * tileHeight}px`;
    blankTile.style.left = `${(gridCols - 1) * tileWidth}px`;
    blankTile.style.top = `${(gridRows - 1) * tileHeight}px`;
    blankTile.style.opacity = '0';
    blankTile.style.display = 'none';
    blankTile.setAttribute('aria-hidden', 'true');
    container.appendChild(blankTile);

    shuffleBoard();
    repositionAllTiles(tileWidth, tileHeight);
}

/**
 * Shuffle by performing only legal slides from the solved position.
 * Guarantees solvability. Uses a lighter step count + avoids immediate reverses
 * for better mixing with less work.
 */
function shuffleBoard() {
    const shuffleSteps = Math.min(gridRows * gridCols * 18, 700);

    moveHistory = [];
    stateHistory = [];
    visitedStates = new Set();

    const startKey = getBoardStateKey();
    stateHistory.push(startKey);
    visitedStates.add(startKey);

    let lastMovedId = -1;

    for (let step = 0; step < shuffleSteps; step++) {
        const options = [];
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            if (!tile) continue;
            const rowDiff = Math.abs(tile.currentRow - blankRow);
            const colDiff = Math.abs(tile.currentCol - blankCol);
            if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
                if (tile.id !== lastMovedId || options.length === 0) {
                    options.push(tile);
                }
            }
        }

        if (options.length === 0) {
            for (let i = 0; i < tiles.length; i++) {
                const tile = tiles[i];
                if (!tile) continue;
                const rowDiff = Math.abs(tile.currentRow - blankRow);
                const colDiff = Math.abs(tile.currentCol - blankCol);
                if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
                    options.push(tile);
                }
            }
        }

        if (options.length === 0) break;

        const choice = options[Math.floor(Math.random() * options.length)];
        lastMovedId = choice.id;

        const tempRow = choice.currentRow;
        const tempCol = choice.currentCol;
        choice.currentRow = blankRow;
        choice.currentCol = blankCol;
        blankRow = tempRow;
        blankCol = tempCol;

        const currentState = getBoardStateKey();
        if (visitedStates.has(currentState)) {
            const existingIndex = stateHistory.indexOf(currentState);
            if (existingIndex !== -1) {
                stateHistory.length = existingIndex + 1;
                moveHistory.length = existingIndex;
                visitedStates = new Set(stateHistory);
            }
        } else {
            stateHistory.push(currentState);
            moveHistory.push(choice.id);
            visitedStates.add(currentState);
        }
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


// ============================================================
// 4. MOVE HANDLING
// ============================================================

function tryMoveTile(tile, isInteractive = true) {
    if (isInteractive && (isPaused || gameWon || peekActive)) return;
    const rowDiff = Math.abs(tile.currentRow - blankRow);
    const colDiff = Math.abs(tile.currentCol - blankCol);

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        if (isInteractive && !stopwatchStarted) {
            startStopwatch();
        }

        const tempRow = tile.currentRow;
        const tempCol = tile.currentCol;
        tile.currentRow = blankRow;
        tile.currentCol = blankCol;
        blankRow = tempRow;
        blankCol = tempCol;

        const tileWidth = container.clientWidth / gridCols;
        const tileHeight = container.clientHeight / gridRows;
        tile.element.style.left = `${tile.currentCol * tileWidth}px`;
        tile.element.style.top = `${tile.currentRow * tileHeight}px`;

        tile.element.setAttribute(
            'aria-label',
            `Tile ${tile.id + 1}. Position: Row ${tile.currentRow + 1}, Column ${tile.currentCol + 1}`
        );

        if (isInteractive) {
            pushMoveToHistory(tile.id);
            movesCount++;
            updateMovesDisplay();
            checkVictory();
        }
    }
}


// ============================================================
// 5. A* SOLVER (Auto Solve)
// ============================================================

/**
 * Build a flat state array [id or -1, ...] from the live board.
 */
function snapshotState() {
    const total = gridRows * gridCols;
    const state = new Array(total).fill(-1);
    for (let i = 0; i < tiles.length; i++) {
        const t = tiles[i];
        if (t) state[t.currentRow * gridCols + t.currentCol] = t.id;
    }
    state[blankRow * gridCols + blankCol] = -1;
    return state;
}

/** Manhattan distance heuristic for a flat state. */
function manhattanHeuristic(state, rows, cols) {
    let dist = 0;
    for (let i = 0; i < state.length; i++) {
        const id = state[i];
        if (id === -1) continue;
        const goalRow = Math.floor(id / cols);
        const goalCol = id % cols;
        const curRow = Math.floor(i / cols);
        const curCol = i % cols;
        dist += Math.abs(goalRow - curRow) + Math.abs(goalCol - curCol);
    }
    return dist;
}

/**
 * A* search. Returns an ordered list of tile IDs to move (blank swaps with that tile),
 * or null if the node budget is exhausted.
 *
 * For grids larger than ~5×5 the state space grows quickly; a soft node limit
 * prevents the browser from freezing. On timeout we fall back to the recorded
 * shuffle path (always solvable).
 */
function solveWithAStar(maxNodes = 80000) {
    const rows = gridRows;
    const cols = gridCols;
    const total = rows * cols;
    const start = snapshotState();

    // Already solved?
    let solved = true;
    for (let i = 0; i < total - 1; i++) {
        if (start[i] !== i) { solved = false; break; }
    }
    if (solved && start[total - 1] === -1) return [];

    const startKey = start.join(',');
    const open = []; // simple array priority queue (fine for this node budget)
    const cameFrom = new Map(); // key -> { prevKey, movedTileId }
    const gScore = new Map();

    open.push({ key: startKey, state: start, g: 0, f: manhattanHeuristic(start, rows, cols) });
    gScore.set(startKey, 0);

    let nodes = 0;

    while (open.length > 0 && nodes < maxNodes) {
        // Pop lowest f (linear scan is acceptable at this scale)
        let bestIdx = 0;
        for (let i = 1; i < open.length; i++) {
            if (open[i].f < open[bestIdx].f) bestIdx = i;
        }
        const current = open.splice(bestIdx, 1)[0];
        nodes++;

        // Goal test
        let isGoal = true;
        for (let i = 0; i < total - 1; i++) {
            if (current.state[i] !== i) { isGoal = false; break; }
        }
        if (isGoal && current.state[total - 1] === -1) {
            // Reconstruct path of tile IDs
            const path = [];
            let key = current.key;
            while (cameFrom.has(key)) {
                const info = cameFrom.get(key);
                path.push(info.movedTileId);
                key = info.prevKey;
            }
            path.reverse();
            return path;
        }

        // Locate blank
        let blankIdx = current.state.indexOf(-1);
        const br = Math.floor(blankIdx / cols);
        const bc = blankIdx % cols;

        const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of deltas) {
            const nr = br + dr;
            const nc = bc + dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

            const neighborIdx = nr * cols + nc;
            const movedTileId = current.state[neighborIdx];

            // Swap blank with the neighbor tile
            const nextState = current.state.slice();
            nextState[blankIdx] = movedTileId;
            nextState[neighborIdx] = -1;
            const nextKey = nextState.join(',');

            const tentativeG = current.g + 1;
            if (tentativeG >= (gScore.get(nextKey) ?? Infinity)) continue;

            gScore.set(nextKey, tentativeG);
            cameFrom.set(nextKey, { prevKey: current.key, movedTileId });
            const f = tentativeG + manhattanHeuristic(nextState, rows, cols);
            open.push({ key: nextKey, state: nextState, g: tentativeG, f });
        }
    }

    return null; // budget exhausted
}

/**
 * Animate a sequence of tile IDs (the solution path).
 */
function animateSolutionPath(path, onDone) {
    if (!path || path.length === 0) {
        onDone();
        return;
    }

    // Fast lookup: id → tile object
    const tileById = new Map();
    tiles.forEach(t => { if (t) tileById.set(t.id, t); });

    let idx = 0;
    const stepMs = Math.max(60, Math.min(180, Math.floor(1600 / path.length)));

    const timer = setInterval(() => {
        if (idx >= path.length) {
            clearInterval(timer);
            onDone();
            return;
        }
        const tile = tileById.get(path[idx]);
        if (tile) {
            tryMoveTile(tile, false);
            movesCount++;
            updateMovesDisplay();
        }
        idx++;
    }, stepMs);
}

function triggerAutoSolve() {
    if (isPaused || gameWon || isAutoSolving || peekActive) return;

    attemptTime = formatTime(elapsedSeconds);
    attemptMoves = movesCount;

    pauseStopwatch();
    wasAutoSolved = true;
    isAutoSolving = true;

    elapsedSeconds = 0;
    movesCount = 0;
    updateTimerDisplay();
    updateMovesDisplay();

    const solverStartTime = Date.now();
    const solverStopwatch = setInterval(() => {
        elapsedSeconds = Math.floor((Date.now() - solverStartTime) / 1000);
        updateTimerDisplay();
    }, 1000);

    // Immediate feedback so the UI does not feel frozen while A* runs
    const cells = gridRows * gridCols;
    showToast(cells > 16 ? 'Solver searching…' : 'Solving…');

    // Adaptive node budget — larger grids fail over to the recorded path
    // sooner so the tab stays responsive.
    let nodeBudget = 25000;
    if (cells <= 9) nodeBudget = 50000;
    else if (cells <= 16) nodeBudget = 60000;
    else if (cells <= 25) nodeBudget = 40000;

    // Yield two frames so the toast and button state can paint first
    requestAnimationFrame(() => {
        setTimeout(() => {
            const path = solveWithAStar(nodeBudget);

            const finish = () => {
                isAutoSolving = false;
                clearInterval(solverStopwatch);
                checkVictory();
            };

            if (path !== null) {
                animateSolutionPath(path, finish);
            } else {
                showToast('Search budget reached — using recorded path');
                const fallback = moveHistory.slice().reverse();
                moveHistory = [];
                animateSolutionPath(fallback, finish);
            }
        }, 30);
    });
}


// ============================================================
// 6. VICTORY & CERTIFICATE
// ============================================================

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
        revealBlankTile();

        setTimeout(() => {
            const timeString = formatTime(elapsedSeconds);
            const msgNode = document.getElementById('victory-message');
            const titleNode = document.getElementById('victory-title');

            if (wasAutoSolved) {
                if (titleNode) titleNode.innerHTML = `❌ Auto-Solved!`;
                if (msgNode) {
                    msgNode.innerHTML = `
                        <strong>Your Personal Attempt:</strong><br>
                        ⏱ Time: ${attemptTime} | 🔄 Moves: ${attemptMoves}<br><br>
                        <strong>Auto Solver:</strong><br>
                        ⏱ Time: ${timeString} | 🔄 Moves: ${movesCount}
                    `;
                }
            } else {
                if (titleNode) titleNode.innerHTML = `Congratulations!`;
                if (msgNode) {
                    const starN = vspComputeStars(false, movesCount, elapsedSeconds, gridRows, gridCols);
                    const rank = typeof vspRankMeta === 'function' ? vspRankMeta(starN) : { label: 'Rank ' + starN };
                    const trophy = typeof vspTrophyMarkup === 'function'
                        ? vspTrophyMarkup(starN, 16)
                        : (typeof vspTrophySvg === 'function' ? vspTrophySvg(starN, 16) : '');
                    msgNode.innerHTML = `You finished in <strong>${timeString}</strong> with <strong>${movesCount}</strong> moves.<br>
                    <span class="victory-rank-line">Rank: <strong class="star-rank">${trophy}${rank.label}</strong></span>${isDailyRun ? '<br>Daily stage recorded.' : ''}`;
                }
            }

            if (!wasAutoSolved) {
                vspRecordManualClear({
                    charKey: activeKey,
                    puzzleName: puzzleFile,
                    rows: gridRows,
                    cols: gridCols,
                    seconds: elapsedSeconds,
                    moves: movesCount,
                    stars: vspComputeStars(false, movesCount, elapsedSeconds, gridRows, gridCols),
                    isDaily: isDailyRun
                });
                if (typeof updateRankPanel === 'function') updateRankPanel();
            }

            const openCert = (playerName) => {
                generateCertificateImage(wasAutoSolved, timeString, movesCount, playerName);
                showVictoryModal();
            };
            if (wasAutoSolved) {
                openCert('Auto Solver System');
            } else if (typeof vspOpenNamePicker === 'function') {
                vspOpenNamePicker(openCert);
            } else {
                const fallbackName = (typeof vspFormatPlayerName === 'function' && typeof vspNameState !== 'undefined')
                    ? (vspFormatPlayerName(vspNameState) || 'Player')
                    : 'Player';
                openCert(fallbackName);
            }
        }, 600);
    }
}

/**
 * Certificate generator
 * - Canvas keeps the puzzle image’s aspect ratio (no stretch)
 * - Longest side capped at 1280 (readable download + fits the modal)
 * - Image is drawn with “contain” inside the frame (letterbox/pillarbox if needed)
 * - Text scale is clamped so titles never spill outside the border
 */
function generateCertificateImage(isAuto, timeStr, movesVal, playerName) {
    const certWrapper = document.getElementById('certificate-render-area');
    if (!certWrapper) return;
    certWrapper.innerHTML = `<p style="font-size: 0.85rem; color: #a0aec0;">Generating secure result certificate... 🎨</p>`;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = function () {
        const paintCert = () => {
        const natW = bgImg.naturalWidth || 1920;
        const natH = bgImg.naturalHeight || 1080;

        // Aspect-correct canvas, moderate max size for modal + download
        const MAX_SIDE = 1280;
        let canvasW, canvasH;
        if (natW >= natH) {
            canvasW = Math.min(natW, MAX_SIDE);
            canvasH = Math.max(1, Math.round(canvasW * (natH / natW)));
        } else {
            canvasH = Math.min(natH, MAX_SIDE);
            canvasW = Math.max(1, Math.round(canvasH * (natW / natH)));
        }

        const canvas = document.createElement('canvas');
        canvas.width = canvasW;
        canvas.height = canvasH;
        const ctx = canvas.getContext('2d');

        // Clamped scale — prevents huge fonts on tall portrait certs
        const shortSide = Math.min(canvasW, canvasH);
        const s = Math.min(1.25, Math.max(0.85, shortSide / 520));

        const theme = currentTheme.color;
        const margin = Math.max(16, Math.round(22 * s));       // outer frame inset
        const frameThick = Math.max(5, Math.round(7 * s));
        const contentPad = margin + frameThick + Math.round(10 * s); // safe area inside frame

        // ---- Background: fill the area INSIDE the outer frame only ----
        // Canvas aspect already matches the image, so this fills the inner
        // rectangle with no stretch and no letterboxing dead space.
        // The image never crosses the first (outer) border.
        ctx.fillStyle = "#0a1018";
        ctx.fillRect(0, 0, canvasW, canvasH);

        const imgInset = margin; // stop at the outer frame edge
        const imgW = canvasW - imgInset * 2;
        const imgH = canvasH - imgInset * 2;
        ctx.drawImage(bgImg, imgInset, imgInset, imgW, imgH);

        // Dark overlay for text readability
        ctx.fillStyle = "rgba(8, 14, 22, 0.78)";
        ctx.fillRect(0, 0, canvasW, canvasH);

        // ---- Multi-layer certificate frame (drawn after image so it sits on top) ----
        ctx.strokeStyle = theme;
        ctx.lineWidth = frameThick;
        ctx.strokeRect(margin, margin, canvasW - margin * 2, canvasH - margin * 2);

        const mid = margin + Math.round(6 * s);
        ctx.strokeStyle = theme;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = Math.max(1, Math.round(2 * s));
        ctx.strokeRect(mid, mid, canvasW - mid * 2, canvasH - mid * 2);
        ctx.globalAlpha = 1;

        const inner = margin + Math.round(12 * s);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = Math.max(1, Math.round(1.5 * s));
        ctx.strokeRect(inner, inner, canvasW - inner * 2, canvasH - inner * 2);

        // Corner brackets
        const cornerLen = Math.max(16, Math.round(28 * s));
        const cPad = margin + Math.round(2 * s);
        ctx.strokeStyle = theme;
        ctx.lineWidth = Math.max(2, Math.round(3 * s));
        ctx.beginPath();
        ctx.moveTo(cPad, cPad + cornerLen); ctx.lineTo(cPad, cPad); ctx.lineTo(cPad + cornerLen, cPad);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvasW - cPad - cornerLen, cPad); ctx.lineTo(canvasW - cPad, cPad); ctx.lineTo(canvasW - cPad, cPad + cornerLen);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cPad, canvasH - cPad - cornerLen); ctx.lineTo(cPad, canvasH - cPad); ctx.lineTo(cPad + cornerLen, canvasH - cPad);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvasW - cPad - cornerLen, canvasH - cPad); ctx.lineTo(canvasW - cPad, canvasH - cPad); ctx.lineTo(canvasW - cPad, canvasH - cPad - cornerLen);
        ctx.stroke();

        // ---- Typography (orientation-aware, width-safe) ----
        const cx = canvasW / 2;
        const isPortrait = canvasH > canvasW * 1.05;
        // Extra side padding so measured text never kisses the frame
        const maxTextW = canvasW - contentPad * 2 - Math.round(16 * s);

        function fitFont(basePx, text, fontFamily, weight, limitW) {
            const limit = limitW != null ? limitW : maxTextW;
            let size = basePx;
            ctx.font = `${weight} ${size}px ${fontFamily}`;
            // 0.96 safety factor accounts for font fallback / anti-alias width variance
            while (size > 9 && ctx.measureText(text).width > limit * 0.96) {
                size -= 1;
                ctx.font = `${weight} ${size}px ${fontFamily}`;
            }
            return size;
        }

        const titleFull = "VOCALOID PUZZLE RECORD";
        const titleLine1 = "VOCALOID";
        const titleLine2 = "PUZZLE RECORD";
        const stampText = isAuto ? "AUTO-SOLVED RECORD" : "LEGITIMATE MANUAL PLAY";
        const statusLine = isAuto
            ? "⚠ SECURITY STATUS: NOT ELIGIBLE FOR LEADERBOARD ⚠"
            : "🏆 SECURITY STATUS: 100% VERIFIED AUTHENTIC 🏆";

        // Portrait: prefer two-line title + tighter width-based sizes
        // Landscape: single-line title with more generous sizing
        let useTwoLineTitle = false;
        let titleSize;
        if (isPortrait) {
            const singleBase = Math.min(Math.round(canvasW * 0.048), Math.round(26 * s));
            const singleFit = fitFont(singleBase, titleFull, "'Orbitron', 'Segoe UI', sans-serif", "bold");
            // If a single line would shrink below a comfortable size, wrap to two lines
            if (singleFit < Math.round(canvasW * 0.038)) {
                useTwoLineTitle = true;
                titleSize = fitFont(
                    Math.min(Math.round(canvasW * 0.07), Math.round(30 * s)),
                    titleLine2, // longer of the two lines
                    "'Orbitron', 'Segoe UI', sans-serif",
                    "bold"
                );
            } else {
                titleSize = singleFit;
            }
        } else {
            titleSize = fitFont(
                Math.min(Math.round(canvasW * 0.055), Math.round(34 * s)),
                titleFull,
                "'Orbitron', 'Segoe UI', sans-serif",
                "bold"
            );
        }

        const subSize = isPortrait
            ? Math.max(11, Math.min(Math.round(canvasW * 0.032), Math.round(15 * s)))
            : Math.max(13, Math.round(17 * s));
        const bodySize = isPortrait
            ? Math.max(13, Math.min(Math.round(canvasW * 0.038), Math.round(18 * s)))
            : Math.max(15, Math.round(21 * s));
        const labelSize = isPortrait
            ? Math.max(11, Math.min(Math.round(canvasW * 0.03), Math.round(13 * s)))
            : Math.max(12, Math.round(15 * s));
        const valueSize = isPortrait
            ? Math.max(12, Math.min(Math.round(canvasW * 0.034), Math.round(15 * s)))
            : Math.max(14, Math.round(17 * s));
        const stampSize = fitFont(
            isPortrait
                ? Math.min(Math.round(canvasW * 0.048), Math.round(24 * s))
                : Math.min(Math.round(canvasW * 0.05), Math.round(30 * s)),
            stampText,
            "'Orbitron', 'Segoe UI', sans-serif",
            "bold"
        );
        const statusSize = fitFont(
            isPortrait
                ? Math.min(Math.round(canvasW * 0.028), Math.round(12 * s))
                : Math.min(Math.round(canvasW * 0.03), Math.round(14 * s)),
            statusLine,
            "'Segoe UI', sans-serif",
            "bold"
        );

        const cleanTitle = currentTheme.title.replace(
            /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
            ''
        ).trim();
        const masterGreeting = isAuto
            ? "Auto Solver System"
            : String(playerName || (typeof vspFormatPlayerName === 'function' && typeof vspNameState !== 'undefined'
                ? vspFormatPlayerName(vspNameState)
                : '') || "Player");

        // Vertical metrics for the centered stack
        const titleBlockH = useTwoLineTitle
            ? titleSize * 2 + Math.round(6 * s)
            : titleSize;
        const gapTitleToLine = Math.round(10 * s);
        const gapLineToTarget = Math.round(26 * s);
        const gapTargetToAchieved = Math.round(26 * s);
        const gapAchievedToBox = Math.round(20 * s);
        const rowGap = Math.round((isPortrait ? 36 : 40) * s);
        const boxPadY = Math.round(18 * s);
        const boxH = boxPadY * 2 + Math.round(valueSize * 0.9) + rowGap * 3;
        const gapBoxToStamp = Math.round(26 * s);
        const gapStampToStatus = Math.round(22 * s);

        const stackH =
            titleBlockH +
            gapTitleToLine + Math.max(2, Math.round(3 * s)) +
            gapLineToTarget + subSize +
            gapTargetToAchieved + bodySize +
            gapAchievedToBox + boxH +
            gapBoxToStamp + stampSize +
            gapStampToStatus + statusSize;

        const safeTop = contentPad;
        const safeBottom = canvasH - contentPad;
        const safeH = safeBottom - safeTop;
        let stackTop = safeTop + Math.max(0, (safeH - stackH) / 2);
        if (stackTop + stackH > safeBottom) {
            stackTop = Math.max(safeTop, safeBottom - stackH);
        }

        // ---- Draw title ----
        let y = stackTop + (useTwoLineTitle ? titleSize : titleSize);
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${titleSize}px 'Orbitron', 'Segoe UI', sans-serif`;
        ctx.textAlign = "center";
        if (useTwoLineTitle) {
            ctx.fillText(titleLine1, cx, y);
            y += titleSize + Math.round(6 * s);
            ctx.fillText(titleLine2, cx, y);
        } else {
            ctx.fillText(titleFull, cx, y);
        }

        // Accent line
        y += gapTitleToLine;
        const lineW = Math.min(maxTextW * 0.45, Math.round(isPortrait ? 160 * s : 210 * s));
        ctx.fillStyle = theme;
        ctx.fillRect(cx - lineW / 2, y, lineW, Math.max(2, Math.round(3 * s)));

        // Target
        y += gapLineToTarget + subSize;
        ctx.fillStyle = "#e2e8f0";
        ctx.font = `italic ${subSize}px 'Segoe UI', sans-serif`;
        // Fit target line too (long character names)
        const targetLabel = `Target: ${cleanTitle}`;
        let targetDrawSize = subSize;
        ctx.font = `italic ${targetDrawSize}px 'Segoe UI', sans-serif`;
        while (targetDrawSize > 9 && ctx.measureText(targetLabel).width > maxTextW * 0.96) {
            targetDrawSize -= 1;
            ctx.font = `italic ${targetDrawSize}px 'Segoe UI', sans-serif`;
        }
        ctx.fillText(targetLabel, cx, y);

        // Achieved by
        y += gapTargetToAchieved + bodySize;
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${bodySize}px 'Segoe UI', sans-serif`;
        const achievedLabel = `Achieved By: ${masterGreeting}`;
        let achievedSize = bodySize;
        ctx.font = `bold ${achievedSize}px 'Segoe UI', sans-serif`;
        while (achievedSize > 9 && ctx.measureText(achievedLabel).width > maxTextW * 0.96) {
            achievedSize -= 1;
            ctx.font = `bold ${achievedSize}px 'Segoe UI', sans-serif`;
        }
        ctx.fillText(achievedLabel, cx, y);

        // Stats box
        y += gapAchievedToBox;
        const boxW = Math.min(maxTextW, Math.round((isPortrait ? 400 : 460) * s));
        const boxX = (canvasW - boxW) / 2;
        const boxY = y;

        ctx.fillStyle = "rgba(20, 28, 38, 0.94)";
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = Math.max(1, Math.round(1.5 * s));
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        const row1 = boxY + boxPadY + Math.round(valueSize * 0.82);
        const row2 = row1 + rowGap;
        const row3 = row2 + rowGap;
        const row4 = row3 + rowGap;
        const leftX = boxX + Math.round(22 * s);
        const rightX = boxX + boxW - Math.round(22 * s);

        const starN = vspComputeStars(isAuto, movesVal, elapsedSeconds, gridRows, gridCols);
        const rankText = isAuto ? 'UNRANKED' : (typeof vspRankMeta === 'function' ? vspRankMeta(starN).label.toUpperCase() : vspStarGlyphs(starN));

        ctx.textAlign = "left";
        ctx.fillStyle = "#a0aec0";
        ctx.font = `${labelSize}px 'Share Tech Mono', monospace`;
        ctx.fillText("GRID DIMENSION:", leftX, row1);
        ctx.fillText("ELAPSED TIME:", leftX, row2);
        ctx.fillText("TOTAL MOVES:", leftX, row3);
        ctx.fillText("RANK:", leftX, row4);

        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${valueSize}px 'Share Tech Mono', monospace`;
        ctx.fillText(`${gridRows} x ${gridCols} Grid`, rightX, row1);
        ctx.fillText(timeStr, rightX, row2);
        ctx.fillText(String(movesVal), rightX, row3);
        ctx.fillStyle = isAuto ? "#e74c3c" : "#ffd76a";
        ctx.font = `bold ${valueSize}px 'Share Tech Mono', monospace`;
        const rankW = ctx.measureText(rankText).width;
        const trophyImg = (!isAuto && typeof vspTrophyImg === 'function') ? vspTrophyImg(starN) : null;
        if (trophyImg && trophyImg.complete && trophyImg.naturalWidth) {
            const cupSize = Math.round(valueSize * 1.38);
            const cupGap = Math.round(6 * s);
            const cupX = rightX - rankW - cupGap - cupSize;
            const textMid = row4 - valueSize * 0.35;
            const cupY = textMid - cupSize / 2;
            ctx.drawImage(trophyImg, cupX, cupY, cupSize, cupSize);
        }
        ctx.fillText(rankText, rightX, row4);

        // Stamp + status
        y = boxY + boxH + gapBoxToStamp + stampSize;
        ctx.textAlign = "center";
        ctx.font = `bold ${stampSize}px 'Orbitron', 'Segoe UI', sans-serif`;
        if (isAuto) {
            ctx.fillStyle = "rgba(250, 107, 91, 0.75)";
            ctx.fillText(stampText, cx, y);
            ctx.fillStyle = "#e74c3c";
        } else {
            ctx.fillStyle = "rgba(128, 255, 195, 0.75)";
            ctx.fillText(stampText, cx, y);
            ctx.fillStyle = "#2ecc71";
        }
        y += gapStampToStatus + statusSize;
        ctx.font = `bold ${statusSize}px 'Segoe UI', sans-serif`;
        ctx.fillText(statusLine, cx, y);

        // ---- Output ----
        const finalImgUrl = canvas.toDataURL("image/png");
        certWrapper.innerHTML = `
            <div class="generated-cert-container">
                <img src="${finalImgUrl}" alt="Certified Puzzle Result" class="cert-image-preview">
                <div class="cert-actions">
                    <a href="${finalImgUrl}" download="Vocaloid_Puzzle_Result.png" class="modal-btn confirm" style="text-decoration:none; display:inline-block;">💾 Download Certificate</a>
                    <button id="copy-cert-img-btn" class="modal-btn cancel">📋 Copy Image</button>
                </div>
            </div>
        `;

        const copyImgBtn = document.getElementById('copy-cert-img-btn');
        if (copyImgBtn) {
            copyImgBtn.onclick = async () => {
                try {
                    canvas.toBlob(async (blob) => {
                        try {
                            await navigator.clipboard.write([
                                new ClipboardItem({ [blob.type]: blob })
                            ]);
                            const prevTxt = copyImgBtn.innerHTML;
                            copyImgBtn.innerHTML = "✅ Copied Image!";
                            setTimeout(() => copyImgBtn.innerHTML = prevTxt, 2000);
                        } catch (err) {
                            showToast("Clipboard restricted. Please tap and hold or right click the certificate below to copy!");
                        }
                    }, 'image/png');
                } catch (e) {
                    showToast("Could not copy directly. Please download the image!");
                }
            };
        }
        };
        if (typeof vspWhenTrophiesReady === 'function') vspWhenTrophiesReady(paintCert);
        else paintCert();
    };
    bgImg.src = fullImageURL;
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


// ============================================================
// 7. STOPWATCH / PAUSE / HINT
// ============================================================

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
    pausedForGridModal = false;
    pausedForPeek = false;
    peekActive = false;
    heldPauseOverlay = false;
    updateTimerDisplay();

    const peekOverlay = document.getElementById('peek-overlay');
    if (peekOverlay) {
        peekOverlay.classList.remove('show');
        peekOverlay.setAttribute('aria-hidden', 'true');
    }

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

function updateRankPanel() {
    const body = document.getElementById('rank-table-body');
    const label = document.getElementById('rank-grid-label');
    const rowsN = (typeof gridRows === 'number' && gridRows >= 3) ? gridRows : 3;
    const colsN = (typeof gridCols === 'number' && gridCols >= 3) ? gridCols : 3;
    if (label) label.textContent = `This grid: ${rowsN}×${colsN}`;
    if (!body) return;

    const fallback = {
        gold: { time: 180, moves: 70 },
        silver: { time: 480, moves: 160 },
        bronze: { time: 1200, moves: 400 }
    };
    const t = (typeof vspRankThresholds === 'function') ? vspRankThresholds(rowsN, colsN) : fallback;
    const fmt = (typeof vspFormatRankTime === 'function')
        ? vspFormatRankTime
        : (sec) => {
            const s = Math.max(0, sec | 0);
            return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
        };
    const rows = [
        { rank: 3, name: 'Gold', time: t.gold.time, moves: t.gold.moves },
        { rank: 2, name: 'Silver', time: t.silver.time, moves: t.silver.moves },
        { rank: 1, name: 'Bronze', time: t.bronze.time, moves: t.bronze.moves }
    ];
    const keys = ['gold', 'silver', 'bronze'];
    body.innerHTML = rows.map((row, i) => {
        const cup = typeof vspTrophyMarkup === 'function' ? vspTrophyMarkup(row.rank, 22) : '';
        return `
        <tr class="rank-row-${keys[i]}">
            <th scope="row">${cup} ${row.name}</th>
            <td>≤ ${fmt(row.time)}</td>
            <td>≤ ${row.moves}</td>
        </tr>`;
    }).join('');
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
    if (pausedForGridModal) return;

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

function resetPuzzleFromPause() {
    const pauseOverlay = document.getElementById('pause-modal-overlay');
    if (pauseOverlay) {
        pauseOverlay.classList.remove('show');
        pauseOverlay.setAttribute('aria-hidden', 'true');
    }
    isPaused = false;
    pausedForGridModal = false;
    pausedForPeek = false;
    peekActive = false;
    heldPauseOverlay = false;
    const pieces = container.querySelectorAll('.puzzle-piece');
    pieces.forEach(p => p.style.opacity = '1');
    setupSlidingPuzzle();
}

function triggerHint() {
    if (isPaused || gameWon || peekActive || hintsLeft <= 0) return;

    hintsLeft--;
    const hintCountNode = document.getElementById('hints-count');
    if (hintCountNode) hintCountNode.textContent = hintsLeft;
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) hintBtn.disabled = hintsLeft <= 0;

    const hintNumbers = container.querySelectorAll('.tile-hint-number');
    hintNumbers.forEach(num => num.style.display = 'block');

    setTimeout(() => {
        hintNumbers.forEach(num => num.style.display = 'none');
    }, 4000);
}

function triggerPeek() {
    if (isPaused || gameWon || isAutoSolving || peekActive || peeksLeft <= 0) return;
    peeksLeft--;
    const peekCountNode = document.getElementById('peeks-count');
    if (peekCountNode) peekCountNode.textContent = peeksLeft;
    const peekBtn = document.getElementById('peek-btn');
    if (peekBtn) peekBtn.disabled = peeksLeft <= 0;

    const overlay = document.getElementById('peek-overlay');
    const img = document.getElementById('peek-image');
    if (!overlay || !img) {
        showToast('Reference overlay missing.');
        return;
    }
    img.src = fullImageURL;
    peekActive = true;
    if (stopwatchInterval) {
        pauseStopwatch();
        pausedForPeek = true;
    }
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        peekActive = false;
        if (pausedForPeek) {
            pausedForPeek = false;
            if (!isPaused && !gameWon && !pausedForGridModal) startStopwatch();
        }
    }, 1200);
}


// ============================================================
// 8. MODALS & UI HELPERS
// ============================================================

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }
}

function showModificationModal() {
    lastFocusedElement = document.activeElement;
    const overlay = document.getElementById('mod-modal-overlay');
    pendingGridSize = (gridRows === gridCols && gridRows >= 3 && gridRows <= 8) ? gridRows : 0;
    syncGridSizeButtons();

    const pauseOverlay = document.getElementById('pause-modal-overlay');
    if (isPaused && pauseOverlay && pauseOverlay.classList.contains('show')) {
        pauseOverlay.classList.remove('show');
        heldPauseOverlay = true;
    }

    if (stopwatchStarted && !isPaused && !gameWon && !pausedForGridModal) {
        pauseStopwatch();
        pausedForGridModal = true;
    }

    if (overlay) {
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
        const firstBtn = overlay.querySelector('.grid-size-btn.is-selected') || overlay.querySelector('.grid-size-btn');
        setTimeout(() => { if (firstBtn) firstBtn.focus(); }, 100);
    }
}

function syncGridSizeButtons() {
    document.querySelectorAll('.grid-size-btn').forEach((btn) => {
        const n = Number(btn.getAttribute('data-size'));
        const on = n === pendingGridSize;
        btn.classList.toggle('is-selected', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
}

function selectGridSize(n) {
    const size = n | 0;
    if (size < 3 || size > 8) return;
    pendingGridSize = size;
    syncGridSizeButtons();
}

function hideModificationModal() {
    const overlay = document.getElementById('mod-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
    }

    if (pausedForGridModal) {
        pausedForGridModal = false;
        if (!isPaused && !gameWon) startStopwatch();
    }
    if (heldPauseOverlay && isPaused) {
        const pauseOverlay = document.getElementById('pause-modal-overlay');
        if (pauseOverlay) pauseOverlay.classList.add('show');
        heldPauseOverlay = false;
    }
    if (lastFocusedElement) lastFocusedElement.focus();
}

function submitGridModification() {
    const size = pendingGridSize | 0;
    if (size < 3 || size > 8) {
        showToast('Pick a grid size first.');
        return;
    }

    gridRows = size;
    gridCols = size;

    if (isDailyRun && typeof vspTodayFeatured === 'function') {
        const featured = vspTodayFeatured();
        if (!featured || featured.rows !== size || featured.cols !== size) {
            isDailyRun = false;
            const titleNode = document.getElementById('game-title');
            if (titleNode) titleNode.innerHTML = wrapEmojis(currentTheme.title);
        }
    }

    const overlay = document.getElementById('mod-modal-overlay');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');

    pausedForGridModal = false;
    heldPauseOverlay = false;
    hideModificationModal();
    setupSlidingPuzzle();
}

function showVictoryModal() {
    lastFocusedElement = document.activeElement;
    const overlay = document.getElementById('victory-modal-overlay');
    if (overlay) {
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
        const titleNode = document.getElementById('victory-title');
        if (titleNode) setTimeout(() => { titleNode.setAttribute('tabindex', '-1'); titleNode.focus(); }, 100);
    }
}

function restartCurrentPuzzle() {
    const overlay = document.getElementById('victory-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
    }
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
            if (overlay) {
                overlay.classList.remove('show');
                overlay.setAttribute('aria-hidden', 'true');
            }
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
            if (overlay) {
                overlay.classList.add('show');
                overlay.setAttribute('aria-hidden', 'false');
            }
            restoreBtn.style.display = 'none';
        });
        document.body.appendChild(restoreBtn);
    }
    restoreBtn.style.display = 'block';
}
