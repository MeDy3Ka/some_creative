
class Camera{

    constructor(x, y, w, h, min_x, min_y, max_x, max_y){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.min_x = min_x;
        this.min_y = min_y;
        this.max_x = max_x;
        this.max_y = max_y;
    }
    update(){

    }

    move(x, y){
        this.x += x;
        this.y += y;

    }
}