class Border extends Entity{
    constructor(obj_param) {
        let img = "../static/imgs/border.png";
        let tags = ["border", "undestroyable"];

        super(img, tags, obj_param);
        this.is_blocking = true;
    
    }
}