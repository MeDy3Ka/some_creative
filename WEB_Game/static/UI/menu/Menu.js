class Menu {
    constructor(game) {
        this.game = game;
        this.start_game_btn = document.getElementById("start_game_div");
        this.start_game_btn.addEventListener("click", this.game.run_game);

        this.pause_game_btn = document.getElementById("pause_game_div");
        this.pause_game_btn.addEventListener("click", this.game.pause_game);

        this.continue_game_btn = document.getElementById("continue_game_div");
        this.continue_game_btn.addEventListener("click", this.game.continue);

        this.talents_btn = document.getElementById("talents_div");
        this.talents_btn.addEventListener("click", this.game.show_talents);   


        this.side_menu_div = document.getElementById("side_menu_div");
        this.side_menu_div.addEventListener("click", this.openNav);
    }

            /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
    openNav() {
        document.getElementById("left_side_bar").style.width = "200px";
        document.getElementById("main").style.marginLeft = "150px";
        }
}