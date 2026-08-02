# Vocaloid Sliding Puzzle — Developer Notes

Internal reference for the **finalized** version of this project.  
Player-facing docs live in `README.md` / `README.ja.md`.

Live builds:

- itch.io: https://mizuchisylph.itch.io/vocaloid-sliding-puzzle  
- GitHub: https://github.com/Cns1700/Vocaloid-Sliding-Puzzle-

---

## File map

| File / folder | Role |
|---|---|
| `index.html` | Gallery page. Character cards + thumbnail links (`?char=…&puzzle=…`). Uses **`thumbs/`** for preview images. |
| `workspace_template.html` | Game page. Puzzle board, control bar, modals. Loads `engine_logic.js`. |
| `engine_logic.js` | All game logic (one file, sectioned with `====` banners). |
| `style_sheet.css` | All styling: gallery, board, modals, certificate preview, responsive / itch-friendly media queries. |
| `gallery-preview.js` | Hover preview on gallery thumbnails (deferred). |
| `Puzzles/` | Full-resolution illustrations (loaded only when a puzzle is opened). |
| `thumbs/` | Small WebP gallery strip thumbnails. **Required** on the gallery page. |
| `previews/` | Medium WebP hover previews (~15–90 KB). Used by `data-preview` on thumb links. |
| `BG-character-cards/` | Card background art for the gallery. |
| `BG-Freepik/` | Page background art. |
| `screenshots/` | PNGs for the player READMEs (GitHub). |
| `README.md` / `README.ja.md` | Player-facing English / Japanese. |
| `DEVELOPER.md` | This file. |

### Do not ship to itch.io

| Exclude | Why |
|---|---|
| `*.xcf` | GIMP sources (large, unused at runtime) |
| `engine_logic_review.js` | Old review draft |
| `Vocaloid-Sliding-Puzzle.zip` | Nested archive |
| `.git/` | VCS metadata |
| `screenshots/` | Optional; not needed to play |
| `DEVELOPER.md` | Optional on itch |

---

## engine_logic.js section map

Search for the `====` banners:

1. **GLOBAL STATE & THEMES** — grid size, tiles, history, stopwatch flags, theme map, URL params  
2. **BOARD STATE KEYS & HISTORY** — `getBoardStateKey()`, `pushMoveToHistory()` (cycle pruning with a `Set`)  
3. **SETUP / GRID BUILD / SHUFFLE** — `setupSlidingPuzzle()`, `buildGrid()`, `shuffleBoard()`, `repositionAllTiles()`  
4. **MOVE HANDLING** — `tryMoveTile()`  
5. **A\* SOLVER (Auto Solve)** — Manhattan heuristic, adaptive node budget, path animation, `triggerAutoSolve()`  
6. **VICTORY & CERTIFICATE** — `checkVictory()`, canvas certificate, blank-tile reveal  
7. **STOPWATCH / PAUSE / HINT**  
8. **MODALS & UI HELPERS**

---

## Board display size (portrait + landscape)

`setupSlidingPuzzle()` sizes the board to fit a **shared play area**, not “fixed width then unlimited height”:

- `maxW = min(92% of window width, 640)`  
- `maxH = min(62% of window height, 560)`  
- `scale = min(maxW / imageWidth, maxH / imageHeight)`  
- Board pixel size = image size × scale  

So landscape and portrait both stay on-screen at similar overall footprint. Tiles stay proportional to the image (rectangular tiles when the art is not square). Full-resolution art is still used for the tile backgrounds; only the **on-screen board box** is scaled.

itch.io: fullscreen + scroll enabled on the embed works well with this. Gallery may still scroll on short embeds; workspace boards (including Supreme portraits) should fit without forced browser zoom.

---

## When the board is shuffled

`shuffleBoard()` runs on **every fresh board setup**:

- First load of `workspace_template.html`  
- Player changes grid size (“Apply Grid”)  
- Player clicks “Play Again” after a win  

Rules:

- Only legal slides from the solved position → every puzzle is solvable  
- Step count: `min(rows × cols × 18, 700)`  
- Avoids immediately reversing the previous move when other options exist  
- Uses the same cycle-pruning history system as player moves  

---

## History / cycle pruning

| Structure | Purpose |
|---|---|
| `moveHistory` | Ordered tile IDs (Auto Solve fallback path) |
| `stateHistory` | Ordered board-state keys (path truncation) |
| `visitedStates` | `Set` for O(1) “seen this layout?” checks |

