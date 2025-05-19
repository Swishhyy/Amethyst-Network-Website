// Main JavaScript file for Amethyst Network Minecraft server website

document.addEventListener('DOMContentLoaded', () => {
    console.log('Amethyst Network website loaded');
    
    // Minecraft server status simulation
    simulateServerStatus();
    
    // Initialize hover sound effects
    initHoverSounds();
    
    // Add Minecraft-like cursor effects
    initCursorEffects();
    
    // Generate floating particles
    generateParticles();
});

/**
 * Fetches Minecraft server status from the API
 */
function simulateServerStatus() {
    const playerCountElements = document.querySelectorAll('.player-count');
    const statusIndicators = document.querySelectorAll('.status-indicator');
    const statusTextElements = document.querySelectorAll('.status-text');
    
    // Use the Minecraft Server Status API (mcapi.us)
    // Replace with your actual server IP
    const serverIP = 'play.amethystnetwork.com'; // This should be your actual server IP
    const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Server status:', data);
            
            if (data.online) {
                // Server is online
                statusIndicators.forEach(indicator => {
                    indicator.classList.add('status-online');
                    indicator.classList.remove('status-offline');
                });
                
                statusTextElements.forEach(text => {
                    if (text) text.textContent = 'Online';
                });
                
                const playersOnline = data.players?.online || 0;
                const playersMax = data.players?.max || 100;
                
                playerCountElements.forEach(element => {
                    if (element) element.textContent = `${playersOnline}/${playersMax}`;
                });
                
                // Update player count visualization bar
                updatePlayerCountBar(playersOnline, playersMax);
                
                // Update server time (simulated Minecraft time)
                updateServerTime();
            } else {
                // Server is offline
                statusIndicators.forEach(indicator => {
                    indicator.classList.add('status-offline');
                    indicator.classList.remove('status-online');
                });
                
                statusTextElements.forEach(text => {
                    if (text) text.textContent = 'Offline';
                });
                
                playerCountElements.forEach(element => {
                    if (element) element.textContent = 'Server offline';
                });
                
                // Update player count visualization bar to zero
                updatePlayerCountBar(0, 100);
            }
        })        .catch(error => {
            console.error('Error fetching server status:', error);
            
            // Fallback to simulation if API fails
            fallbackServerStatus(playerCountElements, statusIndicators, statusTextElements);
        });
        
        // Set up interval to update the server time every minute
        setInterval(updateServerTime, 60000);
}

/**
 * Fallback function when the API fails
 */
function fallbackServerStatus(playerCountElements, statusIndicators, statusTextElements) {
    // Simulate random player count between 5-50
    const playerOnline = Math.floor(Math.random() * 45) + 5;
    
    // 90% chance server is online for demo purposes
    const isOnline = Math.random() > 0.1;
    
    if (isOnline) {
        statusIndicators.forEach(indicator => {
            if (indicator) {
                indicator.classList.add('status-online');
                indicator.classList.remove('status-offline');
            }
        });
        
        statusTextElements.forEach(text => {
            if (text) text.textContent = 'Online';
        });
        
        playerCountElements.forEach(element => {
            if (element) element.textContent = `${playerOnline}/100`;
        });
        
        // Update player count visualization bar
        updatePlayerCountBar(playerOnline, 100);
    } else {
        statusIndicators.forEach(indicator => {
            if (indicator) {
                indicator.classList.add('status-offline');
                indicator.classList.remove('status-online');
            }
        });
        
        statusTextElements.forEach(text => {
            if (text) text.textContent = 'Offline';
        });
        
        playerCountElements.forEach(element => {
            if (element) element.textContent = 'Server offline';
        });
        
        // Update player count visualization bar
        updatePlayerCountBar(0, 100);
    }
    
    // Update server time regardless of online status
    updateServerTime();
}

/**
 * Initialize subtle hover sound effects for Minecraft-like experience
 */
function initHoverSounds() {
    // Create subtle click audio element
    const clickSound = new Audio();
    clickSound.volume = 0.2; // Quiet sound
    
    // In a real implementation, you would add actual sounds
    // clickSound.src = '/assets/sounds/click.mp3';
    
    // Add sound to buttons
    document.querySelectorAll('.minecraft-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            // clickSound.currentTime = 0;
            // clickSound.play();
        });
        
        button.addEventListener('click', () => {
            // Create click effect
            createClickEffect(button);
        });
    });
}

/**
 * Creates a visual ripple effect when clicking buttons
 */
function createClickEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('click-ripple');
    
    // Position the ripple
    const rect = element.getBoundingClientRect();
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    
    // Add to element and remove after animation
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Creates Minecraft-style cursor effects
 */
function initCursorEffects() {
    document.querySelectorAll('a, button, .minecraft-btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('glow-on-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('glow-on-hover');
        });
    });
}

/**
 * Generate floating particles throughout the site
 */
function generateParticles() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;
    
    // Generate additional random particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particleContainer.appendChild(particle);
    }
}

/**
 * Updates the player count visualization bar
 * @param {number} online - Number of online players
 * @param {number} max - Maximum player capacity
 */
function updatePlayerCountBar(online, max) {
    const playerCountBar = document.getElementById('player-count-bar');
    
    if (playerCountBar) {
        // Calculate percentage (capped at 100%)
        const percentage = Math.min((online / max) * 100, 100);
        
        // Animate the bar width
        setTimeout(() => {
            playerCountBar.style.width = `${percentage}%`;
        }, 500);
    }
}

/**
 * Updates the server time display
 */
function updateServerTime() {
    const serverTimeElement = document.getElementById('server-time');
    const dayNightIcon = document.getElementById('day-night-icon');
    const dayNightText = document.getElementById('day-night-text');
    
    if (serverTimeElement && dayNightIcon && dayNightText) {
        // Get current time
        const now = new Date();
        
        // Format time in 24-hour format
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        // Update time display
        serverTimeElement.textContent = `${hours}:${minutes}`;
        
        // Determine if it's day or night (6:00 - 18:00 is day)
        const hour = now.getHours();
        const isDay = hour >= 6 && hour < 18;
        
        // Update icon and text
        if (isDay) {
            dayNightIcon.innerHTML = '<i class="fas fa-sun"></i>';
            dayNightText.textContent = 'Day';
        } else {
            dayNightIcon.innerHTML = '<i class="fas fa-moon"></i>';
            dayNightText.textContent = 'Night';
        }
    }
}