var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class CreateShot{
    object = {};

    constructor (x, y, x2, y2, speed = 2){
        let rad = Math.atan2(y-y2,x2-x);
        let xDeg = Math.cos(rad);
        let yDeg = Math.sin(rad);

        this.object = {
            x: x,
            y: y,
            width:20,
            height:20,
            xDeg: xDeg,
            yDeg: yDeg,
            speed: speed,
            id:Math.floor(Math.random()*10000),
        }

        return this.object;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}