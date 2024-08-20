class GameView{
    constructor(logic, canvas){
        this.canvas = canvas
        this.logic = logic;
        this.screen = this.canvas.getContext('2d');
        this.canvas.width = Game.TILE_SIZE * this.logic.camera.w;
        this.canvas.height = Game.TILE_SIZE * this.logic.camera.h;  
        this.isPause = false;
        this.isTalents = false;
    }


    draw_map() {

      let x = this.logic.camera.x;
      let y = this.logic.camera.y;
      let w = this.logic.camera.w;
      let h = this.logic.camera.h;
      
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          {
            let tile = this.logic.quad_tree.get_tile(i + x, j + y);
            this.screen.fillStyle = `rgba(${tile.red},${tile.green},${tile.blue})`;
            this.screen.fillRect(i*Game.TILE_SIZE, j*Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
            let objects = tile.content;
            if (objects){ objects.forEach(element => { if (element) {element.draw(this.screen, i*Game.TILE_SIZE, j*Game.TILE_SIZE)} });}
            
          }
        }
      }
    } 

    update = (isPause=false) =>{
 
        this.screen.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isPause){
          this.draw_pause();
        } else if (this.isTalents) {
          this.draw_talents();
        } else {
          this.draw_map(this.logic.camera);
          this.logic.player.draw(this.screen);
        }
        
    }

    draw_pause() {

      let x = this.logic.camera.x;
      let y = this.logic.camera.y;
      let w = this.logic.camera.w;
      let h = this.logic.camera.h;
      
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          {
            let tile = this.logic.quad_tree.get_tile(i + x, j + y);
            this.screen.fillStyle = `rgba(${tile.red-40},${tile.green-40},${0})`;
            this.screen.fillRect(i*Game.TILE_SIZE, j*Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
            let objects = tile.content;
            if (objects){ objects.forEach(element => { if (element) {element.draw(this.screen, i*Game.TILE_SIZE, j*Game.TILE_SIZE)} });}
            
          }
        }
      }
    }
    
    draw_talents = () => {
      this.screen.fillStyle = "rgba(255,255,255)"
      this.screen.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.logic.player.talents.talent.draw(this.screen, 100, 100)
    }

    test_menu() {

    }
}