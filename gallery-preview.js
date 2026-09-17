// Gallery hover preview, daily stage, and personal-best badges.
document.addEventListener('DOMContentLoaded', () => {
    const previewDiv = document.createElement('div');
    previewDiv.classList.add('hover-preview-pop');
    document.body.appendChild(previewDiv);

    const records = typeof vspLoadRecords === 'function' ? vspLoadRecords() : { puzzles: {} };
    const canRecord = typeof vspRecordId === 'function';
    const thumbs = document.querySelectorAll('.thumb-link');
    let cleared = 0;

    thumbs.forEach(thumb => {
        const imgNode = thumb.querySelector('.thumb-img');
        if (!imgNode) return;

        const href = thumb.getAttribute('href') || '';
        let charKey = '';
        let puzzleName = '';
        try {
            const u = new URL(href, window.location.href);
            charKey = u.searchParams.get('char') || '';
            puzzleName = u.searchParams.get('puzzle') || '';
        } catch (e) { /* ignore */ }

        const rec = canRecord && records.puzzles && records.puzzles[vspRecordId(charKey, puzzleName)];
        if (rec && rec.cleared) {
            cleared += 1;
            thumb.classList.add('is-cleared');
            const badge = document.createElement('span');
            badge.className = 'thumb-badge';
            badge.textContent = vspStarGlyphs(rec.bestStars || 1);
            thumb.appendChild(badge);

            const grids = rec.bests || {};
            const keys = Object.keys(grids);
            if (keys.length) {
                let pickKey = keys[0];
                let pick = grids[pickKey];
                keys.forEach(k => {
                    const g = grids[k];
                    if ((g.stars || 0) > (pick.stars || 0) ||
                        ((g.stars || 0) === (pick.stars || 0) && g.moves < pick.moves)) {
                        pickKey = k;
                        pick = g;
                    }
                });
                const pb = document.createElement('span');
                pb.className = 'thumb-pb';
                pb.textContent = `${pickKey} · ${pick.moves}m`;
                thumb.appendChild(pb);
            }
        }

        const previewSrc =
            thumb.getAttribute('data-preview') ||
            imgNode.getAttribute('data-preview') ||
            imgNode.getAttribute('src');

        thumb.addEventListener('mouseenter', () => {
            previewDiv.style.backgroundImage = `url('${previewSrc}')`;
            const rect = thumb.getBoundingClientRect();
            const previewWidth = 280;
            const previewHeight = 200;
            const clearance = 14;
            let centerX = rect.left + window.scrollX + rect.width / 2 - previewWidth / 2;
            let topY = rect.top + window.scrollY - previewHeight - clearance;
            const minX = window.scrollX + 8;
            const maxX = window.scrollX + window.innerWidth - previewWidth - 8;
            centerX = Math.max(minX, Math.min(maxX, centerX));
            if (topY < window.scrollY + 8) {
                topY = rect.bottom + window.scrollY + clearance;
            }
            previewDiv.style.width = `${previewWidth}px`;
            previewDiv.style.height = `${previewHeight}px`;
            previewDiv.style.left = `${centerX}px`;
            previewDiv.style.top = `${topY}px`;
            previewDiv.style.opacity = '1';
        });

        thumb.addEventListener('mouseleave', () => {
            previewDiv.style.opacity = '0';
        });
    });

    const progress = document.getElementById('gallery-progress');
    if (progress) progress.textContent = `Cleared ${cleared} / ${thumbs.length}`;

    const featured = typeof vspTodayFeatured === 'function' ? vspTodayFeatured() : null;
    if (featured) {
        const title = document.getElementById('daily-title');
        const meta = document.getElementById('daily-meta');
        const art = document.getElementById('daily-art');
        const play = document.getElementById('daily-play');
        const card = document.getElementById('daily-stage');
        if (title) title.textContent = featured.title;
        if (meta) meta.textContent = `${featured.rows} × ${featured.cols} · same stage for everyone today`;
        if (art) {
            art.src = featured.preview;
            art.alt = featured.title;
        }
        if (play) {
            play.href = `workspace_template.html?char=${encodeURIComponent(featured.char)}&puzzle=${encodeURIComponent(featured.puzzle)}&daily=1&rows=${featured.rows}&cols=${featured.cols}`;
        }
        const dailyRec = records.daily || {};
        if (card && dailyRec.date === featured.dateKey && dailyRec.cleared) {
            card.classList.add('is-cleared');
            if (meta) meta.textContent = `${featured.rows} × ${featured.cols} · cleared today ${vspStarGlyphs(dailyRec.stars || 1)}`;
        }
    }
});
