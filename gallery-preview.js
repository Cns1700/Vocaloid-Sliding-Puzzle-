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
            const stars = rec.bestStars || 1;
            badge.innerHTML = typeof vspTrophyMarkup === 'function'
                ? vspTrophyMarkup(stars, 14)
                : (typeof vspTrophySvg === 'function' ? vspTrophySvg(stars, 14) : vspStarGlyphs(stars));
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

                    const imgEl = thumb.querySelector('.thumb-img') || thumb;
                    const rect = imgEl.getBoundingClientRect();
                    const border = 2;
                    const gap = 8;
                    const popW = previewWidth + border * 2;
                    const popH = previewHeight + border * 2;
                    let left = rect.left + rect.width / 2 - popW / 2;
                    let top = rect.top - popH - gap;
                    left = Math.max(8, Math.min(window.innerWidth - popW - 8, left));
                    if (top < 8) top = rect.bottom + gap;
                    if (top + popH > window.innerHeight - 8) {
                        top = Math.max(8, window.innerHeight - popH - 8);
                    }
                    previewDiv.style.position = 'fixed';
                    previewDiv.style.left = `${Math.round(left)}px`;
                    previewDiv.style.top = `${Math.round(top)}px`;
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
    if (progress) {
        const label = typeof t === 'function'
            ? t('gallery.progress', { cleared, total: thumbs.length })
            : `Cleared ${cleared} / ${thumbs.length}`;
        progress.textContent = label;
    }

    function paintDailyStage() {
        const featured = typeof vspTodayFeatured === 'function' ? vspTodayFeatured() : null;
        if (!featured) return;
        const titleText = typeof vspLocalizedTitle === 'function' ? vspLocalizedTitle(featured) : featured.title;
        const title = document.getElementById('daily-title');
        const meta = document.getElementById('daily-meta');
        const art = document.getElementById('daily-art');
        const play = document.getElementById('daily-play');
        const card = document.getElementById('daily-stage');
        if (title) title.textContent = titleText;
        if (art) {
            art.src = featured.preview;
            art.alt = titleText;
        }
        if (play) {
            play.href = `workspace_template.html?char=${encodeURIComponent(featured.char)}&puzzle=${encodeURIComponent(featured.puzzle)}&daily=1&rows=${featured.rows}&cols=${featured.cols}`;
        }
        const dailyRec = records.daily || {};
        const tx = (key, vars) => (typeof t === 'function' ? t(key, vars) : key);
        if (card && dailyRec.date === featured.dateKey && dailyRec.cleared) {
            card.classList.add('is-cleared');
            if (meta) {
                meta.textContent = tx('daily.cleared', {
                    rows: featured.rows,
                    cols: featured.cols,
                    stars: typeof vspStarGlyphs === 'function' ? vspStarGlyphs(dailyRec.stars || 1) : ''
                });
            }
        } else if (meta) {
            meta.textContent = tx('daily.meta', { rows: featured.rows, cols: featured.cols });
        }
    }

    function refreshThumbAlts() {
        if (typeof VSP_CATALOG === 'undefined' || typeof vspLocalizedTitle !== 'function') return;
        thumbs.forEach((thumb) => {
            const imgNode = thumb.querySelector('.thumb-img');
            const href = thumb.getAttribute('href') || '';
            try {
                const u = new URL(href, window.location.href);
                const charKey = u.searchParams.get('char') || '';
                const puzzleName = u.searchParams.get('puzzle') || '';
                const item = VSP_CATALOG.find((entry) => entry.char === charKey && entry.puzzle === puzzleName);
                if (item && imgNode) imgNode.alt = vspLocalizedTitle(item);
            } catch (e) { /* ignore */ }
        });
    }

    paintDailyStage();
    refreshThumbAlts();

    if (typeof vspRenderCollectionUi === 'function') {
        vspRenderCollectionUi({});
    }

    window.addEventListener('vsp-langchange', () => {
        if (progress) {
            const label = typeof t === 'function'
                ? t('gallery.progress', { cleared, total: thumbs.length })
                : `Cleared ${cleared} / ${thumbs.length}`;
            progress.textContent = label;
        }
        paintDailyStage();
        refreshThumbAlts();
        if (typeof vspRenderCollectionUi === 'function') vspRenderCollectionUi({});
    });
});
