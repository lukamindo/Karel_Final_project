var gun_Width = 100; 
var gun_Height = 125; 
var aim_length = 30;
var duck_length = 40;
var grassY = getWidth()/2 + 120;
var dx = 2; 
var dy = -2; 
var duck_dire_DELAY = 500; 
var duckmoveInt = 0;
var killedDuckX = 0;
var killedDuckY = 0;
var killedDuck;
var killed_duck_DELAY = 1;
var pointCounter = 0;
var score;
var ammo;
var ducknumber;


var duck_DELAY = 20;
var ammoCount = readInt("How much ammos u want?") ;
var duckNumber = readInt("How many ducks u want to be in game? in order to win you have to kill half of them") ;
var pointstowin = 100 * (duckNumber/2);

var gun;
var aim;
var duck;
var dogW;
var dogL;

function start(){
    backGround();
    gun();
    aim();
    duck();
    mouseEvents();
    timers();
    killedDuck();
    display();
    setTimer(finish,1);
    dog();

    
}

function backGround(){
    var background = new WebImage("https://raw.githubusercontent.com/vaielab/DuckHuntCss/master/stage.png");
    background.setSize(getWidth(), getHeight());
    add(background);  
}

function gun(){
    gun = new WebImage("https://codehs.com/uploads/56d94a92b70e91b81738715f556f9e63");
    gun.setSize(gun_Width, gun_Height);
    gun.setPosition(getWidth()/2 - gun_Width/2, getHeight() - gun_Height);
    add(gun); 
}

function aim(){
    aim = new WebImage("https://codehs.com/uploads/1171fee643353cf72e4185a1037e40e0");
    aim.setSize(aim_length, aim_length);
    aim.setPosition(getWidth()/2 - aim_length/2, getHeight()/2 - aim_length/2);
    add(aim); 
}

function duck(){
    duck = new WebImage("https://codehs.com/uploads/a4e1862e5ae235b214f4d9872e293a59");
    duck.setSize(duck_length, duck_length);
    duck.setPosition(Randomizer.nextInt(50,250), grassY);
    add(duck);
}

function timers(){
    setTimer(moveDuck, duck_DELAY);
    setTimer(directionDuck, duck_dire_DELAY);
    setTimer(dropping, killed_duck_DELAY);
    setTimer(updateDisplay, 1);
}

function directionDuck(){
    duckmoveInt = Randomizer.nextInt(1,2);
    
}

function moveDuck(){
    duck.move(dx, dy);
    if(duckmoveInt == 1){
        dx = -dx;
    }
}

function mouseEvents(){
    mouseMoveMethod(moveAim);
    mouseClickMethod(kill);
    
}

function moveAim(e){
    aim.setPosition(e.getX() - aim_length/2, e.getY() - aim_length/2 );
    
    if(e.getX() < gun_Width/2 ){
        gun.setPosition(0, getHeight() - gun_Height);
    }else if(e.getX() > getWidth() - gun_Width/2){
        gun.setPosition(getWidth() - gun_Width, getHeight() - gun_Height);
    }else {
        gun.setPosition(e.getX() - gun_Width/2 + 40, getHeight() - gun_Height);
    }
    
}

function kill(e){
    ammoCount--;
    var findDuck = getElementAt(e.getX(), e.getY());
    if(findDuck == duck){
        duckNumber--;
        var killedDuckX = duck.getX();
        var killedDuckY = duck.getY();
        remove(duck);
        pointCounter += 100;
        duck.setPosition(Randomizer.nextInt(50,250), grassY);
        
        
        killedDuck.setPosition(killedDuckX, killedDuckY);
        add(killedDuck);
    }
    
    add(duck);
}

function killedDuck(){
    killedDuck = new WebImage("https://codehs.com/uploads/aa2615665665a0fdb263a7452b732241");
    killedDuck.setSize(duck_length +8, duck_length+8);
    
}

