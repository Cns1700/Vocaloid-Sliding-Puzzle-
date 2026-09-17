/* Shared gallery / workspace records (localStorage only). */
const VSP_RECORD_KEY = 'vsp-records-v1';

const VSP_CATALOG = [
    { char: 'miku-original', puzzle: 'Cyber-Miku-Revamped2-1.jpg', title: 'Hatsune Miku — Cyber Bike', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Cyber-Miku-Revamped2-1.webp' },
    { char: 'miku-original', puzzle: 'Cyber_Miku-Weapon_Engage.jpg', title: 'Hatsune Miku — Weapon Engage', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Cyber_Miku-Weapon_Engage.webp' },
    { char: 'miku-original', puzzle: 'Miku_Witch.jpg', title: 'Hatsune Miku — Witch', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku_Witch.webp' },
    { char: 'miku-original', puzzle: 'Miku-V!.jpg', title: 'Hatsune Miku — Cyber Life', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-V!.webp' },
    { char: 'miku-original', puzzle: 'Miku-V2.jpg', title: 'Hatsune Miku — Hexagons', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-V2.webp' },
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

/** Manual clears only. Auto-solve is 0 (unranked). */
function vspComputeStars(isAuto, moves, seconds, rows, cols) {
    if (isAuto) return 0;
    const cells = rows * cols;
    if (moves <= cells * 3 && seconds <= cells * 6) return 3;
    if (moves <= cells * 8 && seconds <= cells * 14) return 2;
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
