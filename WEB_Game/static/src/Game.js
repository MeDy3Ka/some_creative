class Game {

    static get TILE_SIZE(){
        return 64;
    }
    

    constructor(canvas) {
    

        this.canvas = canvas;
        this.lastTime = 0;
        this.is_running = false;

        let player = new Player(1, 1, new Stats(), new Professions(), new Inventory(), new Talents())

        this.logic = new GameLogic(player);
        this.controller = new InputHandler(this.logic)
        this.view = new GameView(this.logic, this.canvas);
        //this.player = new Player(this);
        //this.input = new InputHandler(this);

    }

    show_talents = () => {
        this.view.isTalents = true;
        this.logic.isPause = true;
    }

    
    pause_game = () => {
        this.view.isPause = true;
        this.logic.isPause = true;
    }

    continue = () => {
        this.view.isTalents = false;
        this.view.isPause = false;
        this.logic.isPause = false;
    }

    start_new_game = ()  => {
        if (this.logic.isPause) {
            let player = new Player(1, 1, new Stats(), new Professions(), new Inventory());
            this.logic = new GameLogic(player);
            this.controller = new InputHandler(this.logic)
            this.view = new GameView(this.logic, this.canvas);
        }
    }

    run_game = () => {
        if (this.is_running == false) {
            this.start_new_game();
            this.game_cycle(0);
        }
    }

    update = (deltaTime) => {
            this.logic.update();
            this.view.update();

    }


    game_cycle = (currentTime) => {   // В currentTime будет записан момент времени следующего вызова функции animate()
   
        let deltaTime = currentTime - this.lastTime; // Разница, в миллисекундах, между итерациями анимационного цикла
        // Очищаем игровое поле перед следующей анимацией
        this.update(deltaTime) // Теперь обновление игры будет зависеть от частоты смены кадров
        this.lastTime = currentTime; // Переприсваивание временных позиций
        window.requestAnimationFrame(this.game_cycle);

    }
}