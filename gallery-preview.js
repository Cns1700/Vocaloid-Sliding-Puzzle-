// Gallery Interaction Management Script
document.addEventListener('DOMContentLoaded', () => {
    // Create the floating preview container node dynamically
    const previewDiv = document.createElement('div');
    previewDiv.classList.add('hover-preview-pop');
    document.body.appendChild(previewDiv);

    const thumbnails = document.querySelectorAll('.thumb-link');

    thumbnails.forEach(thumb => {
        const imgNode = thumb.querySelector('.thumb-img');
        if (!imgNode) return;

        // Capture the image source path
        const imgSrc = imgNode.getAttribute('src');

        // Mouse enters a thumbnail target area - Set static anchored position
        thumb.addEventListener('mouseenter', () => {
            previewDiv.style.backgroundImage = `url('${imgSrc}')`;
            
            // Get precise position of the specific thumbnail on the screen
            const rect = thumb.getBoundingClientRect();
            
            // Position preview centered directly ABOVE the thumbnail box
            // (Assumes a 250px wide preview from style.css)
            const previewWidth = 250;
            const previewHeight = 150;
            const clearance = 15; // Space between thumb and preview
            
            const centerX = rect.left + window.scrollX + (rect.width / 2) - (previewWidth / 2);
            const topY = rect.top + window.scrollY - previewHeight - clearance;

            previewDiv.style.left = `${centerX}px`;
            previewDiv.style.top = `${topY}px`;
            previewDiv.style.opacity = '1';
        });

        // Mouse exits the thumbnail target area
        thumb.addEventListener('mouseleave', () => {
            previewDiv.style.opacity = '0';
        });
    });
});