/**
 * Main game initialization and animation loop
 */
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    const game = new Game(canvas);
    const menu = new Menu(game);

    let animationFrameId = null;
    let lastTime = 0;

    /**
     * Main animation loop
     * @param {number} currentTime - Current timestamp in milliseconds
     */
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        
        game.update(deltaTime);
        
        lastTime = currentTime;
        animationFrameId = window.requestAnimationFrame(animate);
    }

    // Start the game loop after a short delay to ensure everything is initialized
    setTimeout(() => {
        lastTime = performance.now();
        animate(lastTime);
    }, 100);

    // Cleanup on page unload
    window.addEventListener('beforeunload', function () {
        if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId);
        }
    });
});

