class Player extends Entity{
    constructor(x, y, stats, professions, inventory, talents) {
        let img = "../static/imgs/player/player_right.png";
        let imgs = {"up": "../static/imgs/player/player_up.png",
                    "left": "../static/imgs/player/player_left.png",
                    "right": "../static/imgs/player/player_right.png",
                    "down": "../static/imgs/player/player_down.png"
        }
        let tag = ["player"];
        super(img, tag, stats, imgs);
        this.x = x;
        this.y = y;
        this.inventory = inventory;
        this.professions = professions;
        this.direction = Direction.RIGHT;
        this.talents = talents;

    }
    draw(screen) {
        screen.drawImage(this.img, this.x*Game.TILE_SIZE, this.y*Game.TILE_SIZE);
    }

    move(x, y){
        this.x += x;
        this.y += y;
    }

    deal_phys_dmg(){
        return this.stats.phys_dmg_formula();
    }

}