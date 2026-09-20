/* Shared gallery / workspace records (localStorage only). */
const VSP_RECORD_KEY = 'vsp-records-v1';

const VSP_CATALOG = [
    { char: 'miku-original', puzzle: 'Cyber-Miku-Revamped2-1.jpg', title: 'Hatsune Miku — Cyber Bike', titleJa: '初音ミク — サイバーバイク', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Cyber-Miku-Revamped2-1.webp' },
    { char: 'miku-original', puzzle: 'Cyber_Miku-Weapon_Engage.jpg', title: 'Hatsune Miku — Weapon Engage', titleJa: '初音ミク — ウェポンエンゲージ', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Cyber_Miku-Weapon_Engage.webp' },
    { char: 'miku-original', puzzle: 'Miku_Witch.jpg', title: 'Hatsune Miku — Witch', titleJa: '初音ミク — ウィッチ', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku_Witch.webp' },
    { char: 'miku-original', puzzle: 'Miku-V!.jpg', title: 'Hatsune Miku — Cyber Life', titleJa: '初音ミク — サイバーライフ', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-V!.webp' },
    { char: 'miku-original', puzzle: 'Miku-V2.jpg', title: 'Hatsune Miku — Hexagons', titleJa: '初音ミク — ヘキサゴン', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-V2.webp' },
    { char: 'miku-original', puzzle: 'Miku-Birthday-Cafe.jpg', title: 'Hatsune Miku — Birthday Cafe', titleJa: '初音ミク — バースデーカフェ', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Birthday-Cafe.webp' },
    { char: 'miku-original', puzzle: 'Miku-Birthday-Gifts.jpg', title: 'Hatsune Miku — Birthday Gifts', titleJa: '初音ミク — バースデーギフト', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Birthday-Gifts.webp' },
    { char: 'miku-original', puzzle: 'Miku-Birthday-Message.jpg', title: 'Hatsune Miku — Birthday Message', titleJa: '初音ミク — バースデーメッセージ', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Birthday-Message.webp' },
    { char: 'miku-original', puzzle: 'Miku-Beach-Trio.jpg', title: 'Hatsune Miku — Beach Trio', titleJa: '初音ミク — ビーチトリオ', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Beach-Trio.webp' },
    { char: 'miku-original', puzzle: 'Miku-Beach-Water.jpg', title: 'Hatsune Miku — Beach Water', titleJa: '初音ミク — ビーチウォーター', preview: 'previews/Hatsune-Miku__Hatsune-Miku-images__Miku-Beach-Water.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-V3.jpg', title: 'Supreme — Dessert', titleJa: 'スプリーム — デザート', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-V3.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-Swimsuit.png', title: 'Supreme — Swimsuit', titleJa: 'スプリーム — スイムスーツ', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-Swimsuit.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-V1.jpg', title: 'Supreme — Knight', titleJa: 'スプリーム — ナイト', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-V1.webp' },
    { char: 'miku-supreme', puzzle: 'Supreme-V2.jpg', title: 'Supreme — Palace', titleJa: 'スプリーム — パレス', preview: 'previews/Hatsune-Miku__Supreme-images__Supreme-V2.webp' },
    { char: 'miku-honey', puzzle: 'Honey_Whip-1.png', title: 'Honey Whip — Tease', titleJa: 'ハニーホイップ — ティーズ', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey_Whip-1.webp' },
    { char: 'miku-honey', puzzle: 'Honey_Whip_Hot_Tub.jpg', title: 'Honey Whip — Hot Tub', titleJa: 'ハニーホイップ — ホットタブ', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey_Whip_Hot_Tub.webp' },
    { char: 'miku-honey', puzzle: 'Honey_Whip-swimsuit.png', title: 'Honey Whip — Swimsuit', titleJa: 'ハニーホイップ — スイムスーツ', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey_Whip-swimsuit.webp' },
    { char: 'miku-honey', puzzle: 'Honey-Whip-V2.jpg', title: 'Honey Whip — Intro', titleJa: 'ハニーホイップ — イントロ', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey-Whip-V2.webp' },
    { char: 'miku-honey', puzzle: 'Honey-Whip-V4.jpg', title: 'Honey Whip — Leisure', titleJa: 'ハニーホイップ — レジャー', preview: 'previews/Hatsune-Miku__Honey-Whip-images__Honey-Whip-V4.webp' },
    { char: 'miku-25ji', puzzle: '25-ji-Miku-Moonlight-V1.jpg', title: '25-ji — Moonlight', titleJa: '25時 — ムーンライト', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji-Miku-Moonlight-V1.webp' },
    { char: 'miku-25ji', puzzle: '25-ji_Miku_soul_mistress.jpg', title: '25-ji — Soul Mistress', titleJa: '25時 — ソウルミストレス', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji_Miku_soul_mistress.webp' },
    { char: 'miku-25ji', puzzle: '25-jiMiku_Night-Water.jpg', title: '25-ji — Night Water', titleJa: '25時 — ナイトウォーター', preview: 'previews/Hatsune-Miku__25-ji-images__25-jiMiku_Night-Water.webp' },
    { char: 'miku-25ji', puzzle: '25-ji-V1.jpg', title: '25-ji — Mystic', titleJa: '25時 — ミスティック', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji-V1.webp' },
    { char: 'miku-25ji', puzzle: '25-ji-V2.jpg', title: '25-ji — Time', titleJa: '25時 — タイム', preview: 'previews/Hatsune-Miku__25-ji-images__25-ji-V2.webp' },
    { char: 'vflower', puzzle: 'Black_Window_VFlower1.jpg', title: 'VFlower — Widow Lily 1', titleJa: 'ブイフラワー — ウィドウリリー 1', preview: 'previews/VFlower-V3__Black_Window_VFlower1.webp' },
    { char: 'vflower', puzzle: 'Black_Window_VFlower2.jpg', title: 'VFlower — Widow Lily 2', titleJa: 'ブイフラワー — ウィドウリリー 2', preview: 'previews/VFlower-V3__Black_Window_VFlower2.webp' },
    { char: 'vflower', puzzle: 'VFlower_Amaryllis_Fountain.jpg', title: 'VFlower — Amaryllis Fountain', titleJa: 'ブイフラワー — アマリリスファウンテン', preview: 'previews/VFlower-V3__VFlower_Amaryllis_Fountain.webp' },
    { char: 'vflower', puzzle: 'VFlower-V1.jpg', title: 'VFlower — Bloom Night', titleJa: 'ブイフラワー — ブルームナイト', preview: 'previews/VFlower-V3__VFlower-V1.webp' },
    { char: 'vflower', puzzle: 'VFlower-V2.jpg', title: 'VFlower — Guitar', titleJa: 'ブイフラワー — ギター', preview: 'previews/VFlower-V3__VFlower-V2.webp' }
];

function vspLocalizedTitle(item) {
    if (!item) return '';
    const ja = typeof vspGetLang === 'function' && vspGetLang() === 'ja';
    return (ja && item.titleJa) ? item.titleJa : (item.title || '');
}

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
    const label = (key, fallback) => (typeof t === 'function' ? t(key) : fallback);
    if (n >= 3) return { key: 'gold', label: label('rank.gold', 'Gold'), color: '#f5c542' };
    if (n === 2) return { key: 'silver', label: label('rank.silver', 'Silver'), color: '#c5cdd8' };
    if (n === 1) return { key: 'bronze', label: label('rank.bronze', 'Bronze'), color: '#d08a4a' };
    return { key: 'none', label: label('rank.unranked', 'Unranked'), color: '#e74c3c' };
}

const VSP_TROPHY_IMGS = { gold: null, silver: null, bronze: null };

function vspTrophySrc(rankOrKey) {
    const key = typeof rankOrKey === 'string' ? rankOrKey : vspRankMeta(rankOrKey).key;
    if (!key || key === 'none') return '';
    return 'icons/trophy-' + key + '.png?v=crop2';
}

function vspTrophyMarkup(rank, size) {
    const s = size || 18;
    const meta = vspRankMeta(rank);
    if (meta.key === 'none') return '';
    return `<img class="trophy-icon trophy-${meta.key}" src="${vspTrophySrc(meta.key)}" width="${s}" height="${s}" alt="" decoding="async">`;
}

function vspTrophySvg(rank, size) {
    return vspTrophyMarkup(rank, size);
}

function vspPreloadTrophyImgs() {
    ['gold', 'silver', 'bronze'].forEach((key) => {
        const img = new Image();
        img.src = vspTrophySrc(key);
        VSP_TROPHY_IMGS[key] = img;
    });
}

function vspTrophyImg(rank) {
    return VSP_TROPHY_IMGS[vspRankMeta(rank).key] || null;
}

function vspWhenTrophiesReady(done) {
    const imgs = ['gold', 'silver', 'bronze'].map((key) => VSP_TROPHY_IMGS[key]);
    let left = imgs.length;
    const tick = () => {
        left -= 1;
        if (left <= 0 && typeof done === 'function') done();
    };
    imgs.forEach((img) => {
        if (!img || img.complete) tick();
        else {
            img.addEventListener('load', tick, { once: true });
            img.addEventListener('error', tick, { once: true });
        }
    });
}

vspPreloadTrophyImgs();

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
    // Daily stages use the same square sizes as Grid Settings.
    // 7×7 / 8×8 stay in the picker but are too punishing as a forced daily.
    const sizes = [3, 4, 5, 6];
    const size = sizes[h % sizes.length];
    return { dateKey, ...item, rows: size, cols: size };
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
    if (typeof vspGetLang === 'function' && vspGetLang() === 'ja') {
        return `${year}年${month}月`;
    }
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
    const tx = (key, fallback, vars) => (typeof t === 'function' ? t(key, vars) : fallback);
    if (ms <= 0) return tx('time.expired', 'expired');
    const totalMin = Math.max(1, Math.floor(ms / 60000));
    const days = Math.floor(totalMin / 1440);
    const hours = Math.floor((totalMin % 1440) / 60);
    const mins = totalMin % 60;
    if (days > 0) return tx('time.daysHoursLeft', `${days}d ${hours}h left`, { days, hours });
    if (hours > 0) return tx('time.hoursMinsLeft', `${hours}h ${mins}m left`, { hours, mins });
    return tx('time.minsLeft', `${mins}m left`, { mins });
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
        titleKey: 'collect.weekTitle',
        period: vspWeekRangeLabel(now),
        expiresAt: weeklyUntil
    };

    const monthNowAvailable = isLastDay || inMonthGrace;
    const monthNowUntil = vspMonthCertExpiry(col.monthKey);
    const monthNow = {
        kind: 'month',
        available: monthNowAvailable,
        counts: col.month || vspEmptyTally(),
        titleKey: 'collect.monthTitle',
        period: vspMonthLabelFromKey(col.monthKey),
        expiresAt: monthNowUntil
    };

    const prevUntil = col.prevMonthKey ? vspMonthCertExpiry(col.prevMonthKey) : new Date(0);
    const monthPrev = {
        kind: 'month-prev',
        available: !!(inMonthGrace && col.prevMonthKey),
        counts: col.prevMonth || vspEmptyTally(),
        titleKey: 'collect.monthTitle',
        period: vspMonthLabelFromKey(col.prevMonthKey),
        expiresAt: prevUntil
    };

    const yearNowUntil = vspYearCertExpiry(col.yearKey);
    const yearNowAvailable = isDec31 || inYearGrace;
    const yearNow = {
        kind: 'year',
        available: yearNowAvailable,
        counts: col.year || vspEmptyTally(),
        titleKey: 'collect.yearTitle',
        period: String(col.yearKey || now.getFullYear()),
        expiresAt: yearNowUntil
    };

    const prevYearUntil = col.prevYearKey ? vspYearCertExpiry(col.prevYearKey) : new Date(0);
    const yearPrev = {
        kind: 'year-prev',
        available: !!(inYearGrace && col.prevYearKey),
        counts: col.prevYear || vspEmptyTally(),
        titleKey: 'collect.yearTitle',
        period: String(col.prevYearKey || ''),
        expiresAt: prevYearUntil
    };

    return { weekly, monthNow, monthPrev, yearNow, yearPrev, weekCounts: col.week || vspEmptyTally() };
}

function vspDrawTrophyCup(ctx, x, y, size, rank) {
    const img = typeof vspTrophyImg === 'function' ? vspTrophyImg(rank) : null;
    if (img && img.complete && img.naturalWidth) {
        ctx.drawImage(img, x, y, size, size);
        return;
    }
    const meta = vspRankMeta(rank);
    ctx.save();
    ctx.fillStyle = meta.color;
    ctx.beginPath();
    ctx.arc(x + size * 0.5, y + size * 0.42, size * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x + size * 0.38, y + size * 0.62, size * 0.24, size * 0.18);
    ctx.fillRect(x + size * 0.22, y + size * 0.8, size * 0.56, size * 0.12);
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
    ctx.font = '700 18px "Share Tech Mono", "Noto Sans JP", monospace';
    ctx.textAlign = 'center';
    ctx.fillText((typeof t === 'function' ? t('collect.certBrand') : 'VOCALOID SLIDING PUZZLE'), canvas.width / 2, 88);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px Orbitron, "Noto Sans JP", "Segoe UI", sans-serif';
    const certTitle = spec.title || (typeof t === 'function' && spec.titleKey ? t(spec.titleKey) : 'Collection');
    ctx.fillText(certTitle, canvas.width / 2, 140);

    ctx.fillStyle = '#bfeff5';
    ctx.font = '600 22px "Share Tech Mono", monospace';
    ctx.fillText(spec.period || '', canvas.width / 2, 178);

    const rows = [
        { rank: 3, count: counts.gold || 0 },
        { rank: 2, count: counts.silver || 0 },
        { rank: 1, count: counts.bronze || 0 }
    ];
    rows.forEach((row, i) => {
        const y = 240 + i * 70;
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fillRect(160, y - 28, 580, 58);
        vspDrawTrophyCup(ctx, 190, y - 24, 44, row.rank);
        const meta = vspRankMeta(row.rank);
        ctx.fillStyle = meta.color;
        ctx.textAlign = 'left';
        ctx.font = '700 26px "Noto Sans JP", "Segoe UI", sans-serif';
        ctx.fillText(meta.label, 250, y + 8);
        ctx.textAlign = 'right';
        ctx.font = '800 30px "Share Tech Mono", monospace';
        ctx.fillText('×  ' + row.count, 710, y + 10);
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = '#8aa0b2';
    ctx.font = '14px "Noto Sans JP", "Segoe UI", sans-serif';
    ctx.fillText(typeof t === 'function' ? t('collect.certFooter') : 'Private collection on this browser · unofficial fan work', canvas.width / 2, 500);
    return canvas;
}

function vspDownloadCollectionCert(spec) {
    const go = () => {
        const canvas = vspDrawCollectionCert(spec);
        const link = document.createElement('a');
        const safe = String(spec.period || spec.kind || 'collection').replace(/[^\w\-]+/g, '_');
        link.download = `VSP-${spec.kind || 'collection'}-${safe}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    if (typeof vspWhenTrophiesReady === 'function') vspWhenTrophiesReady(go);
    else go();
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

function vspCollectNotice(win) {
    if (!win || !win.available) return '';
    const remaining = vspRemainingPhrase(win.expiresAt);
    const until = vspShortMDY(win.expiresAt);
    const tx = (key, vars) => (typeof t === 'function' ? t(key, vars) : key);
    if (win.kind === 'week') return tx('collect.weekNotice', { remaining });
    if (win.kind === 'month') return tx('collect.monthNotice', { period: win.period, until, remaining });
    if (win.kind === 'month-prev') return tx('collect.monthPrevNotice', { period: win.period, until, remaining });
    if (win.kind === 'year') return tx('collect.yearNotice', { period: win.period, until, remaining });
    if (win.kind === 'year-prev') return tx('collect.yearPrevNotice', { period: win.period, until, remaining });
    return '';
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
        const extra = [
            vspCollectNotice(windows.weekly),
            vspCollectNotice(windows.monthPrev),
            vspCollectNotice(windows.monthNow),
            vspCollectNotice(windows.yearPrev),
            vspCollectNotice(windows.yearNow)
        ].filter(Boolean);
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
                b.addEventListener('click', () => {
                    win.title = typeof t === 'function' && win.titleKey ? t(win.titleKey) : win.title;
                    vspDownloadCollectionCert(win);
                });
                homeDl.appendChild(b);
            };
            const tx = (key, vars) => (typeof t === 'function' ? t(key, vars) : key);
            add(windows.weekly, tx('collect.downloadWeek'));
            add(windows.monthPrev, tx('collect.downloadPeriod', { period: windows.monthPrev.period }));
            add(windows.monthNow, tx('collect.downloadPeriod', { period: windows.monthNow.period }));
            add(windows.yearPrev, tx('collect.downloadPeriod', { period: windows.yearPrev.period }));
            add(windows.yearNow, tx('collect.downloadPeriod', { period: windows.yearNow.period }));
        }
    }
    return windows;
}
