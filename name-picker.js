/* Thematic certificate name picker (manual clears only).
   Dual EN/JP lexicons ship in this file — no live dictionary APIs (itch is offline).
   NEVER add Vocaloid producer names (stage or legal), *P names, or producer circles.
   Official character personal names are also blocked so a certificate cannot look
   like a real producer or a Crypton character submitted the score. */
const VSP_PLAYER_NAME_KEY = 'vsp-player-name';
const VSP_NAME_LABEL_KEYS = ['name.adjective', 'name.theme', 'name.noun'];
const VSP_NAME_LABEL_FALLBACK = ['Adjective', 'Theme', 'Noun'];

const VSP_NAME_POOLS = {
    en: [
        ['Neon', 'Melodic', 'Digital', 'Holographic', 'Chiptune', 'Vibrant', 'Polyphonic', 'Cosmic', 'Rhythmic', 'Acoustic', 'Glitchy', 'Virtual', 'Electric', 'Lucid', 'Prismatic', 'Crystal', 'Midnight', 'Starlit', 'Chromatic', 'Harmonic', 'Analog', 'Future', 'Echoing', 'Radiant', 'Frozen', 'Luminous', 'Sonic', 'Iridescent', 'Celestial', 'Pastel', 'Vivid', 'Stellar', 'Aqua', 'Magenta', 'Cyan', 'Violet', 'Lunar', 'Polar', 'Aurora', 'Binary'],
        ['Synth', 'Leek', 'Megaphone', 'Note', 'Tuning', 'Stage', 'Sound', 'Module', 'Frequency', 'Lyric', 'Headset', 'Twintail', 'Chorus', 'Tempo', 'Octave', 'Circuit', 'Vocal', 'Harmony', 'Ribbon', 'Concert', 'Waveform', 'Studio', 'Melody', 'Beat', 'Pulse', 'Echo', 'Choir', 'Aria', 'Duet', 'Ballad', 'Encore', 'Spotlight', 'Mic', 'Phrase', 'Chord', 'Karaoke'],
        ['Dancer', 'Rabbit', 'Idol', 'Android', 'Pianist', 'Singer', 'Crescent', 'Vocalist', 'Runner', 'Pixel', 'Chibi', 'Songbird', 'Star', 'Dreamer', 'Diva', 'Conductor', 'Sprite', 'Wanderer', 'Guardian', 'Performer', 'Listener', 'Virtuoso', 'Soloist', 'Starlet', 'Muse', 'Phantom', 'Spark', 'Comet', 'Fox', 'Cat', 'Butterfly', 'Firefly', 'Nova', 'Prism', 'Voice', 'Avatar', 'Doll', 'Twin']
    ],
    ja: [
        ['ネオン', '電子', '未来', '夢幻', '電波', '星屑', '透明', '仮想', '疾走', '水晶', '銀河', '蒼き', '輝く', '夜空', '旋律', 'デジタル', 'ホロ', '宇宙', '律動', '閃光', '静寂', '流星', '銀の', '月下', '極光', '氷晶', '虹色', '漆黒', '純白', '翠の', '琥珀', '幻影', '星図', '真空', '真紅', '紺碧'],
        ['ネギ', 'シンセ', 'ライブ', 'モジュール', 'ヘッドセット', 'ツインテール', '歌声', 'ステージ', '音符', 'コーラス', 'テンポ', '回路', 'リボン', '波形', 'スタジオ', 'オクターブ', 'マイク', 'メロディ', 'ビート', 'エコー', '合唱', 'アリア', 'デュエット', 'バラード', 'コンサート', 'アンコール', '周波数', '歌詞', '調律', '鍵盤', 'ヘッドフォン', 'スポット', 'ライト', 'パルス', 'コード'],
        ['歌姫', 'うさぎ', 'アイドル', 'アンドロイド', 'ディーヴァ', 'ランナー', 'ピアニスト', 'ダンサー', 'ボーカリスト', '星', '精霊', '演者', 'ちび', 'ピクセル', '奏者', 'ソリスト', '夢追い', '守護者', '狐', '猫', '蝶', '蛍', '彗星', 'ノヴァ', 'プリズム', '声', 'アバター', '人形', '双星', '旅人', '火花', 'ミューズ', '小鳥', '明星', '残響']
    ]
};

