
class TerminalNode extends Node {

    insert_tile(x, y, tile){
        //console.log(`x=${x} y=${y}`, tile)
        var index = (x - this.x) + (y - this.y) * 2
        this.childs[index] = tile
        return true
    }
    get_tile(x, y){
        var index = (x - this.x) + (y - this.y) * 2
        var tile = this.childs[index]
        //console.log(`x=${x} y=${y} this.x=${this.x} this.y=${this.y}`, index, tile, this)
        return tile
    }

}