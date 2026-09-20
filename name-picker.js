/* Thematic certificate name picker (manual clears only). */
const VSP_NAME_POOLS = [
    ['Neon', 'Melodic', 'Digital', 'Holographic', 'Chiptune', 'Vibrant', 'Polyphonic', 'Cosmic', 'Rhythmic', 'Acoustic', 'Glitchy', 'Virtual'],
    ['Synth', 'Leek', 'Megaphone', 'Note', 'Tuning', 'Stage', 'Divas', 'Sound', 'Project', 'Module', 'Frequency', 'Lyric'],
    ['Master', 'Dancer', 'Rabbit', 'Idol', 'Android', 'Pianist', 'Singer', 'Crescent', 'Vocalist', 'Runner', 'Pixel', 'Chibi']
];
const VSP_NAME_LABELS = ['Adjective', 'Theme', 'Noun'];
const VSP_PLAYER_NAME_KEY = 'vsp-player-name';

function vspPickWord(pool, avoid) {
    if (!pool || !pool.length) return '';
    let word = pool[Math.floor(Math.random() * pool.length)];
    let guard = 0;
    while (word === avoid && pool.length > 1 && guard < 16) {
        word = pool[Math.floor(Math.random() * pool.length)];
        guard += 1;
    }
    return word;
}

function vspFreshNameState() {
    return {
        words: VSP_NAME_POOLS.map((pool) => vspPickWord(pool)),
        locks: [false, false, false]
    };
}

function vspLoadNameState() {
    try {
        const raw = localStorage.getItem(VSP_PLAYER_NAME_KEY);
        if (!raw) return vspFreshNameState();
        const data = JSON.parse(raw);
        if (!data || !Array.isArray(data.words) || data.words.length !== 3) return vspFreshNameState();
        const locks = Array.isArray(data.locks) ? data.locks.slice(0, 3).map(Boolean) : [false, false, false];
        while (locks.length < 3) locks.push(false);
        return { words: data.words.slice(0, 3), locks };
    } catch (e) {
        return vspFreshNameState();
    }
}

function vspFormatPlayerName(state) {
    const words = state && Array.isArray(state.words) ? state.words : [];
    return words.join(' ').replace(/\s+/g, ' ').trim();
}

function vspSaveNameState(state) {
    const name = vspFormatPlayerName(state);
    localStorage.setItem(VSP_PLAYER_NAME_KEY, JSON.stringify({
        words: state.words,
        locks: state.locks,
        name
    }));
}

let vspNameState = vspLoadNameState();
let vspNameSubmitCb = null;

function vspNameLabel(i) {
    const keys = ['name.adjective', 'name.theme', 'name.noun'];
    const fallback = ['Adjective', 'Theme', 'Noun'];
    return typeof t === 'function' ? t(keys[i]) : fallback[i];
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
    if (slotIndex == null) {
        vspNameState.words = vspNameState.words.map((word, i) => (
            vspNameState.locks[i] ? word : vspPickWord(VSP_NAME_POOLS[i], word)
        ));
    } else if (!vspNameState.locks[slotIndex]) {
        vspNameState.words[slotIndex] = vspPickWord(VSP_NAME_POOLS[slotIndex], vspNameState.words[slotIndex]);
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
    const name = vspFormatPlayerName(vspNameState) || (typeof t === 'function' ? t('cert.player') : 'Player');
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
    if (typeof vspRenderNamePicker === 'function') vspRenderNamePicker();
});
