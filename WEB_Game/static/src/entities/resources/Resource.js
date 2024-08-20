class Resource extends MapObject{
    constructor(img_path, tags, stats, resource_type, gatherable_exp=1){
        tags.push("resource");
        tags.push("gatherable");
        
        super(img_path, tags, stats);
        this.resource_type = resource_type;
        this.gatherable_exp = gatherable_exp;
    }
}