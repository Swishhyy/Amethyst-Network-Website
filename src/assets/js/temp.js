/**
 * Updates the "last updated" timestamp
 */
function updateLastCheckedTime() {
    const lastUpdatedElement = document.getElementById('last-updated-time');

    if (lastUpdatedElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        lastUpdatedElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

/**
 * Function to refresh server status periodically
 */
function setupAutoRefresh() {
    // Check server status every 2 minutes (120000 ms)
    setInterval(() => {
        simulateServerStatus();
    }, 120000);
}

// Setup auto-refresh when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupAutoRefresh();
});
