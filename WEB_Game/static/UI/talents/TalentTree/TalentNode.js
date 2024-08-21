class TalentNode {
    constructor(talent, left=null, central=null, right=null, down=null) {
        this.talent = talent;
        this.left = left;
        this.up = central;
        this.right = right;
        this.down = down;
    }
}