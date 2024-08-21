class InputHandler {
    constructor(logic) {
        this.logic = logic;
        this.key_is_down = false;
        window.addEventListener('keydown', (e) => {
            if (this.logic.isTalents) {
                console.log("PRESSED IN TALENTS")
                if (e.key === 'w') {
                    
                    this.logic.player.talents.move_surface(0, -5);
                } else if (e.key === 's') {
                    this.logic.player.talents.move_surface(0, 5);
                } else if (e.key === 'a') {
                    this.logic.player.talents.move_surface(-5, 0);
                } else if (e.key === 'd') {
                    this.logic.player.talents.move_surface(5, 0);
                }
            } else if (this.logic.isPause) { 
                console.log("PRESSED IN PAUSE")
            } else if (this.key_is_down === false){
                if (e.key === 'w') {
                    this.logic.move_player(0, -1);
                } else if (e.key === 's') {
                    this.logic.move_player(0, 1);
                } else if (e.key === 'a') {
                    this.logic.move_player(-1, 0);
                } else if (e.key === 'd') {
                    this.logic.move_player(1, 0);
                } else if (e.key === 'g') {
                    this.logic.gather_action();
                } else if (e.key === 'c') {
                    this.logic.show_stats();
                } else if (e.key === ' ') {
                    this.logic.attack_action();
                }

            } 

            this.key_is_down = true;
            // else if (e.key === ' ') {
            //     this.game.player.shootTop();
            // }
        });
        window.addEventListener('keyup', () => this.key_is_down = false);
        // window.addEventListener('keyup', (e) => {
        //     if (this.game.keys.indexOf(e.key) > -1) {
        //         this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        //     }
        // });
    }
}