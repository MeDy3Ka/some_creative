class MapGenerator {



    init_quad_tree(quad_tree_width){
        let quad_tree = new QuadTree(quad_tree_width);

        for (let x = 0; x < quad_tree_width; x++){
            for (let y = 0; y < quad_tree_width; y++){

                let tile = new Tile(getRandomInt(180, 200), getRandomInt(150, 180), getRandomInt(0, 50));
                tile.content = this.object_generator.generate_object(x, y)

                quad_tree.insert_tile(x, y, tile);
            }
        }
        return quad_tree
    }
}