/* Shared gallery / workspace records (localStorage only). */
const VSP_RECORD_KEY = 'vsp-records-v1';

const VSP_CATALOG = [
    { char: 'miku-original', puzzle: 'Cyber-Miku-Revamped2-1.jpg', title: 'Hatsune Miku — Cyber Bike', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Cyber-Miku-Revamped2-1.webp' },
    { char: 'miku-original', puzzle: 'Cyber_Miku-Weapon_Engage.jpg', title: 'Hatsune Miku — Weapon Engage', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Cyber_Miku-Weapon_Engage.webp' },
    { char: 'miku-original', puzzle: 'Miku_Witch.jpg', title: 'Hatsune Miku — Witch', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku_Witch.webp' },
    { char: 'miku-original', puzzle: 'Miku-V!.jpg', title: 'Hatsune Miku — Cyber Life', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-V!.webp' },
    { char: 'miku-original', puzzle: 'Miku-V2.jpg', title: 'Hatsune Miku — Hexagons', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-V2.webp' },
    { char: 'miku-original', puzzle: 'Miku-Birthday-Cafe.jpg', title: 'Hatsune Miku — Birthday Cafe', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Birthday-Cafe.webp' },
    { char: 'miku-original', puzzle: 'Miku-Birthday-Gifts.jpg', title: 'Hatsune Miku — Birthday Gifts', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Birthday-Gifts.webp' },
    { char: 'miku-original', puzzle: 'Miku-Birthday-Message.jpg', title: 'Hatsune Miku — Birthday Message', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Birthday-Message.webp' },
    { char: 'miku-original', puzzle: 'Miku-Beach-Trio.jpg', title: 'Hatsune Miku — Beach Trio', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Beach-Trio.webp' },
    { char: 'miku-original', puzzle: 'Miku-Beach-Water.jpg', title: 'Hatsune Miku — Beach Water', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Beach-Water.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-V3.jpg', title: 'Supreme — Dessert', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-V3.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-Swimsuit.png', title: 'Supreme — Swimsuit', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-Swimsuit.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-V1.jpg', title: 'Supreme — Knight', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-V1.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-V2.jpg', title: 'Supreme — Palace', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-V2.webp' },
    { char: 'miku-honey', puzzle: 'Honey_Whip-1.png', title: 'Honey Whip — Tease', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey_Whip-1.webp' },
    { char: 'miku-honey', puzzle: 'Honey_Whip_Hot_Tub.jpg', title: 'Honey Whip — Hot Tub', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey_Whip_Hot_Tub.webp' },
    { char: 'miku-honey', puzzle: 'Honey_Whip-swimsuit.png', title: 'Honey Whip — Swimsuit', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey_Whip-swimsuit.webp' },
    { char: 'miku-honey', puzzle: 'Honey-Whip-V2.jpg', title: 'Honey Whip — Intro', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey-Whip-V2.webp' },
    { char: 'miku-honey', puzzle: 'Honey-Whip-V4.jpg', title: 'Honey Whip — Leisure', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey-Whip-V4.webp' },
    { char: 'miku-25ji', puzzle: '25-ji-Miku-Moonlight-V1.jpg', title: '25-ji — Moonlight', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji-Miku-Moonlight-V1.webp' },
    { char: 'miku-25ji', puzzle: '25-ji_Miku_soul_mistress.jpg', title: '25-ji — Soul Mistress', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji_Miku_soul_mistress.webp' },
    { char: 'miku-25ji', puzzle: '25-jiMiku_Night-Water.jpg', title: '25-ji — Night Water', preview: 'previews/Hatsune-Miku__25-ji-images__25-jiMiku_Night-Water.webp' },
    { char: 'miku-25ji', puzzle: '25-ji-V1.jpg', title: '25-ji — Mystic', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji-V1.webp' },
    { char: 'miku-25ji', puzzle: '25-ji-V2.jpg', title: '25-ji — Time', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji-V2.webp' },
    { char: 'vflower', puzzle: 'Black_Window_VFlower1.jpg', title: 'VFlower — Widow Lily 1', preview: 'previews/VFlower-V3__Black_Window_VFlower1.webp' },
    { char: 'vflower', puzzle: 'Black_Window_VFlower2.jpg', title: 'VFlower — Widow Lily 2', preview: 'previews/VFlower-V3__Black_Window_VFlower2.webp' },
    { char: 'vflower', puzzle: 'VFlower_Amaryllis_Fountain.jpg', title: 'VFlower — Amaryllis Fountain', preview: 'previews/VFlower-V3__VFlower_Amaryllis_Fountain.webp' },
    { char: 'vflower', puzzle: 'VFlower-V1.jpg', title: 'VFlower — Bloom Night', preview: 'previews/VFlower-V3__VFlower-V1.webp' },
    { char: 'vflower', puzzle: 'VFlower-V2.jpg', title: 'VFlower — Guitar', preview: 'previews/VFlower-V3__VFlower-V2.webp' }
];

function vspRecordId(charKey, puzzleName) {
    return `${charKey}|${puzzleName}`;
}

function vspLocalDateKey() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function vspHash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function vspLoadRecords() {
    try {
        const raw = localStorage.getItem(VSP_RECORD_KEY);
        if (!raw) return { version: 1, puzzles: {}, daily: {} };
        const data = JSON.parse(raw);
        if (!data.puzzles) data.puzzles = {};
        if (!data.daily) data.daily = {};
        return data;
    } catch (e) {
        return { version: 1, puzzles: {}, daily: {} };
    }
}

function vspSaveRecords(data) {
    localStorage.setItem(VSP_RECORD_KEY, JSON.stringify(data));
}

function vspStarGlyphs(n) {
    const filled = Math.max(0, Math.min(3, n | 0));
    return '★'.repeat(filled) + '☆'.repeat(3 - filled);
}

function vspRankMeta(n) {
    if (n >= 3) return { key: 'gold', label: 'Gold', color: '#f5c542' };
    if (n === 2) return { key: 'silver', label: 'Silver', color: '#c5cdd8' };
    if (n === 1) return { key: 'bronze', label: 'Bronze', color: '#d08a4a' };
    return { key: 'none', label: 'Unranked', color: '#e74c3c' };
}

function vspTrophySvg(rank, size) {
    const s = size || 18;
    const meta = vspRankMeta(rank);
    const cup = meta.color;
    const stem = rank >= 3 ? '#c48a12' : rank === 2 ? '#7d8694' : rank === 1 ? '#8a5424' : '#555';
    return `<svg class="trophy-icon trophy-${meta.key}" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="${cup}" d="M6 4h12v2.2c0 3.4-2.4 6.2-6 6.2S6 9.6 6 6.2V4z"/>
        <path fill="${cup}" d="M4 5h2.1C6.4 8.4 8.8 11 12 11s5.6-2.6 5.9-6H20c.6 2.8-1.1 6.2-4.2 7.4L15 15H9l-.8-2.6C5.1 11.2 3.4 7.8 4 5z"/>
        <path fill="${stem}" d="M10 15h4l.6 2.1H9.4z"/>
        <rect x="8" y="17.2" width="8" height="1.6" rx="0.4" fill="${stem}"/>
        <rect x="7" y="19" width="10" height="2.2" rx="0.6" fill="${cup}"/>
    </svg>`;
}

function vspFormatRankTime(totalSeconds) {
    const sec = Math.max(0, totalSeconds | 0);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Fair casual targets. Gold is focused play, silver is unhurried,
 * bronze is any manual finish. Both time AND moves must land in a band.
 * Scales with cells × longest side so 4×4 is not scored like 3×3.
 */
function vspRankThresholds(rows, cols) {
    const r = Math.max(3, Math.min(8, rows | 0));
    const c = Math.max(3, Math.min(8, cols | 0));
    const cells = r * c;
    const n = Math.max(r, c);
    const factor = (cells * n) / 27;
    const roundStep = (value, step) => Math.max(step, Math.round(value / step) * step);
    const goldMoves = roundStep(80 * factor, factor < 1.5 ? 5 : 10);
    const goldTime = roundStep(120 * factor, 15);
    const silverMoves = roundStep(goldMoves * 2.4, 10);
    const silverTime = roundStep(goldTime * 2.6, 15);
    return {
        gold: { time: goldTime, moves: goldMoves },
        silver: { time: silverTime, moves: silverMoves }
    };
}

/** Manual clears only. Auto-solve is 0 (unranked). */
function vspComputeStars(isAuto, moves, seconds, rows, cols) {
    if (isAuto) return 0;
    const t = vspRankThresholds(rows, cols);
    if (moves <= t.gold.moves && seconds <= t.gold.time) return 3;
    if (moves <= t.silver.moves && seconds <= t.silver.time) return 2;
    return 1;
}


function vspTodayFeatured() {
    const dateKey = vspLocalDateKey();
    const h = vspHash(dateKey + '|vsp-daily');
    const item = VSP_CATALOG[h % VSP_CATALOG.length];
    const grids = [
        { rows: 3, cols: 3 },
        { rows: 3, cols: 4 },
        { rows: 4, cols: 4 },
        { rows: 4, cols: 5 }
    ];
    const grid = grids[h % grids.length];
    return { dateKey, ...item, ...grid };
}

function vspFormatShortTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function vspRecordManualClear({ charKey, puzzleName, rows, cols, seconds, moves, stars, isDaily }) {
    const data = vspLoadRecords();
    const id = vspRecordId(charKey, puzzleName);
    if (!data.puzzles[id]) {
        data.puzzles[id] = { cleared: true, bestStars: 0, bests: {} };
    }
    const rec = data.puzzles[id];
    rec.cleared = true;
    rec.bestStars = Math.max(rec.bestStars || 0, stars);
    const gridKey = `${rows}x${cols}`;
    const prev = rec.bests[gridKey] || {};
    rec.bests[gridKey] = {
        time: (prev.time == null || seconds < prev.time) ? seconds : prev.time,
        moves: (prev.moves == null || moves < prev.moves) ? moves : prev.moves,
        stars: Math.max(prev.stars || 0, stars)
    };
    if (isDaily) {
        data.daily = {
            date: vspLocalDateKey(),
            id,
            cleared: true,
            stars: Math.max((data.daily && data.daily.date === vspLocalDateKey() && data.daily.stars) || 0, stars)
        };
    }
    vspSaveRecords(data);
    return rec;
}
