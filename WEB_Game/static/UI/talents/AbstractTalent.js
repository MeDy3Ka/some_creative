class AbstractTalent {
    constructor(img_path, x, y){
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = img_path;
    }

    draw(screen, x, y) {
        //screen.arc(100, 75, 50, 0, 2 * Math.PI)
        screen.drawImage(this.img, this.x + x, this.y + y);
    }
}