// Screenshot Gallery JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Screenshots page loaded');
    initScreenshotGallery();
});

/**
 * Initialize the screenshot gallery functionality
 */
function initScreenshotGallery() {
    // Check if we have an empty state
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        console.log('Empty state detected - no screenshots available');
        return; // Exit early if we're showing the empty state
    }
    
    // Get DOM elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click event for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the filter value
            const filterValue = button.getAttribute('data-filter');
            // Filter the gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });    
    // Add click event to gallery items for lightbox effect
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const caption = item.querySelector('.gallery-caption').innerHTML;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="Screenshot">
                    <div class="lightbox-caption">${caption}</div>
                </div>
            `;
            
            // Add lightbox to document
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Add close functionality
            const closeButton = lightbox.querySelector('.close-lightbox');
            closeButton.addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            // Close on click outside the image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Handle keyboard events for modal
    window.addEventListener('keydown', (e) => {
        // Close modal on Escape key
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Simulate image loading with fade-in animation
function loadImages() {
    // In a real implementation, this would load actual images
    // For now, just simulate the loading effect
    const placeholders = document.querySelectorAll('.screenshot-placeholder');
    
    placeholders.forEach((placeholder, index) => {
        setTimeout(() => {
            placeholder.classList.add('loaded');
        }, 100 * index);
    });
}
