class InputHandler {
    constructor(canvas) {
        this.canvas = canvas;
        window.addEventListener('mousedown', (e) => {
            this.get_mouse_position(e);
  
    })
    }

    get_mouse_position(e){

    }

    // function getMousePosition(canvas, event) {
    //     let rect = canvas.getBoundingClientRect();
    //     let x = event.clientX - rect.left;
    //     let y = event.clientY - rect.top;
    //     console.log("Coordinate x: " + x,
    //         "Coordinate y: " + y);
    // }
}