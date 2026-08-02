# Vocaloid Sliding Puzzle

*[日本語版はこちら (Japanese version)](README.ja.md)*

A free, non-commercial fanmade sliding-puzzle gallery featuring **Hatsune Miku** (and several of her modules) plus **VFlower V3**. Choose a character, pick an illustration, and slide the tiles back into place.

Plays entirely in the browser — no install, no account, no ads.

**Live demo:** [cns1700.github.io/Vocaloid-Sliding-Puzzle-](https://cns1700.github.io/Vocaloid-Sliding-Puzzle-/)

## Screenshots

<!--
  Drop your captured PNGs into the screenshots/ folder using these exact
  filenames and the images below will show up automatically on GitHub.
  Caption style matches the Miku Fever project: Japanese first, English in parentheses.
-->

| | |
|---|---|
| ![Gallery select screen](screenshots/gallery.png) | ![Puzzle workspace mid-game](screenshots/workspace.png) |
| **ギャラリー選択画面**<br>*(Gallery / character select)* | **パズルプレイ中**<br>*(Puzzle workspace mid-game)* |
| ![Hint numbers visible](screenshots/hint.png) | ![Victory + certificate](screenshots/victory.png) |
| **ヒント表示中**<br>*(Hint numbers visible)* | **クリア＆証明書**<br>*(Victory + certificate)* |

## Features

- **5 character themes** — Hatsune Miku (Original), Supreme, Honey Whip, 25-ji, and VFlower V3 — each with its own accent color and illustration set.
- **Adjustable grid** — change difficulty from 3×3 up to 8×8 (rows and columns independent).
- **Timer & move counter** with pause support.
- **Hint system** — shows the correct tile numbers for 4 seconds (limited uses).
- **Auto Solve** — a real A* search (Manhattan heuristic) that finds a solution path and animates it. On very large grids it may fall back to the recorded shuffle path so the browser never freezes.
- **Downloadable / copyable result certificates** that mark whether the clear was manual or auto-solved.
- Keyboard accessible (tiles are real buttons; Enter/Space to slide).

## How to play

1. From the **gallery**, click any thumbnail to open that illustration as a sliding puzzle.
2. Click (or keyboard-activate) a tile **adjacent to the empty space** to slide it.
3. Rearrange every tile into its correct position to complete the picture.
4. Use the control bar for:
   - **Grid Settings** — change rows/columns (3–8)
   - **Pause** — freezes the timer and hides the board
   - **Hint** — briefly shows guide numbers
   - **Auto Solve** — lets the solver finish the board for you
5. When you finish, a victory panel appears with your time, move count, and a shareable certificate image.

## Running it locally

No build step or dependencies.

- Open `index.html` directly in a browser, **or**
- Serve the folder with any static file server, e.g. `python -m http.server`, then visit `http://localhost:8000`

## Credits

Illustrations and character designs belong to their respective creators and copyright holders (Crypton Future Media, Piapro, etc.). This is an unofficial fan work.

## License

Free, non-commercial fanmade project. Not affiliated with or endorsed by Crypton Future Media or any official Vocaloid rights holders. Not for sale or commercial use.

## Find this project

- GitHub: https://github.com/Cns1700/Vocaloid-Sliding-Puzzle-
- X / Twitter: https://x.com/MizuchiSylph

---

*For internal development notes (architecture, how to add new puzzles, solver details), see `DEVELOPER.md`.*
