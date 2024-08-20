class ItemGenerator{

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    generate_drop(obj){
        if (obj.resource_type == Resource_type.STONE) {
            return this.generate_resource_item(Boulder);
        } else if (obj.resource_type == Resource_type.TREE){
            return this.generate_resource_item(Log);
        } 
        // else if (obj.resource_type == Resource_type.GOLD){
        //     return this.generate_gold;
        // }
        
    }
    generate_resource_item(obj){
        let generated_val = this.getRandomInt(0, 100);
        if (generated_val < 30) {
            return [];
        } else if (generated_val < 80) {
            return [new obj()];
        } else if (generated_val < 100) {
            return [new obj(), new obj()]
        }
    }
}