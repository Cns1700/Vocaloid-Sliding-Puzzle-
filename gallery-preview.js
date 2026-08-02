// Gallery hover preview — uses medium-res `data-preview` when available
// so the pop-up stays sharp without loading full puzzle files on page load.
document.addEventListener('DOMContentLoaded', () => {
    const previewDiv = document.createElement('div');
    previewDiv.classList.add('hover-preview-pop');
    document.body.appendChild(previewDiv);

    const thumbnails = document.querySelectorAll('.thumb-link');

    thumbnails.forEach(thumb => {
        const imgNode = thumb.querySelector('.thumb-img');
        if (!imgNode) return;

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
});