function dropping(){
    killedDuck.move(0, 3);
    var killedDucky = killedDuck.getY();
    if(killedDucky >= grassY){
        remove(killedDuck);
    }
}

function display(){
    score = new Text("Score: " + pointCounter , "20pt Arial");
    score.setPosition(0, score.getHeight());
    score.setColor(Color.black);
    add(score);
    
    ammo = new Text("Ammos: " + ammoCount , "13pt Arial");
    ammo.setPosition(0, score.getHeight() + ammo.getHeight() + 3);
    ammo.setColor(Color.black);
    add(ammo);
    
    ducknumber = new Text("Remainig Ducks: " + duckNumber , "8pt Arial");
    ducknumber.setPosition(0, score.getHeight() + ammo.getHeight() + ducknumber.getHeight() + 5);
    ducknumber.setColor(Color.black);
    add(ducknumber);
    
    
}

function updateDisplay(){
    score.setText("Score: " + pointCounter); 
    ammo.setText("Ammos: " + ammoCount);
    ducknumber.setText("Ducks: " + duckNumber);
    
    if(duck.getX() + duck_length +20 < 0){
        duckNumber--;
        duck.setPosition(Randomizer.nextInt(50,250), grassY);
    }else if (duck.getX() - 20  > getWidth()){
        duckNumber--;
        duck.setPosition(Randomizer.nextInt(50,250), grassY);
    }else if (duck.getY() + duck_length + 20  < 0){
        duckNumber--;
        duck.setPosition(Randomizer.nextInt(50,250), grassY);
    }
}

function dog(){
    dogW = new WebImage("https://codehs.com/uploads/0fccbc4f718ce2d814c0c263399659aa");
    dogW.setSize(110,75);
    dogW.setPosition(getWidth()/2 - dogW.getWidth()/2, grassY - dogW.getHeight()/2 - 8);
    
    
    dogL = new WebImage("https://codehs.com/uploads/a7b15c426ca40470d9817c693816450d");
    dogL.setSize(90,60);
    dogL.setPosition(getWidth()/2 - dogL.getWidth()/2, grassY - dogL.getHeight()/2 - 4);
       
    
}

function finish(){
    if(duckNumber <= 0 && pointCounter < pointstowin){
        remove(duck);
        stopTimer(moveDuck);
        remove(gun);
        remove(aim);
        var txt1 = new Text("Game Over, " +"No more Ducks", "15pt Arial");
        txt1.setPosition(getWidth()/2 - txt1.getWidth()/2, getHeight()/2);
        txt1.setColor(Color.red);
        add(txt1);
        add(dogL); 
    }else if(ammoCount <= 0 && pointCounter < pointstowin){
        remove(duck);
        stopTimer(moveDuck);
        remove(gun);
        remove(aim);
        var txt = new Text("Game Over, " +"Out of Ammo", "15pt Arial");
        txt.setPosition(getWidth()/2 - txt.getWidth()/2, getHeight()/2);
        txt.setColor(Color.red);
        add(txt);
        add(dogL); 
    }else if(ammoCount <= 0 && pointCounter >= pointstowin){
        remove(duck);
        stopTimer(moveDuck);
        remove(gun);
        remove(aim);
        var txt3 = new Text("You Win!", "15pt Arial");
        txt3.setPosition(getWidth()/2 - txt3.getWidth()/2, getHeight()/2 - 200);
        txt3.setColor(Color.green);
        add(txt3);
        add(dogW);
    }else if(duckNumber <= 0 && pointCounter >= pointstowin){
        remove(duck);
        stopTimer(moveDuck);
        remove(gun);
        remove(aim);
        var txt4 = new Text("You Win!", "15pt Arial");
        txt4.setPosition(getWidth()/2 - txt4.getWidth()/2, getHeight()/2 - 150);
        txt4.setColor(Color.green);
        add(txt4);
        add(dogW);
    }
}