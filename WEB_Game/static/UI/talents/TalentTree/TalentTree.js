class TalentTree {
    constructor(node=null) {
        if (node) {
            this.root = node;
        } else {
            this.root = new Node();
        }
        
    }


    draw = (screen) => {
        if (this.root) {
            this.#draw(screen, this.root)
        }
    }

    #draw(screen, node) {
        if (node) {
            this.node.draw();
            this.draw(node.left);
            this.draw(node.center);
            this.draw(node.right);
        }
    }
}