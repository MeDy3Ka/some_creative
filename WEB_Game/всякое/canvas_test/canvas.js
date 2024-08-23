window.addEventListener('load', function () {

    let lastTime = 0; // stores a value of timestamp from the previous animation loop
    const canvas = document.getElementById('canvas');
    const screen = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 600;  

    const game = new Game(canvas.width, canvas.height);

    // animation loop
    function animate(currentTime) {   // В currentTime будет записан момент времени следующего вызова функции animate()
        const deltaTime = currentTime - lastTime; // Разница, в миллисекундах, между итерациями анимационного цикла
        screen.clearRect(0, 0, canvas.width, canvas.height); // Очищаем игровое поле перед следующей анимацией
        game.draw(screen);
        //game.update(deltaTime); // Теперь обновление игры будет зависеть от частоты смены кадров
        lastTime = currentTime; // Переприсваивание временных позиций
        requestAnimationFrame(animate);
    }

    animate(0);  // Передаем 0 в качестве параметра (время первого вызова)
})

class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('mousedown', this.game.check_mouse_collision)
        window.addEventListener('mouseup', this.game.place_tile)
        window.addEventListener("mousemove", this.game.update);

    }
}

class Game {
    constructor(width, height) {
        this.control = new InputHandler(this);
        this.quad_tree = new QuadTree(32);
        this.width = width;
        this.height = height;
        this.talent_bar = new TalentBar();
        this.generate_some_rects();
        this.holded_tile = null;
        this.tile_start_x = null;
        this.tile_start_y = null;
        this.tile_x = null;
        this.tile_y = null;
    }
    update = (e) => {
        
        if (this.holded_tile != null){
            
            let pos = getMousePos(canvas, e);
            this.tile_x = Math.floor(pos.x/100);
            this.tile_y = Math.floor(pos.y/100);
            
        }
    }

    draw = (screen) => {
        screen.fillStyle = `rgba(230,230,220)`;
        screen.fillRect(0, 0, this.width, this.height);
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                let tile = this.quad_tree.get_tile(i, j);
                if (tile) {
                    tile.draw(screen, i*100, j*100);
                }
            }
        }
        if (this.holded_tile != null) {
            if (this.tile_x < 0) { this.tile_x = 0 }
            else if (this.tile_x > 5) { this.tile_x = 4 }
            if (this.tile_y < 0) { this.tile_y = 0}
            else if (this.tile_y > 5) { this.tile_y = 4 }
            this.holded_tile.draw(screen, this.tile_x*100, this.tile_y*100)
        }
        this.talent_bar.draw(screen)
    }
    check_mouse_collision = (e) => {
        let pos = getMousePos(canvas, e);
        let x = Math.floor(pos.x/100);
        let y = Math.floor(pos.y/100);
        let tile = this.talent_bar.collide_check(pos.x, pos.y)
        if (tile == null){
            if (this.holded_tile == null) {
                this.holded_tile = this.quad_tree.pop_tile(x, y);
                this.tile_start_x = x;
                this.tile_start_y = y;
                this.tile_x = x;
                this.tile_y = y;
            } 
        } else {
            this.holded_tile = tile.copy();
            this.tile_start_x = null;
            this.tile_start_y = null;
            this.tile_x = x;
            this.tile_y = y;
        }

    }
    place_tile = (e) => {
        let pos = getMousePos(canvas, e);
        let x = Math.floor(pos.x/100);
        let y = Math.floor(pos.y/100);
        if (pos.x > 400 && pos.x < 500 && pos.y > 500 && pos.y < 600){
            this.holded_tile = null;
            this.tile_x = null;
            this.tile_y = null;
            this.tile_start_x = null;
            this.tile_start_y = null;
        }

        if (this.holded_tile) {

            if (x < 0) { x = 0 }
            else if (x > 5) { x = 4 }
            if (y < 0) { y = 0}
            else if (y > 5) { y = 4 }
            if (this.tile_start_x == x && this.tile_start_y == y){

                this.holded_tile.self_rotate();
                this.quad_tree.insert_tile(x, y, this.holded_tile)
                this.holded_tile = null;
                this.tile_x = null;
                this.tile_y = null;
                this.tile_start_x = null;
                this.tile_start_y = null;
            } else if (this.quad_tree.get_tile(x, y) == null){
                this.quad_tree.insert_tile(x, y, this.holded_tile.copy());
                this.holded_tile = null;
                this.tile_x = null;
                this.tile_y = null;
                this.tile_start_x = null;
                this.tile_start_y = null;

            } else if (this.tile_start_x === null || this.tile_start_y === null){
                this.holded_tile = null;
                this.tile_x = null;
                this.tile_y = null;
                this.tile_start_x = null;
                this.tile_start_y = null;

            } else {
                this.quad_tree.insert_tile(this.tile_start_x, this.tile_start_y, this.holded_tile);
                this.holded_tile = null;
                this.tile_x = null;
                this.tile_y = null;
                this.tile_start_x = null;
                this.tile_start_y = null;
            }

        } 
    }

    generate_some_rects = () => {
        for (let i = 0; i < 5; i++) {
            let reqt = new Cluster();
            let x = getRandomInt(0, 5);
            let y = getRandomInt(0, 5);
            this.quad_tree.insert_tile(x, y, reqt);

        }
    }
}


