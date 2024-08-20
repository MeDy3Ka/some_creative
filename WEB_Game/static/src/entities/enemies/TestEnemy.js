class TestEnemy extends AbstractEnemy{
    constructor(stats){
        let tags = ["attackable"];
        let img = "../static/imgs/enemies/enemy_v1.png";
        super(img, tags, stats);

    }
}