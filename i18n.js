/* English / Japanese copy. スプリーム, ハニーホイップ, ブイフラワー V3 stay katakana. */
const VSP_LANG_KEY = 'vsp-lang';
const VSP_LANG_ORDER = ['en', 'ja'];

const I18N = {
    en: {
        meta: {
            galleryTitle: 'Vocaloid Puzzle Gallery',
            workspaceTitle: 'Sliding Puzzle Workspace',
            langToggle: 'Switch language'
        },
        gallery: {
            heading: 'VOCALOID PUZZLE GALLERY',
            tagline: 'Pick a character, then an illustration. Clears and personal bests stay on this browser.',
            progress: 'Cleared {cleared} / {total}'
        },
        week: {
            aria: "This week's trophy collection",
            kicker: "This week’s ranks",
            reset: 'Total is reset every Monday(weekly), new month, & new year (time zone varies). Total of trophy types will be totaled at the end of the month and at the end of the year (Dec. 31).'
        },
        daily: {
            aria: "Today's featured puzzle",
            kicker: 'Today’s stage',
            loading: 'Loading…',
            play: 'Play today’s puzzle',
            artAlt: 'Today’s featured illustration',
            meta: '{rows} × {cols} · same stage for everyone today',
            cleared: '{rows} × {cols} · cleared today {stars}'
        },
        char: {
            original: 'Hatsune Miku',
            supreme: 'Supreme',
            honey: 'Honey Whip',
            nightcord: '25-ji',
            vflower: 'VFlower V3'
        },
        footer: {
            credits: 'Credits',
            unofficial: 'Unofficial fan work. Characters belong to their owners.'
        },
        rank: {
            gold: 'Gold',
            silver: 'Silver',
            bronze: 'Bronze',
            unranked: 'Unranked',
            heading: 'Ranks',
            trophy: 'Trophy',
            time: 'Time',
            moves: 'Moves',
            gridLabel: 'This grid: {rows}×{cols}',
            note: 'Hit both the time and the move cap for that trophy. Bronze is any manual finish. Auto Solve stays unranked.',
            panelAria: 'Rank requirements for this grid'
        },
        collect: {
            weekTitle: 'Collection for the Week',
            monthTitle: 'Collection for the Month',
            yearTitle: 'Collection for the Year',
            weekNotice: 'Weekly certificate available until Monday midnight ({remaining}).',
            monthNotice: '{period} certificate available until {until} ({remaining}).',
            monthPrevNotice: 'Previous month ({period}) still downloadable until {until} ({remaining}).',
            yearNotice: '{period} certificate available until {until} ({remaining}).',
            yearPrevNotice: 'Previous year ({period}) still downloadable until {until} ({remaining}).',
            downloadWeek: 'Download week certificate',
            downloadPeriod: 'Download {period}',
            certBrand: 'VOCALOID SLIDING PUZZLE',
            certFooter: 'Private collection on this browser · unofficial fan work'
        },
        time: {
            expired: 'expired',
            daysHoursLeft: '{days}d {hours}h left',
            hoursMinsLeft: '{hours}h {mins}m left',
            minsLeft: '{mins}m left'
        },
        ws: {
            loading: 'Loading Puzzle...',
            back: 'Back to Gallery',
            gridSettings: 'Grid Settings',
            timerAria: 'Elapsed Time',
            movesAria: 'Moves Count',
            moves: 'Moves: {count}',
            pause: '⏸ Pause',
            resume: '▶ Resume',
            hint: 'Hint',
            peek: 'Peek',
            autoSolve: 'Auto Solve',
            controlsAria: 'Game controls and stats',
            boardAria: 'Sliding Puzzle Grid Board',
            dailyPrefix: 'Daily Stage',
            tileAria: 'Tile {n}. Position: Row {row}, Column {col}'
        },
        peek: {
            caption: 'Reference',
            alt: 'Full illustration reference'
        },
        grid: {
            title: 'Grid Size',
            desc: 'Pick a square grid. The timer stays paused while this is open.',
            groupAria: 'Grid size',
            cancel: 'Cancel',
            apply: 'Apply Grid',
            pickFirst: 'Pick a grid size first.'
        },
        pauseModal: {
            title: 'Paused',
            desc: 'Timer is frozen and the board is hidden. Reset shuffles a new board at this grid size.',
            reset: 'Reset Puzzle',
            resume: 'Resume'
        },
        victory: {
            clear: 'Clear!',
            finished: 'You finished the sliding puzzle.',
            autoTitle: '❌ Auto-Solved!',
            congrats: 'Congratulations!',
            autoAttempt: 'Your Personal Attempt:',
            autoSolver: 'Auto Solver:',
            timeMoves: '⏱ Time: {time} | 🔄 Moves: {moves}',
            finishedLine: 'You finished in <strong>{time}</strong> with <strong>{moves}</strong> moves.',
            rankLine: 'Rank: ',
            dailyRecorded: 'Daily stage recorded.',
            generating: 'Generating secure result certificate... 🎨',
            download: '💾 Download Certificate',
            copy: '📋 Copy Image',
            copied: '✅ Copied Image!',
            share: 'Download or copy the certificate if you want to keep the result.',
            playAgain: 'Play Again',
            viewBoard: 'View Board 🖼️',
            showMenu: '🏆 Show Victory Menu',
            certAlt: 'Certified Puzzle Result'
        },
        name: {
            kicker: 'Stage Clear',
            title: 'Pick your name',
            desc: 'Tap a word to lock it in place.<br>Reroll unlocked words, then submit.',
            adjective: 'Adjective',
            theme: 'Theme',
            noun: 'Noun',
            tapLock: 'Tap to lock',
            locked: 'Locked',
            unlocked: 'Unlocked',
            rerollSlot: 'Reroll',
            rerollName: '🎲 Reroll Name',
            submit: '💾 Submit Score',
            slotAria: '{label} {word}. {state}.'
        },
        toast: {
            loadFail: 'Could not load that illustration.',
            solving: 'Solving…',
            searching: 'Solver searching…',
            budget: 'Search budget reached — using recorded path',
            peekMissing: 'Reference overlay missing.',
            clipboard: 'Clipboard restricted. Please tap and hold or right click the certificate below to copy!',
            copyFail: 'Could not copy directly. Please download the image!'
        },
        cert: {
            titleFull: 'VOCALOID PUZZLE RECORD',
            titleLine1: 'VOCALOID',
            titleLine2: 'PUZZLE RECORD',
            stampAuto: 'AUTO-SOLVED RECORD',
            stampManual: 'LEGITIMATE MANUAL PLAY',
            statusAuto: '⚠ SECURITY STATUS: NOT ELIGIBLE FOR LEADERBOARD ⚠',
            statusManual: '🏆 SECURITY STATUS: 100% VERIFIED AUTHENTIC 🏆',
            target: 'Target: {title}',
            achieved: 'Achieved By: {name}',
            grid: 'GRID DIMENSION:',
            elapsed: 'ELAPSED TIME:',
            totalMoves: 'TOTAL MOVES:',
            rank: 'RANK:',
            gridValue: '{rows} x {cols} Grid',
            autoName: 'Auto Solver System',
            player: 'Player',
            gold: 'GOLD',
            silver: 'SILVER',
            bronze: 'BRONZE',
            unranked: 'UNRANKED'
        }
    },
    ja: {
        meta: {
            galleryTitle: 'ボーカロイド パズルギャラリー',
            workspaceTitle: 'スライディングパズル',
            langToggle: '言語を切り替える'
        },
        gallery: {
            heading: 'ボーカロイド パズルギャラリー',
            tagline: 'キャラを選んで、イラストを選んでください。クリア記録はこのブラウザに残ります。',
            progress: 'クリア {cleared} / {total}'
        },
        week: {
            aria: '今週のトロフィーコレクション',
            kicker: '今週のランク',
            reset: '合計は毎週月曜、新しい月、新しい年にリセットされます（タイムゾーンにより異なります）。トロフィーの種類別合計は月末と年末（12月31日）に集計されます。'
        },
        daily: {
            aria: '今日の注目パズル',
            kicker: '今日のステージ',
            loading: '読み込み中…',
            play: '今日のパズルをプレイ',
            artAlt: '今日の注目イラスト',
            meta: '{rows} × {cols} · 今日はこのタイムゾーンで同じステージ',
            cleared: '{rows} × {cols} · 本日クリア {stars}'
        },
        char: {
            original: '初音ミク',
            supreme: 'スプリーム',
            honey: 'ハニーホイップ',
            nightcord: '25時',
            vflower: 'ブイフラワー V3'
        },
        footer: {
            credits: 'クレジット',
            unofficial: '非公式のファン作品です。キャラクターの権利は各権利者にあります。'
        },
        rank: {
            gold: 'ゴールド',
            silver: 'シルバー',
            bronze: 'ブロンズ',
            unranked: 'ランクなし',
            heading: 'ランク',
            trophy: 'トロフィー',
            time: 'タイム',
            moves: '手数',
            gridLabel: 'このグリッド：{rows}×{cols}',
            note: 'そのトロフィーにはタイムと手数の両方を満たす必要があります。ブロンズは手動クリアなら誰でも。オートソルブはランクなしです。',
            panelAria: 'このグリッドのランク条件'
        },
        collect: {
            weekTitle: '週間コレクション',
            monthTitle: '月間コレクション',
            yearTitle: '年間コレクション',
            weekNotice: '週間証明書は月曜の深夜までダウンロードできます（{remaining}）。',
            monthNotice: '{period}の証明書は {until} までダウンロードできます（{remaining}）。',
            monthPrevNotice: '前月（{period}）の証明書は {until} までまだダウンロードできます（{remaining}）。',
            yearNotice: '{period}の証明書は {until} までダウンロードできます（{remaining}）。',
            yearPrevNotice: '前年（{period}）の証明書は {until} までまだダウンロードできます（{remaining}）。',
            downloadWeek: '週間証明書をダウンロード',
            downloadPeriod: '{period} をダウンロード',
            certBrand: 'ボーカロイド スライディングパズル',
            certFooter: 'このブラウザ内の個人コレクション · 非公式ファン作品'
        },
        time: {
            expired: '期限切れ',
            daysHoursLeft: '残り {days}日 {hours}時間',
            hoursMinsLeft: '残り {hours}時間 {mins}分',
            minsLeft: '残り {mins}分'
        },
        ws: {
            loading: 'パズルを読み込み中...',
            back: 'ギャラリーに戻る',
            gridSettings: 'グリッド設定',
            timerAria: '経過時間',
            movesAria: '手数',
            moves: '手数: {count}',
            pause: '⏸ 一時停止',
            resume: '▶ 再開',
            hint: 'ヒント',
            peek: 'ピーク',
            autoSolve: 'オートソルブ',
            controlsAria: 'ゲーム操作と記録',
            boardAria: 'スライディングパズル盤面',
            dailyPrefix: '今日のステージ',
            tileAria: 'タイル {n}。位置：{row}行 {col}列'
        },
        peek: {
            caption: '参考絵',
            alt: '完成イラストの参考'
        },
        grid: {
            title: 'グリッドサイズ',
            desc: '正方形のグリッドを選んでください。開いている間はタイマーが止まります。',
            groupAria: 'グリッドサイズ',
            cancel: 'キャンセル',
            apply: 'グリッドを適用',
            pickFirst: '先にグリッドサイズを選んでください。'
        },
        pauseModal: {
            title: '一時停止',
            desc: 'タイマーは止まっていて、盤面は隠れています。リセットすると同じサイズで新しい盤面が配られます。',
            reset: 'パズルをリセット',
            resume: '再開'
        },
        victory: {
            clear: 'クリア！',
            finished: 'スライディングパズルをクリアしました。',
            autoTitle: '❌ オートソルブ！',
            congrats: 'おめでとうございます！',
            autoAttempt: 'あなたの挑戦：',
            autoSolver: 'オートソルバー：',
            timeMoves: '⏱ タイム: {time} | 🔄 手数: {moves}',
            finishedLine: '<strong>{time}</strong>、<strong>{moves}</strong>手でクリアしました。',
            rankLine: 'ランク：',
            dailyRecorded: '今日のステージとして記録しました。',
            generating: '結果証明書を作成しています... 🎨',
            download: '💾 証明書をダウンロード',
            copy: '📋 画像をコピー',
            copied: '✅ コピーしました！',
            share: '残したい場合は、証明書をダウンロードするかコピーしてください。',
            playAgain: 'もう一度プレイ',
            viewBoard: '盤面を見る 🖼️',
            showMenu: '🏆 クリアメニューを表示',
            certAlt: 'パズル結果の証明書'
        },
        name: {
            kicker: 'ステージクリア',
            title: '名前を選ぶ',
            desc: '単語をタップするとロックされます。<br>ロックしていない単語をリロールしてから送信。',
            adjective: '形容詞',
            theme: 'テーマ',
            noun: '名詞',
            tapLock: 'タップでロック',
            locked: 'ロック中',
            unlocked: '未ロック',
            rerollSlot: 'リロール',
            rerollName: '🎲 名前をリロール',
            submit: '💾 スコアを送信',
            slotAria: '{label} {word}。{state}。'
        },
        toast: {
            loadFail: 'そのイラストを読み込めませんでした。',
            solving: '解いています…',
            searching: 'ソルバー探索中…',
            budget: '探索上限に達したので、記録した経路を使います',
            peekMissing: '参考オーバーレイがありません。',
            clipboard: 'クリップボードが制限されています。下の証明書を長押し、または右クリックしてコピーしてください。',
            copyFail: '直接コピーできませんでした。画像をダウンロードしてください。'
        },
        cert: {
            titleFull: 'ボーカロイド パズル記録',
            titleLine1: 'ボーカロイド',
            titleLine2: 'パズル記録',
            stampAuto: 'オートソルブ記録',
            stampManual: '正規の手動クリア',
            statusAuto: '⚠ セキュリティ状態：ランキング対象外 ⚠',
            statusManual: '🏆 セキュリティ状態：正規クリア確認 🏆',
            target: '対象：{title}',
            achieved: '達成者：{name}',
            grid: 'グリッド：',
            elapsed: '経過時間：',
            totalMoves: '総手数：',
            rank: 'ランク：',
            gridValue: '{rows} x {cols} グリッド',
            autoName: 'オートソルバーシステム',
            player: 'プレイヤー',
            gold: 'ゴールド',
            silver: 'シルバー',
            bronze: 'ブロンズ',
            unranked: 'ランクなし'
        }
    }
};

