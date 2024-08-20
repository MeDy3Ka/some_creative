
class GameLogic{
    constructor(player){
        let quad_tree_width = 64;
        
        this.object_generator = new ObjectGenerator(quad_tree_width);
        this.player = player;
        this.quad_tree = this.init_quad_tree(quad_tree_width);
        this.camera = new Camera(0, 0, 8, 6, 0, 0, quad_tree_width, quad_tree_width);
        this.game_score = 0;
        this.isPause = false;

    }


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

    check_move_is_blocked(x, y){
        let check_x = this.camera.x + this.player.x + x;
        let check_y = this.camera.y + this.player.y + y;
        let tile = this.quad_tree.get_tile(check_x, check_y);
        let blocked;
        let obj = tile.content;
        if (obj) {
            obj.forEach(element => {
                if (element.is_blocking){ blocked = true }
            });
        }
        return blocked;
    }   

    move_player(x, y) {

        if (Direction[this.player.direction].toString() != [x, y].toString()) {
            if (x == -1) { this.player.change_direction(Direction.LEFT); }
            else if (x == 1) { this.player.change_direction(Direction.RIGHT); }
            else if (y == -1) { this.player.change_direction(Direction.UP); }
            else if (y == 1) { this.player.change_direction(Direction.DOWN); }
        } else {
            if (this.check_move_is_blocked(x, y)){
                return
            }
    
            if (x == -1 && this.player.x > 2 ||
                x == 1 && this.player.x < this.camera.w - 3 ||
                y == -1 && this.player.y > 2 ||
                y == 1 && this.player.y < this.camera.h - 3
            ) {
              this.player.move(x, y)
            } else {
                this.move_camera(x, y);
            }
        }
    }

    force_move_player(x, y){
        if (x == -1 && this.player.x > 0) {
            this.player.x--;
        } else if (x == 1 && this.player.x < this.camera.w - 1) {
            this.player.x++;
        } else if (y == -1 && this.player.y > 0) {
            this.player.y--;
        } else if (y == 1 && this.player.y < this.camera.h - 1) {
            this.player.y++;
        }
    }

    move_camera(x, y) {
        if ((x == -1 && this.camera.x > 0) || 
            (x == 1 && (this.camera.x + this.camera.w) < this.quad_tree.w - 1) || 
            (y == -1 && this.camera.y > 0) || 
            (y == 1 && (this.camera.y + this.camera.h) < this.quad_tree.w - 1) ){
            this.camera.move(x, y);
        } else { this.force_move_player(x, y)}
    }

    gather_action(){
        let player_dir = Direction[this.player.direction];
        let tile = this.quad_tree.get_tile(this.camera.x + this.player.x + player_dir[0], this.camera.y + this.player.y + player_dir[1]);
        let obj = this.find_gatherable_entry(tile);
        let dmg = this.player.deal_phys_dmg();
        obj.attacked(dmg);
        console.log(obj);
        if (obj) {
            if (obj.resource_type == Resource_type.TREE){
                this.player.professions.calculate_cutting(obj.gatherable_exp);
            } else if (obj.resource_type == Resource_type.STONE){
                this.player.professions.calculate_mining(obj.gatherable_exp);
            } else if (obj.resource_type == Resource_type.GOLD){
    
                this.game_score++;
                document.getElementById("score").textContent = `Score: ${this.game_score}`;
    
            
            }
    
            if (obj.is_dying){
                //TODO Drop and get some loot; exp ...
    
    
            
                tile.content.splice(obj);
            }
        }
    }
    
    attack_action() {
        let player_dir = Direction[this.player.direction];
        let tile = this.quad_tree.get_tile(this.camera.x + this.player.x + player_dir[0], this.camera.y + this.player.y + player_dir[1]);
        let obj = this.find_attackable_entry(tile);
        let dmg = this.player.deal_phys_dmg();
        if (obj) {
            obj.attacked(dmg);
            if (obj.is_dying){
    
                //TODO Drop and get some loot; exp ...
    
                tile.content.splice(obj);
            }
        }
    }
    find_attackable_entry(tile){
        let tile_objects = tile.content;
        let obj;
        tile_objects.forEach(element => {
            if (element.tags.includes('attackable')) {
                obj = element;
                return;
            }
        })
        return obj;
    }

    find_gatherable_entry(tile){
        let tile_objects = tile.content;
        let obj;
        tile_objects.forEach(element => {
            if (element.tags.includes('gatherable')) {
                obj = element;
                return;
            }
        })
        return obj;
    }
    
    show_stats(){
       console.log("STATS: ", this.player.stats);
       console.log("PROFESSIONS: ", this.player.professions) 
    }


    update() {

    }
}