
class InterimNode extends Node{
    
    insert_tile(x, y, tile){
        var child_node;
        var index = (x >= this.x_center ? 1 : 0) + (y >= this.y_center ? 2 : 0);
        //console.log(`x=${x} y=${y} this.x=${this.x} this.y=${this.y} center_x=${this.x_center} center_y=${this.y_center}`, index, this)
        var node = this.childs[index];
        if (node === null) {
            var w = this.w/2;
            var node_x = this.x + w * (index & 1);
            var node_y = this.y + w * (index >> 1 & 1);
            if (w > 2){
                child_node = new InterimNode(node_x, node_y, w);
                this.childs[index] = child_node;
            }
            else {
                child_node = new TerminalNode(node_x, node_y, w);
                this.childs[index] = child_node;
            }
        }
        else {
            child_node = this.childs[index]
        }
        child_node.insert_tile(x, y, tile)
    }

    get_tile(x, y) {
        var index = (x >= this.x_center ? 1 : 0) + (y >= this.y_center ? 2 : 0);
        var child_node = this.childs[index];
        if (child_node == null){
            return null;
        }
        else {
            return child_node.get_tile(x, y);
        }
    }
}