let vspLang = 'en';

function vspGetLang() {
    return vspLang === 'ja' ? 'ja' : 'en';
}

function vspLoadLang() {
    try {
        const saved = localStorage.getItem(VSP_LANG_KEY);
        if (saved === 'ja' || saved === 'en') vspLang = saved;
    } catch (e) { /* ignore */ }
}

function t(key, vars) {
    const pick = (lang) => {
        const parts = String(key || '').split('.');
        let val = I18N[lang];
        for (let i = 0; i < parts.length; i++) {
            if (!val || typeof val !== 'object' || !(parts[i] in val)) return null;
            val = val[parts[i]];
        }
        return typeof val === 'string' ? val : null;
    };
    let text = pick(vspGetLang()) || pick('en') || String(key || '');
    if (vars) {
        Object.keys(vars).forEach((k) => {
            text = text.split('{' + k + '}').join(String(vars[k]));
        });
    }
    return text;
}

function vspApplyI18n(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const attr = el.getAttribute('data-i18n-attr');
        const html = el.hasAttribute('data-i18n-html');
        const val = t(key);
        if (attr) {
            attr.split(',').forEach((name) => el.setAttribute(name.trim(), val));
        } else if (html) {
            el.innerHTML = val;
        } else {
            el.textContent = val;
        }
    });
    const lang = vspGetLang();
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
    document.documentElement.setAttribute('data-lang', lang);
    const pageTitleKey = document.body && document.body.classList.contains('workspace-page')
        ? 'meta.workspaceTitle'
        : 'meta.galleryTitle';
    document.title = t(pageTitleKey);
    vspSyncLangToggle();
}

