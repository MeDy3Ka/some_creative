
class Node {
    constructor(x, y, w){
        this.x = x;
        this.y = y;
        this.w = w;
        this.x_center = x + w / 2
        this.y_center = y + w / 2
        this.childs = [null, null, null, null]
    }

}