/**
 * Основной класс игры, управляющий циклом, логикой и отображением.
 */
class Game {

    static get TILE_SIZE() {
        return 64;
    }

    /**
     * @param {HTMLCanvasElement} canvas - Элемент canvas для рендеринга.
     */
    constructor(canvas) {
        if (!canvas) {
            console.error("Game: Canvas element not found.");
        }

        this.canvas = canvas;
        this.lastTime = 0;
        this.isRunning = false;
        this.animationFrameId = null;

        // Инициализация начального состояния будет выполнена в startNewGame
        this.logic = null;
        this.controller = null;
        this.view = null;
    }

    /**
     * Отображает экран талантов.
     */
    showTalents = () => {
        if (this.view) this.view.isTalents = true;
        if (this.logic) this.logic.isTalents = true;
    }

    /**
     * Ставит игру на паузу.
     */
    pauseGame = () => {
        if (this.view) this.view.isPause = true;
        if (this.logic) this.logic.isPause = true;
    }

    /**
     * Снимает игру с паузы.
     */
    continueGame = () => {
        if (this.view) {
            this.view.isTalents = false;
            this.view.isPause = false;
        }
        if (this.logic) {
            this.logic.isTalents = false;
            this.logic.isPause = false;
        }
    }

    /**
     * Запускает новую игру, создавая новые объекты логики, игрока и представления.
     */
    startNewGame = () => {
        try {
            const player = new Player(1, 1, new Stats(), new Professions(), new Inventory(), new Talents());
            this.logic = new GameLogic(player);
            this.controller = new InputHandler(this.logic);
            this.view = new GameView(this.logic, this.canvas);
            
            // Сброс таймера при новой игре, чтобы избежать скачка deltaTime
            this.lastTime = 0; 
        } catch (error) {
            console.error("Game: Error starting new game:", error);
        }
    }

    /**
     * Запускает игровой цикл, если он еще не запущен.
     */
    runGame = () => {
        if (!this.isRunning) {
            this.startNewGame();
            this.isRunning = true;
            this.lastTime = performance.now(); // Инициализируем время старта
            this.animationFrameId = window.requestAnimationFrame(this.gameCycle);
        }
    }

    /**
     * Обновляет логику и представление.
     * @param {number} deltaTime - Время в миллисекундах, прошедшее с последнего кадра.
     */
    update = (deltaTime) => {
        if (this.logic) this.logic.update(deltaTime);
        if (this.view) this.view.update(deltaTime);
    }

    /**
     * Основной игровой цикл.
     * @param {number} currentTime - Время текущего кадра (от requestAnimationFrame).
     */
    gameCycle = (currentTime) => {
        if (!this.isRunning) return;

        // Расчет разницы во времени
        let deltaTime = currentTime - this.lastTime;
        
        // Защита от слишком большого deltaTime (например, при переключении вкладок)
        // Ограничиваем максимальный шаг обновления, чтобы физика не сломалась
        if (deltaTime > 100) {
            deltaTime = 100;
        }

        this.lastTime = currentTime;

        // Обновление состояния игры
        this.update(deltaTime);

        // Запрос следующего кадра
        this.animationFrameId = window.requestAnimationFrame(this.gameCycle);
    }

    /**
     * Останавливает игровой цикл.
     */
    stopGame = () => {
        this.isRunning = false;
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}