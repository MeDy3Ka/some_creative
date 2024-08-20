class Stone extends Resource{
    constructor(obj_param) {
        let imgs = ["../static/imgs/stones/stone_v1.png", 
                    "../static/imgs/stones/stone_v2.png", 
                    "../static/imgs/stones/stone_v3.png", 
                    "../static/imgs/stones/stone_v4.png"];
        let img = imgs[getRandomInt(0, imgs.length)];
        let tags = ["stone"];
        let gatherable_exp = 1;

        super(img, tags, obj_param, Resource_type.STONE, gatherable_exp);
        this.is_blocking = true;
    
    }
}