var PLAY = 1;
var END = 0;
var gameState = PLAY;
var tower, climber, door, ghost, invisibleBlock;
var towerImg, climberImg, doorImg, ghostImg;
var doorGroup, climberGroup, iBGroup;

function preload(){
  towerImg = loadImage('tower.png');
  climberImg = loadImage('climber.png');
  doorImg = loadImage('door.png');
  ghostImg = loadImage('ghost-standing.png');
}

function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
    
  doorGroup = createGroup();
  climberGroup = createGroup();
  iBGroup = createGroup();
}

function draw(){
  if(gameState === PLAY){
    if(tower.y > 400){
       tower.y = 300;
    }
  
    if(keyDown('left_arrow')){
      ghost.x = ghost.x - 3;
    }

    if(keyDown('right_arrow')){
      ghost.x = ghost.x + 3;
    }

    if(keyDown('space')){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.1;

    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(iBGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = END;
    }
    spawn();
  }  
  drawSprites();
  
  if(gameState === END){
    background('black');
    fill('red');
    textSize(70);
    text('Game Over', 130, 300);
  }
}

function spawn(){
  if(frameCount % 250 === 0){
    door = createSprite(200, 50);
    climber = createSprite(200, 110);
    invisibleBlock = createSprite(200, 115);
    
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    door.x = Math.round(random(150, 400));
    climber.x = door.x;
    invisibleBlock.x = climber.x; 
    
    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    iBGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost. depth = ghost.depth + 1;
  }
}