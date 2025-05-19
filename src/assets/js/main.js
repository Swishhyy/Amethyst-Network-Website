// Main JavaScript file for Amethyst Network Minecraft server website

document.addEventListener('DOMContentLoaded', () => {
    console.log('Amethyst Network website loaded');

    // Minecraft server status simulation
    simulateServerStatus();

    // Setup auto-refresh for server status
    setupAutoRefresh();

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
    const playerCountElements = document.querySelectorAll('.player-count'); const statusIndicators = document.querySelectorAll('.status-indicator');
    const statusTextElements = document.querySelectorAll('.status-text');    // Use the Minecraft Server Status API (mcapi.us)
    // Using your domain now that it's set up
    const serverIP = 'play.amethystnetwork.org'; // Your Amethyst Network server domain
    const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;
    console.log('Fetching server status from:', apiUrl);
    fetch(apiUrl)
        .then(response => {
            console.log('API Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Server status data:', data);// Update last checked timestamp
            updateLastCheckedTime();

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
                    if (element) element.textContent = playersOnline;
                });

                // Update max player count
                const playerMaxElements = document.querySelectorAll('.player-max');
                playerMaxElements.forEach(element => {
                    if (element) element.textContent = playersMax;
                });

                // Update player count visualization bar
                updatePlayerCountBar(playersOnline, playersMax);

                // Update server version
                const serverVersion = document.getElementById('server-version');
                if (serverVersion) {
                    serverVersion.textContent = data.version || 'Unknown';
                }

                // Update server software
                const serverSoftware = document.getElementById('server-software');
                if (serverSoftware) {
                    // The API sometimes provides this in different locations
                    const software = data.software ||
                        (data.info && data.info.software) ||
                        'Vanilla';
                    serverSoftware.textContent = software;
                }                // Update server IP - only show domain without port
                const serverIP = document.getElementById('server-ip');
                if (serverIP) {
                    // Always use your domain instead of what the API returns
                    serverIP.textContent = 'play.amethystnetwork.org';
                }

                // Update MOTD (Message of the Day)
                const serverMOTD = document.getElementById('server-motd');
                if (serverMOTD && data.motd) {
                    // MOTD can be in different formats depending on the server
                    let motdText = '';
                    if (data.motd.clean && Array.isArray(data.motd.clean)) {
                        motdText = data.motd.clean.join(' ');
                    } else if (data.motd.raw && Array.isArray(data.motd.raw)) {
                        motdText = data.motd.raw.join(' ').replace(/§[0-9a-fklmnor]/g, '');
                    } else if (typeof data.motd === 'string') {
                        motdText = data.motd;
                    }
                    serverMOTD.textContent = motdText || 'Welcome to the server!';
                }

                // Update online players list
                const playersListContainer = document.getElementById('online-players-list');
                if (playersListContainer) {
                    // Clear existing content
                    playersListContainer.innerHTML = '';

                    // Check if we have player names
                    if (data.players && data.players.list && data.players.list.length > 0) {
                        data.players.list.forEach(playerName => {
                            const playerItem = document.createElement('div');
                            playerItem.className = 'player-item';
                            playerItem.textContent = playerName;
                            playersListContainer.appendChild(playerItem);
                        });
                    } else if (playersOnline > 0) {
                        // We know players are online but don't have their names
                        const noNames = document.createElement('span');
                        noNames.className = 'empty-list';
                        noNames.textContent = `${playersOnline} player(s) online. Names not available.`;
                        playersListContainer.appendChild(noNames);
                    } else {
                        // No players online
                        const emptyMessage = document.createElement('span');
                        emptyMessage.className = 'empty-list';
                        emptyMessage.textContent = 'No players online';
                        playersListContainer.appendChild(emptyMessage);
                    }
                }

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
                    if (element) element.textContent = '0';
                });

                playerMaxElements.forEach(element => {
                    if (element) element.textContent = '0';
                });

                // Update server details
                const serverElements = {
                    version: document.getElementById('server-version'),
                    software: document.getElementById('server-software'),
                    ip: document.getElementById('server-ip'),
                    motd: document.getElementById('server-motd')
                };

                // Set offline indicators for all server information
                Object.values(serverElements).forEach(element => {
                    if (element) element.textContent = 'Server offline';
                });

                // Show no players online
                const playersListContainer = document.getElementById('online-players-list');
                if (playersListContainer) {
                    playersListContainer.innerHTML = '';
                    const offlineMessage = document.createElement('span');
                    offlineMessage.className = 'empty-list';
                    offlineMessage.textContent = 'Server is offline';
                    playersListContainer.appendChild(offlineMessage);
                }

                // Update player count visualization bar to zero
                updatePlayerCountBar(0, 100);
            }
        }).catch(error => {
            console.error('Error fetching server status:', error);
            console.log('Error details:', {
                message: error.message,
                name: error.name,
                stack: error.stack
            });

            // Show user-friendly fallback while waiting to retry
            fallbackServerStatus(playerCountElements, statusIndicators, statusTextElements);
            // Try alternative API if available
            const alternativeApiUrl = `https://mcapi.us/server/status?ip=${serverIP}`;
            console.log('Trying alternative API:', alternativeApiUrl);

            // Actually try the alternative API
            fetch(alternativeApiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('Alternative API response:', data);
                    if (data.online === true) {
                        console.log('Alternative API successful, updating status');
                        handleAlternativeApiResponse(data, playerCountElements, statusIndicators, statusTextElements);
                    }
                })
                .catch(altError => {
                    console.error('Alternative API also failed:', altError);
                });

            // Try again after a short delay (5 seconds)
            setTimeout(() => {
                console.log('Retrying server status fetch...');
                fetch(apiUrl)
                    .then(response => {
                        console.log('Retry response status:', response.status);
                        return response.json();
                    })
                    .then(data => {
                        console.log('Retry successful:', data);
                        // Process the data as usual
                        simulateServerStatus();
                    })
                    .catch(retryError => {
                        console.error('Retry also failed:', retryError);
                        console.log('Retry error details:', {
                            message: retryError.message,
                            name: retryError.name,
                            stack: retryError.stack
                        });
                        // Keep the fallback state, will try again on next auto-refresh
                    });
            }, 5000);
        });

    // Set up interval to update the server time every minute
    setInterval(updateServerTime, 60000);
}

