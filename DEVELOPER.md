# Vocaloid Sliding Puzzle — Developer Notes

Internal reference for the **finalized** version of this project.  
Player-facing docs live in `README.md` / `README.ja.md`.

---

## File map

| File / folder | Role |
|---|---|
| `index.html` | Gallery page. Hard-coded character cards + thumbnail links that pass `?char=…&puzzle=…` to the workspace. |
| `workspace_template.html` | Game page. Puzzle board, control bar, modals (grid size, pause, victory + certificate). Loads `engine_logic.js`. |
| `engine_logic.js` | All game logic (single file, sectioned with `====` banners). |
| `style_sheet.css` | All styling, including certificate preview constraints and victory-modal scroll rules. |
| `gallery-preview.js` | Hover preview pop-up on gallery thumbnails. |
| `Puzzles/` | Source illustrations grouped by character / module. |
| `BG-character-cards/` | Card background art used on the gallery. |
| `screenshots/` | PNGs referenced by the player READMEs. |
| `README.md` / `README.ja.md` | Player-facing English / Japanese. |
| `DEVELOPER.md` | This file. |

---

## engine_logic.js section map

Search for the `====` banners:

1. **GLOBAL STATE & THEMES** — grid size, tiles array, history, stopwatch flags, theme map, URL params  
2. **BOARD STATE KEYS & HISTORY** — `getBoardStateKey()`, `pushMoveToHistory()` (cycle pruning with a `Set`)  
3. **SETUP / GRID BUILD / SHUFFLE** — `setupSlidingPuzzle()`, `buildGrid()`, `shuffleBoard()`, `repositionAllTiles()`  
4. **MOVE HANDLING** — `tryMoveTile()`  
5. **A\* SOLVER (Auto Solve)** — snapshot, Manhattan heuristic, A\* search, path animation, `triggerAutoSolve()`  
6. **VICTORY & CERTIFICATE** — `checkVictory()`, canvas certificate generation, blank-tile reveal  
7. **STOPWATCH / PAUSE / HINT**  
8. **MODALS & UI HELPERS**

---

## When the board is shuffled

`shuffleBoard()` runs on **every fresh board setup**:

- First load of `workspace_template.html`
- Player changes grid size (“Apply Grid”)
- Player clicks “Play Again” after a win

Rules:

- Only legal slides from the solved position → every puzzle is solvable  
- Step count: `min(rows × cols × 18, 700)` (lighter than the original ×40 design)  
- Avoids immediately reversing the previous move when other options exist (better mixing with fewer steps)  
- Uses the same cycle-pruning history system as player moves

---

## History / cycle pruning

During player moves **and** the shuffle, the engine keeps:

| Structure | Purpose |
|---|---|
| `moveHistory` | Ordered list of tile IDs moved (used for Auto Solve fallback) |
| `stateHistory` | Ordered list of board-state keys (path truncation) |
| `visitedStates` | `Set` for O(1) “have we seen this layout?” checks |

When a previously seen state reappears, both histories are truncated so loops are removed. This keeps the fallback Auto Solve path reasonably short.

---

## Auto Solve (A*)

- Real **A\*** search with **Manhattan distance** heuristic  
- Adaptive node budget (keeps the tab responsive):

  | Grid size (cells) | Node budget |
  |---|---|
  | ≤ 9 (e.g. 3×3) | 50 000 |
  | ≤ 16 (e.g. 4×4) | 60 000 |
  | ≤ 25 (e.g. 5×5) | 40 000 |
  | larger | 25 000 |

- If the budget is exhausted → falls back to reversing the recorded shuffle path (always works) and shows a toast  
- Immediate “Solving…” / “Solver searching…” toast so the UI never feels frozen  
- Solution is animated via `tryMoveTile(..., false)` in sequence  
- Auto-solved clears are marked on the certificate as **not** leaderboard-eligible

---

## Certificate generation (final design)

`generateCertificateImage()` builds a client-side canvas PNG.

### Canvas size & aspect

- Canvas aspect ratio **matches the puzzle image** (no stretch)  
- Longest side capped at **1280** (readable download + fits the victory modal)

### Background image vs frame

- Image is drawn **only inside the outer frame border** (`margin` inset)  
- Because canvas aspect = image aspect, that inner rectangle is filled completely — **no letterboxing dead space**, **no distortion**, and the art never crosses the first border  
- Multi-layer frame: outer theme stroke, mid accent, inner light line, corner brackets  
- Dark overlay for text readability

### Typography (orientation-aware)

Portrait and landscape use different recipes so long titles do not clip the side borders:

| | Portrait | Landscape |
|---|---|---|
| Title | Width-based; if a single line would shrink too far → **two lines** (`VOCALOID` / `PUZZLE RECORD`) | Single line, more generous size |
| Body / stats | Sized from canvas **width** | Slightly larger |
| Stamp / status | `fitFont` + safety margin | Same |

- Entire results block (title → stats box → stamp) is **vertically centered** in the safe content area  
- `fitFont()` shrinks any line until it fits inside the safe width (with a small safety factor for font-metric variance)

### Modal preview (CSS)

In `style_sheet.css`:

- `.cert-image-preview` — `max-height: 55vh`, `width: auto`, `object-fit: contain` (no forced stretch in the browser)  
- `#victory-modal-card` — `max-height: 90vh`, scroll if needed, width capped

---

## Adding a new character / puzzle

1. Put the illustration files under `Puzzles/<Character-or-Module>/`.  
2. Add a theme entry in the `themes` object inside `engine_logic.js`:
   ```js
   'my-key': { title: 'Display Name 🎵', color: '#hex', img: 'Puzzles/My-Folder/' }
   ```
3. Add a card + thumbnail links in `index.html` that point to  
   `workspace_template.html?char=my-key&puzzle=filename.jpg`  
4. (Optional) Add matching card background art under `BG-character-cards/`.

No build step — refresh the gallery after editing.

---

## Screenshots for the README

Place four PNGs in `screenshots/` with these exact names:

| File | Suggested content |
|---|---|
| `gallery.png` | Main gallery / character select |
| `workspace.png` | Mid-game puzzle board with controls visible |
| `hint.png` | Board with numbered hint overlays showing |
| `victory.png` | Victory modal + generated certificate |

The tables in `README.md` / `README.ja.md` pick them up automatically on GitHub (same pattern as the Miku Fever project).

---

## Notes & limitations

- A\* is optimal or near-optimal on small/medium grids. On large grids the node budget may be hit and the recorded-path fallback is used.  
- Certificate “security status” text is visual only (client-side canvas).  
- Themes and image paths are still hard-coded in a few places; a future cleanup could centralize them in one config object.  
- No module system — one JS file so the project stays a simple static drop-in.  
- Do not push changes to GitHub from external contributors without the owner’s explicit action; the owner commits and pushes themselves.
