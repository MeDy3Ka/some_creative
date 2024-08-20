class AbstractTalent {
    constructor(img_path){
        this.img = new Image();
        this.img.src = img_path;
    }

    draw(screen, x, y) {
        //screen.arc(100, 75, 50, 0, 2 * Math.PI)
        screen.drawImage(this.img, x, y)
    }
}