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
        if (!raw) {
            const fresh = { version: 1, puzzles: {}, daily: {}, collections: vspFreshCollections() };
            return fresh;
        }
        const data = JSON.parse(raw);
        if (!data.puzzles) data.puzzles = {};
        if (!data.daily) data.daily = {};
        if (vspEnsureCollectionPeriods(data)) vspSaveRecords(data);
        return data;
    } catch (e) {
        return { version: 1, puzzles: {}, daily: {}, collections: vspFreshCollections() };
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
 * bronze is a very roomy cap so finishing is not punishing.
 * Scales with cell count and the longer side.
 */
function vspRankThresholds(rows, cols) {
    const r = Math.max(3, Math.min(8, rows | 0));
    const c = Math.max(3, Math.min(8, cols | 0));
    const cells = r * c;
    const long = Math.max(r, c);
    const factor = (cells / 9) * (1 + Math.max(0, long - 3) * 0.15);
    const roundMoves = (n) => Math.max(40, Math.round(n / 10) * 10);
    const roundTime = (n) => Math.max(60, Math.round(n / 15) * 15);
    return {
        gold: { time: roundTime(180 * factor), moves: roundMoves(70 * factor) },
        silver: { time: roundTime(480 * factor), moves: roundMoves(160 * factor) },
        bronze: { time: roundTime(1200 * factor), moves: roundMoves(400 * factor) }
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
    vspAddTrophyCount(data, stars);
    vspSaveRecords(data);
    return rec;
}

function vspEmptyTally() {
    return { gold: 0, silver: 0, bronze: 0 };
}

function vspFreshCollections() {
    const now = new Date();
    return {
        weekKey: vspWeekKey(now),
        week: vspEmptyTally(),
        monthKey: vspMonthKey(now),
        month: vspEmptyTally(),
        prevMonthKey: null,
        prevMonth: null,
        yearKey: String(now.getFullYear()),
        year: vspEmptyTally(),
        prevYearKey: null,
        prevYear: null
    };
}

function vspStartOfWeek(date) {
    const d = date ? new Date(date) : new Date();
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = x.getDay();
    const offset = day === 0 ? -6 : 1 - day;
    x.setDate(x.getDate() + offset);
    x.setHours(0, 0, 0, 0);
    return x;
}

function vspNextMonday(date) {
    const start = vspStartOfWeek(date);
    const next = new Date(start);
    next.setDate(start.getDate() + 7);
    return next;
}

function vspWeekKey(date) {
    const s = vspStartOfWeek(date);
    const y = s.getFullYear();
    const m = String(s.getMonth() + 1).padStart(2, '0');
    const d = String(s.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function vspMonthKey(date) {
    const d = date ? new Date(date) : new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function vspShortMDY(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(-2)}`;
}

function vspWeekRangeLabel(date) {
    const start = vspStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${vspShortMDY(start)}-${vspShortMDY(end)}`;
}

function vspMonthLabelFromKey(key) {
    if (!key || typeof key !== 'string') return '';
    const parts = key.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const names = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${names[month - 1] || ''} ${year}`.trim();
}

function vspEndOfDay(date) {
    const x = new Date(date);
    x.setHours(23, 59, 59, 999);
    return x;
}

function vspMonthCertExpiry(monthKey) {
    const parts = (monthKey || '').split('-').map(Number);
    const year = parts[0];
    const month = parts[1];
    if (!year || !month) return new Date(0);
    return vspEndOfDay(new Date(year, month, 2));
}

function vspYearCertExpiry(yearKey) {
    const year = Number(yearKey);
    if (!year) return new Date(0);
    return vspEndOfDay(new Date(year + 1, 0, 2));
}

function vspRemainingPhrase(until) {
    const ms = until.getTime() - Date.now();
    if (ms <= 0) return 'expired';
    const totalMin = Math.max(1, Math.floor(ms / 60000));
    const days = Math.floor(totalMin / 1440);
    const hours = Math.floor((totalMin % 1440) / 60);
    const mins = totalMin % 60;
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${mins}m left`;
    return `${mins}m left`;
}

function vspEnsureCollectionPeriods(data) {
    if (!data.collections) data.collections = vspFreshCollections();
    const col = data.collections;
    const now = new Date();
    const weekKey = vspWeekKey(now);
    const monthKey = vspMonthKey(now);
    const yearKey = String(now.getFullYear());
    let changed = false;

    if (col.weekKey !== weekKey) {
        col.weekKey = weekKey;
        col.week = vspEmptyTally();
        changed = true;
    }
    if (col.monthKey !== monthKey) {
        if (col.monthKey) {
            col.prevMonthKey = col.monthKey;
            col.prevMonth = col.month || vspEmptyTally();
        }
        col.monthKey = monthKey;
        col.month = vspEmptyTally();
        changed = true;
    }
    if (now.getDate() > 2 && col.prevMonthKey) {
        col.prevMonthKey = null;
        col.prevMonth = null;
        changed = true;
    }
    if (col.yearKey !== yearKey) {
        if (col.yearKey) {
            col.prevYearKey = col.yearKey;
            col.prevYear = col.year || vspEmptyTally();
        }
        col.yearKey = yearKey;
        col.year = vspEmptyTally();
        changed = true;
    }
    if (!(now.getMonth() === 0 && now.getDate() <= 2) && col.prevYearKey) {
        col.prevYearKey = null;
        col.prevYear = null;
        changed = true;
    }
    return changed;
}

function vspAddTrophyCount(data, stars) {
    vspEnsureCollectionPeriods(data);
    const key = stars >= 3 ? 'gold' : stars === 2 ? 'silver' : stars === 1 ? 'bronze' : null;
    if (!key) return;
    const col = data.collections;
    col.week[key] += 1;
    col.month[key] += 1;
    col.year[key] += 1;
}

function vspCertWindows(nowDate) {
    const data = vspLoadRecords();
    const col = data.collections;
    const now = nowDate ? new Date(nowDate) : new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const isLastDay = now.getDate() === lastDayOfMonth;
    const inMonthGrace = now.getDate() <= 2;
    const isDec31 = now.getMonth() === 11 && now.getDate() === 31;
    const inYearGrace = now.getMonth() === 0 && now.getDate() <= 2;

    const weeklyUntil = vspNextMonday(now);
    const weekly = {
        kind: 'week',
        available: true,
        counts: col.week || vspEmptyTally(),
        title: 'Collection for the Week',
        period: vspWeekRangeLabel(now),
        expiresAt: weeklyUntil,
        remaining: vspRemainingPhrase(weeklyUntil),
        notice: `Weekly certificate available until Monday midnight (${vspRemainingPhrase(weeklyUntil)}).`
    };

    const monthNowAvailable = isLastDay || inMonthGrace;
    const monthNowUntil = vspMonthCertExpiry(col.monthKey);
    const monthNow = {
        kind: 'month',
        available: monthNowAvailable,
        counts: col.month || vspEmptyTally(),
        title: 'Collection for the Month',
        period: vspMonthLabelFromKey(col.monthKey),
        expiresAt: monthNowUntil,
        remaining: vspRemainingPhrase(monthNowUntil),
        notice: monthNowAvailable
            ? `${vspMonthLabelFromKey(col.monthKey)} certificate available until ${vspShortMDY(monthNowUntil)} (${vspRemainingPhrase(monthNowUntil)}).`
            : ''
    };

    const prevUntil = col.prevMonthKey ? vspMonthCertExpiry(col.prevMonthKey) : new Date(0);
    const monthPrev = {
        kind: 'month-prev',
        available: !!(inMonthGrace && col.prevMonthKey),
        counts: col.prevMonth || vspEmptyTally(),
        title: 'Collection for the Month',
        period: vspMonthLabelFromKey(col.prevMonthKey),
        expiresAt: prevUntil,
        remaining: vspRemainingPhrase(prevUntil),
        notice: (inMonthGrace && col.prevMonthKey)
            ? `Previous month (${vspMonthLabelFromKey(col.prevMonthKey)}) still downloadable until ${vspShortMDY(prevUntil)} (${vspRemainingPhrase(prevUntil)}).`
            : ''
    };

    const yearNowUntil = vspYearCertExpiry(col.yearKey);
    const yearNowAvailable = isDec31 || inYearGrace;
    const yearNow = {
        kind: 'year',
        available: yearNowAvailable,
        counts: col.year || vspEmptyTally(),
        title: 'Collection for the Year',
        period: String(col.yearKey || now.getFullYear()),
        expiresAt: yearNowUntil,
        remaining: vspRemainingPhrase(yearNowUntil),
        notice: yearNowAvailable
            ? `${col.yearKey} certificate available until ${vspShortMDY(yearNowUntil)} (${vspRemainingPhrase(yearNowUntil)}).`
            : ''
    };

    const prevYearUntil = col.prevYearKey ? vspYearCertExpiry(col.prevYearKey) : new Date(0);
    const yearPrev = {
        kind: 'year-prev',
        available: !!(inYearGrace && col.prevYearKey),
        counts: col.prevYear || vspEmptyTally(),
        title: 'Collection for the Year',
        period: String(col.prevYearKey || ''),
        expiresAt: prevYearUntil,
        remaining: vspRemainingPhrase(prevYearUntil),
        notice: (inYearGrace && col.prevYearKey)
            ? `Previous year (${col.prevYearKey}) still downloadable until ${vspShortMDY(prevYearUntil)} (${vspRemainingPhrase(prevYearUntil)}).`
            : ''
    };

    return { weekly, monthNow, monthPrev, yearNow, yearPrev, weekCounts: col.week || vspEmptyTally() };
}

function vspDrawTrophyCup(ctx, x, y, size, rank) {
    const meta = vspRankMeta(rank);
    const cup = meta.color;
    const stem = rank >= 3 ? '#c48a12' : rank === 2 ? '#7d8694' : '#8a5424';
    ctx.save();
    ctx.translate(x, y);
    const s = size / 24;
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(6, 4); ctx.lineTo(18, 4); ctx.lineTo(18, 6.2);
    ctx.bezierCurveTo(18, 9.6, 15.6, 12.4, 12, 12.4);
    ctx.bezierCurveTo(8.4, 12.4, 6, 9.6, 6, 6.2);
    ctx.closePath();
    ctx.fillStyle = cup;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(4, 5); ctx.lineTo(6.1, 5);
    ctx.bezierCurveTo(6.4, 8.4, 8.8, 11, 12, 11);
    ctx.bezierCurveTo(15.2, 11, 17.6, 8.4, 17.9, 5);
    ctx.lineTo(20, 5);
    ctx.bezierCurveTo(20.6, 7.8, 18.9, 11.2, 15.8, 12.4);
    ctx.lineTo(15, 15); ctx.lineTo(9, 15); ctx.lineTo(8.2, 12.4);
    ctx.bezierCurveTo(5.1, 11.2, 3.4, 7.8, 4, 5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = stem;
    ctx.fillRect(10, 15, 4, 2.1);
    ctx.fillRect(8, 17.2, 8, 1.6);
    ctx.fillStyle = cup;
    ctx.fillRect(7, 19, 10, 2.2);
    ctx.restore();
}

function vspDrawCollectionCert(spec) {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 560;
    const ctx = canvas.getContext('2d');
    const counts = spec.counts || vspEmptyTally();

    ctx.fillStyle = '#071018';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, '#0c1a24');
    g.addColorStop(1, '#081018');
    ctx.fillStyle = g;
    ctx.fillRect(28, 28, canvas.width - 56, canvas.height - 56);

    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
    ctx.strokeStyle = 'rgba(0,255,204,0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.fillStyle = '#00ffcc';
    ctx.font = '700 18px "Share Tech Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('VOCALOID SLIDING PUZZLE', canvas.width / 2, 88);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px Orbitron, "Segoe UI", sans-serif';
    ctx.fillText(spec.title || 'Collection', canvas.width / 2, 140);

    ctx.fillStyle = '#bfeff5';
    ctx.font = '600 22px "Share Tech Mono", monospace';
    ctx.fillText(spec.period || '', canvas.width / 2, 178);

    const rows = [
        { rank: 3, label: 'Gold', count: counts.gold || 0 },
        { rank: 2, label: 'Silver', count: counts.silver || 0 },
        { rank: 1, label: 'Bronze', count: counts.bronze || 0 }
    ];
    rows.forEach((row, i) => {
        const y = 240 + i * 70;
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(160, y - 28, 580, 58);
        vspDrawTrophyCup(ctx, 190, y - 24, 44, row.rank);
        const meta = vspRankMeta(row.rank);
        ctx.fillStyle = meta.color;
        ctx.textAlign = 'left';
        ctx.font = '700 26px "Segoe UI", sans-serif';
        ctx.fillText(row.label, 250, y + 8);
        ctx.textAlign = 'right';
        ctx.font = '800 30px "Share Tech Mono", monospace';
        ctx.fillText('×  ' + row.count, 710, y + 10);
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = '#8aa0b2';
    ctx.font = '14px "Segoe UI", sans-serif';
    ctx.fillText('Private collection on this browser · unofficial fan work', canvas.width / 2, 500);
    return canvas;
}

function vspDownloadCollectionCert(spec) {
    const canvas = vspDrawCollectionCert(spec);
    const link = document.createElement('a');
    const safe = String(spec.period || spec.kind || 'collection').replace(/[^\w\-]+/g, '_');
    link.download = `VSP-${spec.kind || 'collection'}-${safe}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function vspTallyRowsHtml(counts) {
    const c = counts || vspEmptyTally();
    const rows = [
        { rank: 3, label: 'Gold', count: c.gold || 0 },
        { rank: 2, label: 'Silver', count: c.silver || 0 },
        { rank: 1, label: 'Bronze', count: c.bronze || 0 }
    ];
    return rows.map((row) => {
        const meta = vspRankMeta(row.rank);
        return `<li class="rank-tally-row rank-row-${meta.key}">
            ${vspTrophySvg(row.rank, 22)}
            <span class="rank-tally-label">${meta.label}</span>
            <span class="rank-tally-count">× ${row.count}</span>
        </li>`;
    }).join('');
}

function vspRenderCollectionUi(opts) {
    opts = opts || {};
    if (!document.getElementById('week-tally')) return null;
    const windows = vspCertWindows();

    const homeGold = document.getElementById('week-gold');
    const homeSilver = document.getElementById('week-silver');
    const homeBronze = document.getElementById('week-bronze');
    if (homeGold) homeGold.textContent = String(windows.weekCounts.gold || 0);
    if (homeSilver) homeSilver.textContent = String(windows.weekCounts.silver || 0);
    if (homeBronze) homeBronze.textContent = String(windows.weekCounts.bronze || 0);
    const homeRange = document.getElementById('week-tally-range');
    if (homeRange) homeRange.textContent = windows.weekly.period;
    const homeNotice = document.getElementById('week-tally-notices');
    if (homeNotice) {
        const extra = [windows.weekly.notice];
        if (windows.monthPrev.notice) extra.push(windows.monthPrev.notice);
        if (windows.monthNow.notice) extra.push(windows.monthNow.notice);
        if (windows.yearPrev.notice) extra.push(windows.yearPrev.notice);
        if (windows.yearNow.notice) extra.push(windows.yearNow.notice);
        homeNotice.innerHTML = extra.map((n) => `<p>${n}</p>`).join('');
        const homeDl = document.getElementById('week-tally-downloads');
        if (homeDl) {
            homeDl.innerHTML = '';
            const add = (win, label) => {
                if (!win.available) return;
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'rank-dl-btn';
                b.textContent = label;
                b.addEventListener('click', () => vspDownloadCollectionCert(win));
                homeDl.appendChild(b);
            };
            add(windows.weekly, 'Download week certificate');
            add(windows.monthPrev, `Download ${windows.monthPrev.period}`);
            add(windows.monthNow, `Download ${windows.monthNow.period}`);
            add(windows.yearPrev, `Download ${windows.yearPrev.period}`);
            add(windows.yearNow, `Download ${windows.yearNow.period}`);
        }
    }
    return windows;
}
