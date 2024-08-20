
class QuadTree{
    constructor(tree_width){
        if ((tree_width & tree_width - 1) != 0){
            throw new Error(`Tree width must not be less than ${Node.MINIMAL_NODE_WIDTH} and should be power of 2`);
        }
        this.w = tree_width;
        this.x = 0;
        this.y = 0;
        if (this.w > 2){
            this.root = new InterimNode(this.x, this.y, this.w);
        }
        else {
            this.root = new TerminalNode(this.x, this.y, this.w);
        }
    }
    clear(){
        if (this.tree_width > 2){
            this.root = new InterimNode(this.x, this.y, this.w);
        }
        else {
            this.root = new TerminalNode(this.x, this.y, this.w);
        }
    }
    insert_tile(x, y, tile) {
        this.root.insert_tile(x, y, tile)
    }
    get_tile(x, y) {
        return this.root.get_tile(x, y)
    }

}