/* Exact tokens (any length) and longer substrings. Keep this updated if a pool word is added. */
const VSP_NAME_BAN_EXACT = [
    'ryo', 'kz', 'jin', 'toa', 'niki', 'hachi', 'neru', 'len', 'rin', 'ia', 'p',
    'ハチ', 'じん', 'ギガ', 'とく', 'ミク', 'リン', 'レン', 'ルカ', 'メイコ', 'カイト',
    'グミ', 'テト', '花譜', '理芽', '可不'
];
const VSP_NAME_BAN_SUBSTR = [
    'wowaka', 'livetune', 'supercell', 'pinocchio', 'mitchie', 'honeyworks', 'honey works',
    'deco27', 'deco*27', 'yonezu', 'mothy', 'akuno', 'mikito', 'mafumafu', 'yorushika',
    'yoasobi', 'ayase', 'n-buna', 'nbuna', 'kairiki', 'nuyuri', '40mp', 'oster',
    'hachioji', 'yuyoyuppe', 'kurousa', 'lamaze', 'tenkomori', 'hitoshizuku', 'marasy',
    'nanahoshi', 'sasakure', 'samfree', 'easypop', 'dixie', 'kemu', 'rerulili',
    'nayatane', 'producer', 'composer', 'arranger', 'lyricist', 'vocaloid-p', 'vocaloidp',
    'hatsune', 'kagamine', 'megurine', 'miku', 'luka', 'meiko', 'kaito', 'gumi', 'teto',
    'yukari', 'fukase', 'vflower',
    'プロデューサー', '作曲家', '作曲者', 'ボカロp', 'ボカロｐ', 'ボカロP', '調声',
    'wowaka', '米津', 'デコ*27', 'デコ27', 'ピノキオ', 'ナユタン', 'まふまふ', 'れるりり',
    'かいりき', 'ぬゆり', 'すりぃ', 'カンザキ', '八王子', 'ゆよゆっぺ', '黒うさ', 'ラマーズ',
    '蝶々p', '蝶々P', 'さつきがてんこもり', 'ひとしずく', 'まらしぃ', 'ナナホシ', '煮ル果実',
    'ユリイ', '柊キライ', '初音', '鏡音', '巡音', '結月', '星街', 'Mitchie', 'cosMo',
    'HoneyWorks', 'livetune'
];

function vspNameLang() {
    return (typeof vspGetLang === 'function' && vspGetLang() === 'ja') ? 'ja' : 'en';
}

function vspNamePools() {
    const packs = VSP_NAME_POOLS[vspNameLang()] || VSP_NAME_POOLS.en;
    return packs;
}

function vspNameLooksLikeProducer(word) {
    const w = String(word || '').trim();
    if (!w) return true;
    if (/[A-Za-z0-9][-_－]?[PpＰｐ]$/.test(w)) return true;
    if (/ピー$/.test(w) || /[Ｐｐ]$/.test(w)) return true;
    const lower = w.toLowerCase();
    const compact = lower.replace(/[\s*_．.・\-]/g, '');
    for (let i = 0; i < VSP_NAME_BAN_EXACT.length; i++) {
        const ban = VSP_NAME_BAN_EXACT[i];
        if (lower === ban.toLowerCase() || w === ban || compact === ban.toLowerCase()) return true;
    }
    for (let i = 0; i < VSP_NAME_BAN_SUBSTR.length; i++) {
        const ban = VSP_NAME_BAN_SUBSTR[i];
        if (!ban || ban.length < 4) continue;
        const bLower = ban.toLowerCase();
        if (lower.includes(bLower) || w.includes(ban) || compact.includes(bLower.replace(/[\s*_]/g, ''))) return true;
    }
    return false;
}

