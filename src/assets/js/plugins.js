/**
 * Plugins Page JavaScript
 * Handles plugin card collapsible behavior and category filtering
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize plugin cards as collapsed by default
    const pluginCards = document.querySelectorAll('.plugin-card');
    const pluginHeaders = document.querySelectorAll('.plugin-header');
    
    // Make first plugin card active by default for better UX
    if (pluginCards.length > 0) {
        pluginCards[0].classList.add('active');
    }
    
    // Add click handlers to plugin headers
    pluginHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.plugin-card');
            card.classList.toggle('active');
        });
    });
    
    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            // Show all cards or filter by category
            pluginCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
