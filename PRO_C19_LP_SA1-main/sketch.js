var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  doorsGroup = createGroup();
  climbersGroup = createGroup( );
  invisibleBlockGroup = createGroup();
 
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
ghost = createSprite(300,-100,50,50)
ghost.scale = 0.3;
ghost.addImage("ghost",ghostImg)
}

function draw() {
  background(200);
  //infinite tower
  if(tower.y > 400){
    tower.y = 300
  }

  if(gameState == "play"){
    if(keyDown("left_arrow")){
      ghost.x -= 3
    }
  }

  if(keyDown("right_arrow")){
    ghost.x += 3
  }
 
  if(keyDown("up_arrow")){
     ghost.velocityY = -10
  }

  ghost.velocityY += 0.6
  
  //climbersGroup.collider(ghost)
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }

  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy()
    gameState = "end"
  }

  if(gameState === "end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over",230,250)
  }
    //calling spawndoors function 
    Spawndoors();
  
  drawSprites();
}

function Spawndoors(){
  if(frameCount% 100 == 0){
    var door = createSprite(200,325);
    door.velocityY = 1 
    door.addImage(doorImg)
    door.x = Math.round(random(120,440));
    doorsGroup.add(door)
    door.lifetime=640

    //creating climber just below to doors
    var climber = createSprite(200,400);
    climber.addImage(climberImg);
    climber.velocityY = 1
    climber.x = door.x;
    climber.lifetime = 640
    climbersGroup.add(climber)

    invisibleBlock = createSprite(200,405);
    invisibleBlock.velocityY = 1
    invisibleBlock.x = door.x;
    invisibleBlock.lifetime = 640;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2

    invisibleBlock.shapeColor = "red"
  }
}
ghost.depth = door.depth
ghost.depth = ghost.depth + 1

 doorsGroup.add(door)
 invisibleBlock.debug = true
 climbersGroup.add(climber)
 invisibleBlockGroup.add(invisibleBlock)