function vspWordAllowed(word, pool) {
    if (!word || typeof word !== 'string') return false;
    if (vspNameLooksLikeProducer(word)) return false;
    if (vspNameLooksLikeProducer(word.replace(/\s+/g, ''))) return false;
    return !pool || pool.indexOf(word) !== -1;
}

function vspPickWord(pool, avoid) {
    const clean = (pool || []).filter((w) => !vspNameLooksLikeProducer(w));
    if (!clean.length) return '';
    let word = clean[Math.floor(Math.random() * clean.length)];
    let guard = 0;
    while (word === avoid && clean.length > 1 && guard < 24) {
        word = clean[Math.floor(Math.random() * clean.length)];
        guard += 1;
    }
    return word;
}

function vspFreshNameState() {
    const pools = vspNamePools();
    return {
        words: pools.map((pool) => vspPickWord(pool)),
        locks: [false, false, false]
    };
}

function vspEmptyNameStore() {
    return { v: 2, langs: { en: null, ja: null } };
}

function vspReadNameStore() {
    try {
        const raw = localStorage.getItem(VSP_PLAYER_NAME_KEY);
        if (!raw) return vspEmptyNameStore();
        const data = JSON.parse(raw);
        if (data && data.v === 2 && data.langs && typeof data.langs === 'object') {
            return {
                v: 2,
                langs: {
                    en: data.langs.en || null,
                    ja: data.langs.ja || null
                }
            };
        }
        if (data && Array.isArray(data.words) && data.words.length === 3) {
            const store = vspEmptyNameStore();
            store.langs.en = {
                words: data.words.slice(0, 3),
                locks: Array.isArray(data.locks) ? data.locks.slice(0, 3).map(Boolean) : [false, false, false],
                name: data.name || ''
            };
            return store;
        }
    } catch (e) { /* ignore */ }
    return vspEmptyNameStore();
}

function vspNormalizeNameState(state) {
    const pools = vspNamePools();
    const src = state && typeof state === 'object' ? state : {};
    const words = [];
    const locks = [];
    for (let i = 0; i < 3; i++) {
        let word = Array.isArray(src.words) ? src.words[i] : '';
        let locked = Array.isArray(src.locks) ? !!src.locks[i] : false;
        if (!vspWordAllowed(word, pools[i])) {
            word = vspPickWord(pools[i]);
            locked = false;
        }
        words.push(word);
        locks.push(locked);
    }
    return { words, locks };
}

function vspLoadNameState() {
    const lang = vspNameLang();
    const store = vspReadNameStore();
    return vspNormalizeNameState(store.langs[lang]);
}

function vspFormatPlayerName(state) {
    const words = state && Array.isArray(state.words) ? state.words : [];
    return words.join(' ').replace(/\s+/g, ' ').trim();
}

function vspSaveNameState(state) {
    const lang = vspNameLang();
    const store = vspReadNameStore();
    const name = vspFormatPlayerName(state);
    store.v = 2;
    store.langs[lang] = {
        words: state.words.slice(0, 3),
        locks: state.locks.slice(0, 3),
        name
    };
    try {
        localStorage.setItem(VSP_PLAYER_NAME_KEY, JSON.stringify(store));
    } catch (e) { /* ignore */ }
}

let vspNameState = vspLoadNameState();
let vspNameSubmitCb = null;

function vspNameLabel(i) {
    return typeof t === 'function' ? t(VSP_NAME_LABEL_KEYS[i]) : VSP_NAME_LABEL_FALLBACK[i];
}

