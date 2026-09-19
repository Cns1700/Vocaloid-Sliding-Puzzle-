# Vocaloid Sliding Puzzle

*[日本語版はこちら (Japanese version)](README.ja.md)*

A free, unofficial sliding-puzzle gallery of Hatsune Miku (a handful of her modules) and VFlower V3. You pick a character, pick a picture, and slide the tiles until the illustration comes back together.

It runs in the browser. Nothing to install, no account, no ads. Clears and personal bests stay on this computer.

**Play:** [GitHub Pages](https://cns1700.github.io/Vocaloid-Sliding-Puzzle-/) · [itch.io](https://mizuchisylph.itch.io/vocaloid-sliding-puzzle)

## Screenshots

<!-- Drop PNGs into screenshots/ using these filenames. -->

| | |
|---|---|
| ![Gallery select screen](screenshots/gallery.png) | ![Puzzle workspace mid-game](screenshots/workspace.png) |
| **ギャラリー選択画面**<br>*(Gallery / character select)* | **パズルプレイ中**<br>*(Puzzle workspace mid-game)* |
| ![Hint numbers visible](screenshots/hint.png) | ![Victory + certificate](screenshots/victory.png) |
| **ヒント表示中**<br>*(Hint numbers visible)* | **クリア＆証明書**<br>*(Victory + certificate)* |

## What’s here

Five themed sets: Original Miku, Supreme, Honey Whip, 25-ji, and VFlower V3. Grids go from 3×3 up to 8×8, and you can set rows and columns separately. The gallery is a stacked list of character rows — not the old dice layout.

The home page slowly crossfades through each character’s background, the same way Miku Fever does. Open a puzzle and that character’s scene stays put, with a little motion in the lights behind the board.

There’s a timer, a move counter, pause, numbered hints, and a **Peek** that flashes the finished picture for a second. Each day has a **featured stage** — one illustration and one grid that everyone in that timezone gets.

When you clear a puzzle yourself, the gallery remembers it. Finished thumbs pick up a trophy, and a personal best (time and moves) is saved in this browser. Auto Solve can finish a board for you, but those clears aren’t ranked.

On a win you can download or copy a result certificate. Manual clears rank Gold, Silver, or Bronze using the same cup trophy (gold / silver / bronze color only). Auto Solve is marked unranked. After a manual clear, pick a generated name for **Achieved By** on the certificate. The puzzle page shows the time and move caps for the current grid. Weekly trophy counts and week/month/year collection downloads live on the home page and reset every Monday.

## How to play

1. Open any thumbnail from the gallery, or hit **Play today’s puzzle**.
2. Slide a tile that’s next to the empty space.
3. Put every tile back. That’s the whole game.

Controls:

- **Grid Settings** — 3–8 rows and columns (timer pauses while this is open)
- **Pause** — stops the clock and hides the board; Reset Puzzle is on this menu
- **Hint** — numbers on the tiles for a few seconds (limited)
- **Peek** — the full picture for about a second (limited)
- **Auto Solve** — lets the solver finish it

Trophies are a private score on this machine, not a global leaderboard. Gold means you were fairly quick and tidy for that grid size. The side window on the puzzle shows the exact time and move caps. Home tracks how many of each trophy you earned this week. Trophy art lives in `icons/trophy-gold.png`, `icons/trophy-silver.png`, and `icons/trophy-bronze.png`.

## Running it locally

No build step. Open `index.html`, or serve the folder with any static server.

## Credits

Art and characters belong to their owners (Crypton Future Media, Piapro, and the illustrators). This is unofficial fan work. Character cards use Magnific (formerly Freepik) illustrations. Full-page scenes are the chosen illustrations for each set — they fill the window, with no photographs.

## License

Free, non-commercial. Not affiliated with Crypton or any Vocaloid rights holder. Don’t sell it.

## Links

- GitHub: https://github.com/Cns1700/Vocaloid-Sliding-Puzzle-
- X: https://x.com/MizuchiSylph

---

*How shuffle, Auto Solve, records, and thumbs work is in `DEVELOPER.md`.*
