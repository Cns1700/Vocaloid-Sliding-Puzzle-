# Vocaloid Sliding Puzzle

*[日本語版はこちら (Japanese version)](README.ja.md)*

A free, unofficial sliding-puzzle gallery of Hatsune Miku (a handful of her modules) and VFlower V3. You pick a character, pick a picture, and slide the tiles until the illustration comes back together.

It runs in the browser. Nothing to install, no account, no ads. Clears and personal bests stay on this computer. A large **EN | 日本語** button in the top-left corner switches the UI; the choice is remembered in this browser.

**Play:** [GitHub Pages](https://cns1700.github.io/Vocaloid-Sliding-Puzzle-/) · [itch.io](https://mizuchisylph.itch.io/vocaloid-sliding-puzzle)

## Screenshots

<!-- 3 rows × 3 cells. Files live in screenshots/. -->

| | | |
|---|---|---|
| ![Home gallery](screenshots/home-page.png) | ![Puzzle selection](screenshots/puzzle-selection.png) | ![Hints on the board](screenshots/hint.png) |
| **Home**<br>Gallery, this week’s ranks, today’s stage | **Puzzle select**<br>Five character rows + hover preview | **Hints**<br>Numbered tiles on the board |
| ![Peek reference](screenshots/peek-reference.png) | ![Grid size](screenshots/grid-size-selection.png) | ![Name picker](screenshots/name-picker.png) |
| **Peek**<br>Full-picture reference (timer frozen) | **Grid size**<br>Square grids 3×3–8×8 | **Name picker**<br>Lock / reroll / Achieved By |
| ![Victory](screenshots/certificate-download-window.png) | ![Result certificate](screenshots/player-certificate.png) | ![Week collection](screenshots/trophy-collection.png) |
| **Clear**<br>Rank, download, copy | **Certificate**<br>Trophy + GOLD / SILVER / BRONZE | **Week collection**<br>Downloadable weekly tally |

## What’s here

Five themed sets: Original Miku, Supreme, Honey Whip, 25-ji, and VFlower V3. Grids go from 3×3 up to 8×8 in even squares. The gallery is a stacked list of character rows — not the old dice layout.

Japanese labels keep **Supreme**, **Honey Whip**, and **VFlower V3** in katakana as **スプリーム**, **ハニーホイップ**, and **ブイフラワー V3**. Those spellings stay as-is.

The home page slowly crossfades through each character’s background, the same way Miku Fever does. Open a puzzle and that character’s scene stays put, with a little motion in the lights behind the board.

There’s a timer, a move counter, pause, numbered hints, and a **Peek** that shows the finished picture (the timer freezes while it’s up). Each day has a **featured stage** — one illustration and one square grid (3×3, 4×4, 5×5, or 6×6) that everyone in that timezone gets.

When you clear a puzzle yourself, the gallery remembers it. Finished thumbs pick up a trophy, and a personal best (time and moves) is saved in this browser. Auto Solve can finish a board for you, but those clears aren’t ranked.

On a win you can download or copy a result certificate. Manual clears rank Gold, Silver, or Bronze using the same cup trophy (gold / silver / bronze color only). Auto Solve is marked unranked. After a manual clear, pick a generated Vocaloid-themed name for **Achieved By**. English or Japanese follows the language toggle; the lists live in the game (no internet). Producer names — stage names or real names — are never used, so a certificate cannot look like a real Vocaloid producer played. The puzzle page shows the time and move caps for the current grid. Weekly trophy counts and week/month/year collection downloads live on the home page and reset every Monday.

## How to play

1. Open any thumbnail from the gallery, or hit **Play today’s puzzle**.
2. Slide a tile that’s next to the empty space.
3. Put every tile back. That’s the whole game.

Controls:

- **Grid Settings** — 3×3 through 8×8 (timer pauses while this is open)
- **Pause** — stops the clock and hides the board; Reset Puzzle is on this menu
- **Hint** — numbers on the tiles for a few seconds (limited)
- **Peek** — the full picture for about a second (timer pauses; limited uses)
- **Auto Solve** — lets the solver finish it

Trophies are a private score on this machine, not a global leaderboard. Gold means you were fairly quick and tidy for that grid size. The side window on the puzzle shows the exact time and move caps. Home tracks how many of each trophy you earned this week. Trophy art lives in `icons/trophy-gold.png`, `icons/trophy-silver.png`, and `icons/trophy-bronze.png`.

## Running it locally

No build step. Open `index.html`, or serve the folder with any static server.

## Credits

Art and characters belong to their owners (Crypton Future Media, Piapro, and the illustrators). This is unofficial fan work.

- [magnific.com](https://magnific.com)
- [pixabay.com](https://pixabay.com)
- [Gold trophy icons created by Md Tanvirul Haque - Flaticon](https://www.flaticon.com/free-icons/gold-trophy)

Full-page scenes are the chosen illustrations for each set — they fill the window, with no photographs.

## License

Free, non-commercial. Not affiliated with Crypton or any Vocaloid rights holder. Don’t sell it.

## Links

- GitHub: https://github.com/Cns1700/Vocaloid-Sliding-Puzzle-
- X: https://x.com/MizuchiSylph

---

*How shuffle, Auto Solve, records, and thumbs work is in `DEVELOPER.md`.*
