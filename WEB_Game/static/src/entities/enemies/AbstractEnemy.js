class AbstractEnemy extends Entity {
    constructor(img, tags, stats, imgs=null) {
        tags.push("enemy");
        super(img, tags, stats, imgs);
        this.is_blocking = true;
    }
    deal_phys_dmg(){
        return this.stats.phys_dmg_formula();
    }
}