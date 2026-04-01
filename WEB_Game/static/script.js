window.addEventListener('load', function () {
    // canvas setup
    let lastTime = 0; // stores a value of timestamp from the previous animation loop
    const canvas = this.document.getElementById('canvas1');
    
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    const game = new Game(canvas);
    const menu = new Menu(game);

    console.log(game)



    // // animation loop
    // function animate(currentTime) {   // В currentTime будет записан момент времени следующего вызова функции animate()
    //     if (game_cycle) {
    //         const deltaTime = currentTime - lastTime; // Разница, в миллисекундах, между итерациями анимационного цикла
    //         // Очищаем игровое поле перед следующей анимацией
    //         game.run(deltaTime) // Теперь обновление игры будет зависеть от частоты смены кадров
    //         lastTime = currentTime; // Переприсваивание временных позиций
    //         window.requestAnimationFrame(animate);
    //     }

    // }
    
})

