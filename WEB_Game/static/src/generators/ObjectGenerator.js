class ObjectGenerator{
    constructor(map_width){
        this.map_width = map_width;
    }

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    generate_object(x, y){
        let obj;
        let generated_val;

        if (x == 0 || y == 0 || x == (this.map_width - 2) || y == (this.map_width - 2)) {
            let border = new Border(new ObjectParams(-1));
            obj = [border];
        } else {
            
            generated_val = this.getRandomInt(0, 100);
            
            if (generated_val < 40) {
                obj = [];
            } else if (generated_val < 50) {
                let donut = new TestEnemy(new Stats());
                obj = [donut];
            } else if (generated_val < 55) {
                let donut = new Donut(new ObjectParams());
                obj = [donut];
            } else if (generated_val < 80) {
                let tree = new Tree(new ObjectParams(50));
                obj = [tree];
            } else if (generated_val < 100) {
                let stone = new Stone(new ObjectParams(70));
                obj = [stone];
            }
        }
 
        return obj;
    }
}