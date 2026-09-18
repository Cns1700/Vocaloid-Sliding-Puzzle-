/* Shared gold/silver/bronze cups. Loaded after records.js + engine_logic.js. */
(function () {
    function meta(rank) {
        if (typeof vspRankMeta === 'function') return vspRankMeta(rank);
        if (rank >= 3) return { key: 'gold', label: 'Gold', color: '#f5c542' };
        if (rank === 2) return { key: 'silver', label: 'Silver', color: '#c5cdd8' };
        if (rank === 1) return { key: 'bronze', label: 'Bronze', color: '#d08a4a' };
        return { key: 'none', label: 'Unranked', color: '#e74c3c' };
    }

    window.vspTrophyMarkup = function (rank, size) {
        const s = size || 18;
        const m = meta(rank);
        if (m.key === 'none') return typeof vspTrophySvg === 'function' ? vspTrophySvg(rank, s) : '';
        return '<img class="trophy-icon trophy-' + m.key + '" src="icons/trophy-' + m.key + '.svg" width="' + s + '" height="' + s + '" alt="" aria-hidden="true">';
    };

    window.vspDrawTrophyCup = function (ctx, x, y, size, rank) {
        const cup = meta(rank).color;
        ctx.save();
        ctx.translate(x, y);
        const s = size / 24;
        ctx.scale(s, s);
        ctx.fillStyle = cup;
        ctx.beginPath();
        ctx.moveTo(7, 3); ctx.lineTo(17, 3); ctx.lineTo(17, 4.8);
        ctx.bezierCurveTo(17, 7.95, 14.76, 10.5, 12, 10.5);
        ctx.bezierCurveTo(9.24, 10.5, 7, 7.95, 7, 4.8);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(4.15, 4.2); ctx.lineTo(6.35, 4.2);
        ctx.bezierCurveTo(6.55, 7.4, 8.9, 9.7, 12, 9.7);
        ctx.bezierCurveTo(15.1, 9.7, 17.45, 7.4, 17.65, 4.2);
        ctx.lineTo(19.85, 4.2);
        ctx.bezierCurveTo(20.33, 6.75, 18.8, 9.9, 15.9, 11.25);
        ctx.lineTo(15.3, 14); ctx.lineTo(8.7, 14); ctx.lineTo(8.15, 11.25);
        ctx.bezierCurveTo(5.25, 9.9, 3.67, 6.75, 4.15, 4.2);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(10.2, 14, 3.6, 2.35);
        ctx.fillRect(8.1, 16.35, 7.8, 1.45);
        ctx.fillRect(6.6, 18.3, 10.8, 2.5);
        ctx.restore();
    };

    const oldUpdate = window.updateRankPanel;
    window.updateRankPanel = function () {
        const body = document.getElementById('rank-table-body');
        if (!body) {
            if (typeof oldUpdate === 'function') oldUpdate();
            return;
        }
        const label = document.getElementById('rank-grid-label');
        const rowsN = (typeof gridRows === 'number' && gridRows >= 3) ? gridRows : 3;
        const colsN = (typeof gridCols === 'number' && gridCols >= 3) ? gridCols : 3;
        if (label) label.textContent = 'This grid: ' + rowsN + '\u00d7' + colsN;
        const fallback = { gold: { time: 180, moves: 70 }, silver: { time: 480, moves: 160 }, bronze: { time: 1200, moves: 400 } };
        const t = (typeof vspRankThresholds === 'function') ? vspRankThresholds(rowsN, colsN) : fallback;
        const fmt = (typeof vspFormatRankTime === 'function') ? vspFormatRankTime : function (sec) {
            const s = Math.max(0, sec | 0);
            return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
        };
        const rows = [
            { rank: 3, name: 'Gold', time: t.gold.time, moves: t.gold.moves },
            { rank: 2, name: 'Silver', time: t.silver.time, moves: t.silver.moves },
            { rank: 1, name: 'Bronze', time: t.bronze.time, moves: t.bronze.moves }
        ];
        const keys = ['gold', 'silver', 'bronze'];
        body.innerHTML = rows.map(function (row, i) {
            return '<tr class="rank-row-' + keys[i] + '"><th scope="row">' +
                vspTrophyMarkup(row.rank, 20) + ' ' + row.name +
                '</th><td>\u2264 ' + fmt(row.time) + '</td><td>\u2264 ' + row.moves + '</td></tr>';
        }).join('');
    };

    if (typeof generateCertificateImage === 'function') {
        const orig = generateCertificateImage;
        window.generateCertificateImage = function (isAuto, timeString, movesCount) {
            const proto = CanvasRenderingContext2D.prototype;
            const oldFill = proto.fillText;
            let sawRank = false;
            proto.fillText = function (text, x, y) {
                const str = String(text);
                if (str === 'RANK:') sawRank = true;
                if (sawRank && (str === 'GOLD' || str === 'SILVER' || str === 'BRONZE')) {
                    const starN = str === 'GOLD' ? 3 : str === 'SILVER' ? 2 : 1;
                    const m = meta(starN);
                    const suffix = '| ' + str;
                    this.fillStyle = m.color;
                    oldFill.call(this, suffix, x, y);
                    const w = this.measureText(suffix).width;
                    vspDrawTrophyCup(this, x - w - 28, y - 16, 20, starN);
                    sawRank = false;
                    return;
                }
                return oldFill.apply(this, arguments);
            };
            try {
                return orig(isAuto, timeString, movesCount);
            } finally {
                proto.fillText = oldFill;
            }
        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (typeof updateRankPanel === 'function' && document.getElementById('rank-table-body')) {
            updateRankPanel();
        }
        document.querySelectorAll('.week-emoji').forEach(function (el, i) {
            const wrap = document.createElement('span');
            wrap.innerHTML = vspTrophyMarkup([3, 2, 1][i], 20);
            if (wrap.firstChild) el.replaceWith(wrap.firstChild);
        });
        if (!document.querySelector('.credits-menu')) {
            const foot = document.createElement('footer');
            foot.className = 'site-footer';
            foot.innerHTML = '<details class="credits-menu"><summary>Credits</summary>' +
                '<p>Art and characters belong to their owners (Crypton Future Media, Piapro, and the illustrators). Unofficial fan work.</p>' +
                '<p>Rank trophies are the same cup in gold, silver, and bronze (<code>icons/trophy-*.svg</code>). Replace those files with Flaticon trophies if you want; add the Flaticon author here if you do.</p>' +
                '</details>';
            document.body.appendChild(foot);
        }
    });
})();
