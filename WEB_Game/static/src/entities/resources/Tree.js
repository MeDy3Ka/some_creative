class Tree extends Resource{
    constructor(obj_param) {
        let imgs = ["../static/imgs/trees/tree_poly_v1.png", 
                    "../static/imgs/trees/tree_poly_v2.png", 
                    "../static/imgs/trees/tree_poly_v3.png", 
                    "../static/imgs/trees/tree_poly_v4.png"];
        let tags = ["tree"];
        let img = imgs[getRandomInt(0, imgs.length)];
        let gatherable_exp = 1;
        super(img, tags, obj_param, Resource_type.TREE, gatherable_exp, );
    
    }
}