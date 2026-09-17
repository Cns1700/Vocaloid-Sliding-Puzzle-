// Gallery hover preview, daily stage, and personal-best badges.
document.addEventListener('DOMContentLoaded', () => {
    const previewDiv = document.createElement('div');
    previewDiv.classList.add('hover-preview-pop');
    const previewImg = document.createElement('img');
    previewImg.alt = '';
    previewDiv.appendChild(previewImg);
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

        const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (canHover) {
            thumb.addEventListener('mouseenter', () => {
                previewDiv.dataset.active = '1';
                const panel = thumb.closest('.character-panel');
                const theme = panel ? getComputedStyle(panel).getPropertyValue('--theme-color').trim() : '';
                if (theme) previewDiv.style.borderColor = theme;
                previewImg.src = previewSrc;

                const place = () => {
                    if (previewDiv.dataset.active !== '1') return;
                    const MAX_W = 268;
                    const MAX_H = 200;
                    const natW = previewImg.naturalWidth || MAX_W;
                    const natH = previewImg.naturalHeight || MAX_H;
                    const scale = Math.min(MAX_W / natW, MAX_H / natH);
                    const previewWidth = Math.max(72, Math.round(natW * scale));
                    const previewHeight = Math.max(72, Math.round(natH * scale));
                    previewImg.style.width = `${previewWidth}px`;
                    previewImg.style.height = `${previewHeight}px`;

                    const rect = thumb.getBoundingClientRect();
                    const clearance = 12;
                    let centerX = rect.left + window.scrollX + rect.width / 2 - previewWidth / 2;
                    let topY = rect.top + window.scrollY - previewHeight - clearance;
                    const minX = window.scrollX + 8;
                    const maxX = window.scrollX + window.innerWidth - previewWidth - 8;
                    centerX = Math.max(minX, Math.min(maxX, centerX));
                    if (topY < window.scrollY + 8) {
                        topY = rect.bottom + window.scrollY + clearance;
                    }
                    previewDiv.style.left = `${centerX}px`;
                    previewDiv.style.top = `${topY}px`;
                    previewDiv.style.opacity = '1';
                };

                if (previewImg.complete && previewImg.naturalWidth) place();
                else previewImg.onload = place;
            });

            thumb.addEventListener('mouseleave', () => {
                previewDiv.dataset.active = '0';
                previewDiv.style.opacity = '0';
            });
        }
    });

    window.addEventListener('scroll', () => {
        previewDiv.dataset.active = '0';
        previewDiv.style.opacity = '0';
    }, { passive: true });

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