function vspRenderNamePicker() {
    const preview = document.getElementById('name-picker-preview');
    if (preview) preview.textContent = vspFormatPlayerName(vspNameState);
    for (let i = 0; i < 3; i += 1) {
        const label = vspNameLabel(i);
        const wordEl = document.getElementById('name-slot-word-' + i);
        const slot = document.getElementById('name-slot-' + i);
        const lockEl = document.getElementById('name-slot-lock-' + i);
        const reroll = document.getElementById('name-slot-reroll-' + i);
        if (wordEl) wordEl.textContent = vspNameState.words[i];
        const locked = !!vspNameState.locks[i];
        const state = typeof t === 'function'
            ? t(locked ? 'name.locked' : 'name.unlocked')
            : (locked ? 'Locked' : 'Unlocked');
        if (slot) {
            slot.classList.toggle('is-locked', locked);
            slot.setAttribute('aria-pressed', locked ? 'true' : 'false');
            slot.setAttribute('aria-label', typeof t === 'function'
                ? t('name.slotAria', { label, word: vspNameState.words[i], state })
                : `${label} ${vspNameState.words[i]}. ${state}.`);
        }
        if (lockEl) {
            lockEl.textContent = locked
                ? (typeof t === 'function' ? t('name.locked') : 'Locked')
                : (typeof t === 'function' ? t('name.tapLock') : 'Tap to lock');
        }
        if (reroll) reroll.disabled = locked;
    }
}

function vspRerollName(slotIndex) {
    const pools = vspNamePools();
    if (slotIndex == null) {
        vspNameState.words = vspNameState.words.map((word, i) => (
            vspNameState.locks[i] ? word : vspPickWord(pools[i], word)
        ));
    } else if (!vspNameState.locks[slotIndex]) {
        vspNameState.words[slotIndex] = vspPickWord(pools[slotIndex], vspNameState.words[slotIndex]);
    }
    vspRenderNamePicker();
}

function vspToggleNameLock(index) {
    vspNameState.locks[index] = !vspNameState.locks[index];
    vspRenderNamePicker();
}

function vspCloseNamePicker() {
    const overlay = document.getElementById('name-picker-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
    }
}

function vspSubmitPickedName() {
    const assembled = vspFormatPlayerName(vspNameState);
    if (vspNameLooksLikeProducer(assembled) || assembled.split(' ').some((part) => vspNameLooksLikeProducer(part))) {
        vspNameState = vspFreshNameState();
        vspRenderNamePicker();
        return;
    }
    const name = assembled || (typeof t === 'function' ? t('cert.player') : 'Player');
    vspSaveNameState(vspNameState);
    vspCloseNamePicker();
    const cb = vspNameSubmitCb;
    vspNameSubmitCb = null;
    if (typeof cb === 'function') cb(name);
}

function vspOpenNamePicker(onSubmit) {
    vspNameSubmitCb = typeof onSubmit === 'function' ? onSubmit : null;
    vspNameState = vspLoadNameState();
    vspRenderNamePicker();
    const overlay = document.getElementById('name-picker-overlay');
    if (!overlay) {
        if (vspNameSubmitCb) vspNameSubmitCb(vspFormatPlayerName(vspNameState) || (typeof t === 'function' ? t('cert.player') : 'Player'));
        return;
    }
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    const submit = document.getElementById('name-submit-btn');
    if (submit) setTimeout(() => submit.focus(), 80);
}

function vspBindNamePicker() {
    const overlay = document.getElementById('name-picker-overlay');
    if (!overlay || overlay.dataset.bound === '1') return;
    overlay.dataset.bound = '1';
    for (let i = 0; i < 3; i += 1) {
        const slot = document.getElementById('name-slot-' + i);
        const reroll = document.getElementById('name-slot-reroll-' + i);
        if (slot) {
            slot.addEventListener('click', (event) => {
                if (event.target.closest('.name-slot-reroll')) return;
                vspToggleNameLock(i);
            });
            slot.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    vspToggleNameLock(i);
                }
            });
        }
        if (reroll) {
            reroll.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                vspRerollName(i);
            });
        }
    }
    const all = document.getElementById('name-reroll-btn');
    const submit = document.getElementById('name-submit-btn');
    if (all) all.addEventListener('click', () => vspRerollName());
    if (submit) submit.addEventListener('click', () => vspSubmitPickedName());
}

document.addEventListener('DOMContentLoaded', vspBindNamePicker);
window.addEventListener('vsp-langchange', () => {
    vspNameState = vspLoadNameState();
    vspRenderNamePicker();
});
