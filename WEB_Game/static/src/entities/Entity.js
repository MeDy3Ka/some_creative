class Entity {
    constructor(img_path, tags, stats, imgs=null){
        this.stats = stats;
        this.tags = tags;
        this.img = new Image();
        this.img.src = img_path;
        this.is_dying = false;
        this.imgs = imgs;
        this.direction = Direction.RIGHT;
    }

    draw(screen, x, y) {
        screen.drawImage(this.img, x, y);
    }

    attacked(dmg){
        if (this.stats?.HP > 0){
            this.get_damage(dmg);
        }
    }
    get_damage(dmg){
        this.stats.HP -= dmg;
        if (this.stats.HP <= 0){
            this.is_dying = true;
        }
    } 
    change_direction(direction){
        this.direction = direction;
        if (this.imgs) {
            this.img.src = this.imgs[direction];
        }
    }
}