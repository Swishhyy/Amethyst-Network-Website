// Server Map JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    console.log('Map page loaded');
    redirectToBlueMap();
});

/**
 * Redirect to the BlueMap URL
 */
function redirectToBlueMap() {
    // Get the BlueMap URL from the meta tag
    const bluemapUrlMeta = document.querySelector('meta[name="bluemap-url"]');
    let bluemapUrl = 'https://map.amethystnetwork.com'; // Default URL
    
    if (bluemapUrlMeta) {
        bluemapUrl = bluemapUrlMeta.getAttribute('content');
    }
    
    // Redirect to the BlueMap URL
    window.location.href = bluemapUrl;
    
    // Add event listeners
    if (centerMapButton) {
        centerMapButton.addEventListener('click', () => {
            console.log('Centering map on spawn');
            // In a real implementation, this would center the map
            alert('Map centered on spawn point!');
        });
    }
    
    if (mapLayerSelect) {
        mapLayerSelect.addEventListener('change', (e) => {
            const layer = e.target.value;
            console.log(`Changing map layer to: ${layer}`);
            // In a real implementation, this would change the map layer
            alert(`Map layer changed to: ${layer}`);
        });
    }
}

/**
 * When connected to a real Dynmap API, this function would
 * fetch and display player locations on the map
 */
function fetchPlayerLocations() {
    // In a real implementation, this would fetch from your server API
    // Example: fetch('https://api.amethystnetwork.com/map/players')
    
    // Simulated player data
    const playerData = [
        { name: 'Player1', x: 100, y: 64, z: -150 },
        { name: 'Player2', x: -250, y: 70, z: 320 },
        // More players would be here
    ];
    
    // In a real implementation, we would update player markers
    console.log('Player locations fetched:', playerData);
}

/**
 * Simulates fetching notable locations from server
 */
function fetchNotableLocations() {
    // In a real implementation, this would fetch from your server or database
    // Example: fetch('https://api.amethystnetwork.com/map/locations')
    
    const locations = [
        {
            name: 'Spawn City',
            x: 0, y: 64, z: 0,
            type: 'spawn',
            description: 'Server spawn point'
        },
        {
            name: 'Crystal Caverns',
            x: -250, y: 35, z: 420,
            type: 'poi',
            description: 'Massive amethyst cave system'
        },
        {
            name: 'Market District',
            x: 120, y: 70, z: -180,
            type: 'poi',
            description: 'Player shops and trading'
        },
        {
            name: 'Crystal Arena',
            x: 500, y: 75, z: 200,
            type: 'poi',
            description: 'PvP and events arena'
        }
    ];
    
    // In a real implementation, we would add these to the map
    console.log('Notable locations fetched:', locations);
}
