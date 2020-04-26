var Game = function(){
    var units = [];

    function Update(){
        MoveUnits();
        DrawAll();
        
        requestAnimationFrame(Update);
    }

    function DrawAll(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        units.forEach(i => {
            ctx.fillRect(i.x,i.y,20,20);
        });
    }

    function MoveUnits(){
        units.forEach((unit, index) => {
            if (unit.do == 'GOING'){
                let rad = Math.atan2(unit.y-unit.to.y,unit.to.x-unit.x);
                let xDeg = Math.cos(rad);
                let yDeg = Math.sin(rad);
                let speed = unit.speed;
                let stop = [false,false];

                if (unit.to.x-speed/2 <= unit.x && unit.to.x+speed/2 >= unit.x){
                    unit.x = unit.to.x;
                    stop[0] = true;
                }else{
                    console.log(collision(unit, xDeg*speed, 0));
                    units[index].x += xDeg*speed;
                }
                if (unit.to.y-speed/2 <= unit.y && unit.to.y+speed/2 >= unit.y){
                    stop[1] = true;
                    unit.y = unit.to.y;
                }else{
                    //console.log(collision(unit, 0, yDeg*speed));
                    units[index].y -= yDeg*speed;
                }

                if (stop[0] && stop[1]){
                    unit.do = 'STOP';
                }
            }
        });
    }

    function collision(col_unit, xDeg, yDeg){
        result = false;
        col_unit.x += xDeg;
        col_unit.y += yDeg;

        units.forEach(unit => {
            if (col_unit.id != unit.id){
                if (unit.x < col_unit.x && unit.x + 20 > col_unit.x){
                    if (unit.y+20 > col_unit.y && unit.y < col_unit.y){
                        result = true;
                    }
                }
            }
        });

        return result;
    }

    class CreateUser{
        constructor (x,y,speed=2,to){
            let _do;
            if (!to){
                _do = 'STOP'
                to={x:x,y:y}
            }else{
                _do = 'GOING'
            }
                
            var object = {
                x:x,
                y:y,
                to:to,
                speed:speed,
                do:_do,
                id:getRandomInt(1000,9999)
            }

            return object;
        }
    }

    canvas.onclick = function(e){
        var xClick = e.clientX;
        var yClick = e.clientY;

        units.forEach((unit,index) => {
            units[index].to.x = xClick;
            units[index].to.y = yClick;
            units[index].do = 'GOING';
        });
    }

    canvas.oncontextmenu = function(e){
        var xClick = e.clientX;
        var yClick = e.clientY;

        units.push(new CreateUser(xClick,yClick,8))

        return false;
    }

    Update();
}

Game()


