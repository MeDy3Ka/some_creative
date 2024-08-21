window.addEventListener('load', function () {

    let lastTime = 0; // stores a value of timestamp from the previous animation loop
    const canvas = document.getElementById('canvas');
    const screen = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;  

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
        window.addEventListener('click', this.game.check_mouse_collision)

    }
}

class Game {
    constructor(width, height) {
        this.control = new InputHandler(this);
        this.width = width;
        this.height = height;
        this.objects = [];
        this.generate_some_rects()
        console.log(this.objects)
    }

    draw(screen) {
        screen.fillStyle = `rgba(150,150,150)`;
        screen.fillRect(0, 0, this.width, this.height);
        if (this.objects){
            this.objects.forEach(element => {
                element.draw(screen);
            });
        }

    }
    check_mouse_collision(e) {
        console.log(getMousePos(canvas, e))
    }

    generate_some_rects = () => {
        for (let i = 0; i < 5; i++) {
            this.objects.push(new Rectangle(getRandomInt(10, 480), getRandomInt(10, 480)))
        }
    }
}

class Rectangle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.color = 'yellow'
    }
  
    move = (x, y) => {
        this.x += x;
        this.y += y;
    }
  
    draw = (screen) => {
        screen.fillStyle = this.color;
        screen.fillRect(this.x, this.y, this.width, this.height);
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