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
                speed=1;
                
                unit.to.forEach(i => {
                    while (true){
                        let rad = Math.atan2(unit.y-i.y,i.x-unit.x);
                        let xDeg = Math.cos(rad)*speed;
                        let yDeg = Math.sin(rad)*speed;
                        
                        unit.x += xDeg;
                        unit.y -= yDeg;
                        //console.log(xDeg)
                        if (i.x-speed/2 <= unit.x && i.x+speed/2 >= unit.x){
                            if (i.y-speed/2 <= unit.y && i.y+speed/2 >= unit.y){
                                //console.log(xDeg)
                                break;
                            }
                        }
                    }
                })
            }
        });
    }

    class CreateUser{
        constructor (x,y,speed=2,to){
            let _do;
            if (!to){
                _do = 'STOP'
                to=[{x:x,y:y}]
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
            units[index].to[0].x = xClick;
            units[index].to[0].y = yClick;
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


