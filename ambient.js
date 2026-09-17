/* Gallery / workspace ambient background (crossfade + drifting motes). */
const VSP_AMBIENT_THEMES = {
    'miku-original': { color: '#00ffcc', bg: 'BG-themes/miku-original.webp' },
    'miku-supreme':  { color: '#4da6ff', bg: 'BG-themes/miku-supreme.webp' },
    'miku-honey':    { color: '#ff007f', bg: 'BG-themes/miku-honey.webp' },
    'miku-25ji':     { color: '#ff00ff', bg: 'BG-themes/miku-25ji.webp' },
    'vflower':       { color: '#b266ff', bg: 'BG-themes/vflower.webp' }
};
const VSP_AMBIENT_ORDER = ['miku-original', 'miku-supreme', 'miku-honey', 'miku-25ji', 'vflower'];

let vspActiveBgLayer = 'A';
let vspAmbientTimer = null;
let vspAmbientIndex = 0;
let vspParticlesReady = false;

function vspHexToRgba(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function vspSetAmbientTheme(key) {
    const config = VSP_AMBIENT_THEMES[key];
    if (!config) return;

    document.documentElement.style.setProperty('--ambient-color', config.color);
    document.documentElement.style.setProperty('--ambient-color-soft', vspHexToRgba(config.color, 0.22));
    document.body.dataset.theme = key;

    const next = document.getElementById(vspActiveBgLayer === 'A' ? 'bgImageLayerB' : 'bgImageLayerA');
    const current = document.getElementById(vspActiveBgLayer === 'A' ? 'bgImageLayerA' : 'bgImageLayerB');
    if (!next) return;
    next.style.backgroundImage = `url('${config.bg}')`;
    next.classList.add('active');
    if (current) current.classList.remove('active');
    vspActiveBgLayer = vspActiveBgLayer === 'A' ? 'B' : 'A';
}

function vspInitParticles() {
    const field = document.getElementById('particleField');
    if (!field || vspParticlesReady) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    vspParticlesReady = true;
    for (let i = 0; i < 14; i++) {
        const el = document.createElement('span');
        el.className = 'ambient-particle';
        const duration = 16 + Math.random() * 14;
        const size = 5 + Math.random() * 9;
        el.style.left = `${Math.random() * 100}%`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${-Math.random() * duration}s`;
        field.appendChild(el);
    }
}

function vspStartAmbientCycle() {
    vspStopAmbientCycle();
    vspAmbientIndex = 0;
    vspSetAmbientTheme(VSP_AMBIENT_ORDER[0]);
    vspAmbientTimer = setInterval(() => {
        vspAmbientIndex = (vspAmbientIndex + 1) % VSP_AMBIENT_ORDER.length;
        vspSetAmbientTheme(VSP_AMBIENT_ORDER[vspAmbientIndex]);
    }, 9000);
}

function vspStopAmbientCycle() {
    if (vspAmbientTimer) {
        clearInterval(vspAmbientTimer);
        vspAmbientTimer = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    vspInitParticles();
    const params = new URLSearchParams(window.location.search);
    const lock = params.get('char');
    const onWorkspace = /workspace_template\.html/i.test(window.location.pathname);
    if (onWorkspace && lock && VSP_AMBIENT_THEMES[lock]) {
        vspSetAmbientTheme(lock);
    } else {
        vspStartAmbientCycle();
    }
});