When a previous state reappears, histories are truncated so loops are removed.

---

## Auto Solve (A*)

- Real **A\*** with **Manhattan distance**  
- Adaptive node budget:

  | Grid size (cells) | Node budget |
  |---|---|
  | ≤ 9 (e.g. 3×3) | 50 000 |
  | ≤ 16 (e.g. 4×4) | 60 000 |
  | ≤ 25 (e.g. 5×5) | 40 000 |
  | larger | 25 000 |

- Budget exhausted → reverse recorded shuffle path + toast  
- Immediate “Solving…” / “Solver searching…” toast  
- Path animated with `tryMoveTile(..., false)`  
- Auto-solved clears marked **not** leaderboard-eligible on the certificate  

---

## Certificate generation

`generateCertificateImage()` — client-side canvas PNG.

### Canvas & frame

- Canvas aspect **matches the puzzle image** (no stretch)  
- Longest side capped at **1280**  
- Image drawn **only inside the outer frame** (fills that rect; no letterbox dead space; does not cross the first border)  
- Multi-layer frame + corner brackets + dark overlay  

### Typography (orientation-aware)

| | Portrait | Landscape |
|---|---|---|
| Title | Width-based; may wrap to two lines (`VOCALOID` / `PUZZLE RECORD`) | Single line |
| Body / stats | Sized from canvas width | Slightly larger |
| Stamp / status | `fitFont` + safety margin | Same |

Results block (title → stats → stamp) is **vertically centered** in the safe area.

### Modal CSS

- `.cert-image-preview` — `max-height: 55vh`, `object-fit: contain`  
- `#victory-modal-card` — `max-height: 90vh`, scroll if needed  

---

## Gallery performance & responsive layout

### Thumbs (critical for itch / GitHub speed)

Gallery used to load full `Puzzles/` files as tiny `<img>` tags (~**45 MB**). That blocked interaction on remote hosts.

**Current:** `thumbs/` WebP previews (~**89 KB** total). `index.html` uses those with `loading="lazy"` and `decoding="async"`. Full images load only in the workspace.

When adding a puzzle: create ≈168×100 WebP under `thumbs/` and point the gallery `src` at it. Keep the full file under `Puzzles/` for the workspace `?puzzle=` param.

### CSS / media queries

- Fluid character cards (`max-width`, not fixed-only widths)  
- Thumbnail rows **wrap** so many picks are not clipped  
- Breakpoints ~1280 / 1100 / 992 / 700 for gallery columns  
- `max-height: 800px` tightens vertical spacing for short embeds  
- `html` / `body` allow vertical scroll in the itch iframe  

---

## Adding a new character / puzzle

1. Add full art under `Puzzles/<Character-or-Module>/`.  
2. Generate a small WebP thumb under `thumbs/` (≈168×100).  
3. Theme entry in `engine_logic.js` `themes`:
   ```js
   'my-key': { title: 'Display Name 🎵', color: '#hex', img: 'Puzzles/My-Folder/' }
   ```
4. Gallery card + links in `index.html`:
   - `href` → `workspace_template.html?char=my-key&puzzle=filename.jpg`  
   - `img src` → `thumbs/....webp`  
5. Optional: card background under `BG-character-cards/`.  

No build step — refresh and re-upload.

---

## Screenshots for the README

Place four PNGs in `screenshots/`:

| File | Content |
|---|---|
| `gallery.png` | Character select |
| `workspace.png` | Mid-game board + controls |
| `hint.png` | Hint numbers visible |
| `victory.png` | Victory modal + certificate |

---

## itch.io embed notes

- Kind: **HTML**, index: `index.html`  
- Fullscreen: **on**  
- Scroll: **on** (mainly helps the gallery)  
- Viewport example that works: **1280 × 800** (or 720)  
- Ship `thumbs/` in the zip; exclude `.xcf` and review files  

---

## Notes & limitations

- A\* is strong on small/medium grids; large grids may use the recorded-path fallback.  
- Certificate “security status” is visual only.  
- Themes / paths are still partly hard-coded; a single config object would be a future cleanup.  
- One JS file on purpose — static drop-in, no bundler.  
- Owner commits and pushes to GitHub; external tools should not push as a contributor without explicit owner action.  