function vspSyncLangToggle() {
    const lang = vspGetLang();
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
        btn.setAttribute('aria-label', t('meta.langToggle'));
        btn.querySelectorAll('.lang-opt').forEach((opt) => {
            const on = opt.getAttribute('data-lang') === lang;
            opt.classList.toggle('is-active', on);
            opt.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    });
}

function vspSetLang(next) {
    const lang = next === 'ja' ? 'ja' : 'en';
    if (lang === vspLang) return;
    vspLang = lang;
    try { localStorage.setItem(VSP_LANG_KEY, lang); } catch (e) { /* ignore */ }
    vspApplyI18n();
    window.dispatchEvent(new CustomEvent('vsp-langchange', { detail: { lang } }));
}

function vspBindLangToggle() {
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
        if (btn.dataset.bound === '1') return;
        btn.dataset.bound = '1';
        btn.addEventListener('click', (event) => {
            const opt = event.target.closest('.lang-opt');
            if (opt && opt.getAttribute('data-lang')) {
                vspSetLang(opt.getAttribute('data-lang'));
                return;
            }
            const idx = VSP_LANG_ORDER.indexOf(vspGetLang());
            vspSetLang(VSP_LANG_ORDER[(idx + 1) % VSP_LANG_ORDER.length]);
        });
    });
}

vspLoadLang();
document.addEventListener('DOMContentLoaded', () => {
    vspBindLangToggle();
    vspApplyI18n();
});
