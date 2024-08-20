
class Tile {
    constructor(r, g, b, content=[],) {
        this.content = content;
        this.red = r;
        this.green = g;
        this.blue = b;
    }
    get_data(){
        return this.content === null ? [this.red, this.green, this.blue] : this.content;
    }
}