class TalentBar{

    constructor(){
        this.x = 0;
        this.y = 500;
        this.w = 500;
        this.h = 100;
        
        this.bg_color = 'rgba(200,200,0)';
        this.borders_color = 'rgba(150,75,0)';
        this.rects = [];
        this.generate_some_rects();
    }
    generate_some_rects = () => {
        for (let i = 0; i < 4; i++) {
            let reqt = new Cluster();
            this.rects.push(reqt);

        }
    }

    draw = (screen) => {
        screen.fillStyle = this.bg_color;
        screen.fillRect(this.x, this.y, this.w, this.h);
        
        let w = this.w/5;
        for (let i = 0; i < 4; i++){
            this.rects[i].draw(screen, 100*i, 500);
            screen.fillStyle = this.borders_color;
            screen.fillRect(w*i, this.y, 10, 100);
           
        }
        screen.fillStyle = 'red';
        screen.fillRect(400, 500, 100, 100)

    }
    
    collide_check(x, y){
        let tile = null;
        if(y > 500 && y < 600){
            let box = Math.floor(x/100);
            if (box >= 0 && box < this.rects.length){
                tile = this.rects[box];
            } 
        }
        return tile;
    }

}


class Cluster {
    constructor(talents = null) {
        if (talents == null){
            this.talents = [null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,
                ];
            this.fill_talents();
        } else {
            this.talents = talents;
        }
        
        this.width = 100;
        this.height = 100;
        
    }
    fill_talents = () => {

        for (let i = 0; i < 25; i++){
            let talent = new Talent(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
            
            this.talents[i] = talent;
        }
    }
  
    draw = (screen, x, y) => {
        for (let i = 0; i < 5; i++){
            for (let j = 0; j < 5; j ++){
                this.talents[i+j*5].draw(screen, x+i*20, y+j*20)
            }
        }
    }
    rotate = () => {
        let temp = [null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,
                null, null, null, null, null,
                ];
        let len = this.talents.length;
        let sqrt_len = Math.floor(Math.sqrt(len));
        for (let x = 0; x < sqrt_len; x++){
            let i = sqrt_len - 1 - x;
            for (let y = 0; y < sqrt_len; y++){
                let j = y;
                let val = this.talents[x*sqrt_len + y]
                temp[i + j*sqrt_len] = val
            }
        }
        this.talents = temp;
    }

    self_rotate = () => {
        
        let len = Math.floor(Math.sqrt(this.talents.length));

        if (Math.sqrt(this.talents.length) != len) {
            throw `Size of array must be square, current size: ${this.talents.length}`
        }
        let ul, ur, dl, dr;
        for (let j = 0; j < Math.floor(len/2); j++){
            for (let i = j; i < len - 1 - j; i++){
                ul = this.talents[i + j * len];
                ur = this.talents[(i + 1) * len - 1 - j];
                dr = this.talents[len * len - 1 - i - j * len];
                dl = this.talents[len * len - len *(1 + i) + j];

                this.talents[i + j * len] = dl;
                this.talents[(i + 1) * len - 1 - j] = ul;
                this.talents[len * len - 1 - i - j * len] = ur;
                this.talents[len * len - len *(1 + i) + j] = dr;
            }
        }
    }

    copy = () => {
        let copy_talents = [];
        this.talents.forEach(element => {
            copy_talents.push(element.copy())
        });
        return new Cluster(copy_talents);
    }

}


class Talent {

    constructor(r, g, b){
        this.r = r;
        this.g = g;
        this.b = b;
        this.width = 20;
        this.height = 20;
    }
    draw = (screen, x, y) => {
        screen.fillStyle = `rgba(${this.r},${this.g},${this.b})`;
        screen.fillRect(x, y, this.width, this.height);
    }

    copy(){
        let obj = new Talent(this.r, this.g, this.b);
        return obj
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