/**
 * Fallback function when the API fails
 */
function fallbackServerStatus(playerCountElements, statusIndicators, statusTextElements) {
    console.log('Server status API failed, using fallback mode');    // Display checking status instead of error
    statusIndicators.forEach(indicator => {
        if (indicator) {
            indicator.classList.remove('status-online');
            indicator.classList.remove('status-offline');
            indicator.classList.add('status-api-error');
        }
    });

    statusTextElements.forEach(text => {
        if (text) text.textContent = 'Checking...';
    });

    // Show dashes for player counts
    playerCountElements.forEach(element => {
        if (element) element.textContent = '-';
    });

    // Update max player count
    const playerMaxElements = document.querySelectorAll('.player-max');
    playerMaxElements.forEach(element => {
        if (element) element.textContent = '-';
    });

    // Update server details to show API error
    const serverElements = {
        version: document.getElementById('server-version'),
        software: document.getElementById('server-software'),
        ip: document.getElementById('server-ip'),
        motd: document.getElementById('server-motd')
    };    // Set user-friendly messages for server information    if (serverElements.version) serverElements.version.textContent = 'Checking...';
    if (serverElements.software) serverElements.software.textContent = 'Checking...';
    if (serverElements.ip) serverElements.ip.textContent = 'play.amethystnetwork.org';
    if (serverElements.motd) serverElements.motd.textContent = 'Server information is being refreshed...';// Show friendly message in players list
    const playersListContainer = document.getElementById('online-players-list');
    if (playersListContainer) {
        playersListContainer.innerHTML = '';
        const message = document.createElement('span');
        message.className = 'empty-list';
        message.textContent = 'Refreshing player data...';
        playersListContainer.appendChild(message);
    }

    // Set progress bar to 0
    updatePlayerCountBar(0, 100);

    // Update server time regardless of API status
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

/**
 * Handle response from the alternative API (mcapi.us)
 * @param {Object} data - API response data
 * @param {NodeList} playerCountElements - Elements showing player count
 * @param {NodeList} statusIndicators - Server status indicators
 * @param {NodeList} statusTextElements - Text elements showing status
 */
function handleAlternativeApiResponse(data, playerCountElements, statusIndicators, statusTextElements) {
    // Update status indicators
    statusIndicators.forEach(indicator => {
        if (indicator) {
            if (data.online) {
                indicator.classList.add('status-online');
                indicator.classList.remove('status-offline');
            } else {
                indicator.classList.add('status-offline');
                indicator.classList.remove('status-online');
            }
        }
    });

    // Update status text
    statusTextElements.forEach(text => {
        if (text) text.textContent = data.online ? 'Online' : 'Offline';
    });

    // Get player count info
    const playersOnline = data.players?.now || 0;
    const playersMax = data.players?.max || 100;

    // Update player count elements
    playerCountElements.forEach(element => {
        if (element) element.textContent = playersOnline;
    });

    // Update max player count
    const playerMaxElements = document.querySelectorAll('.player-max');
    playerMaxElements.forEach(element => {
        if (element) element.textContent = playersMax;
    });

    // Update player count visualization bar
    updatePlayerCountBar(playersOnline, playersMax);

    // Update server details
    const serverElements = {
        version: document.getElementById('server-version'),
        software: document.getElementById('server-software'),
        ip: document.getElementById('server-ip'),
        motd: document.getElementById('server-motd')
    }; if (serverElements.version) serverElements.version.textContent = data.server?.name || 'Minecraft';
    if (serverElements.ip) serverElements.ip.textContent = 'play.amethystnetwork.org';  // Always use fixed domain
    if (serverElements.motd) serverElements.motd.textContent = data.motd || 'A Minecraft Server';

    // Update online players list with generic message since this API doesn't provide player names
    const playersListContainer = document.getElementById('online-players-list');
    if (playersListContainer) {
        playersListContainer.innerHTML = '';
        if (data.online && playersOnline > 0) {
            const message = document.createElement('span');
            message.className = 'empty-list';
            message.textContent = `${playersOnline} player(s) online. Names not available.`;
            playersListContainer.appendChild(message);
        } else {
            const message = document.createElement('span');
            message.className = 'empty-list';
            message.textContent = 'No players online';
            playersListContainer.appendChild(message);
        }
    }

    // Update last checked timestamp
    updateLastCheckedTime();
}