class Talents {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.talant_backgound_image = new Image();
        this.talant_backgound_image.src = "../static/imgs/UI/talents/scroll_background.png";
    
        let talent = new TestTalent(100, 100);
        this.talents_list = [talent];
    }   


    draw(screen){

        screen.drawImage(this.talant_backgound_image, this.x, this.y)
        this.talents_list.forEach(element => {
            element.draw(screen, this.x, this.y);
        });
    }
    
    move_surface = (x, y) =>{
        this.x += x;
        this.y += y;
    }
}