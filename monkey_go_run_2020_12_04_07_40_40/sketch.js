var gameState = 1
var PLAY = 1
var END = 0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  
 bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png")
  
 survivalTime = 0;
}
   

function setup() {
  createCanvas(700,500);
 monkey=createSprite(80,402,20,20);
 monkey.addAnimation("moving",monkey_running);
  
  monkey.scale=0.2;

  ground=createSprite(350,480,700,40);
  ground.shapeColor="black";
  ground.velocityX=-4;
 

  foodGroup = new Group();
  obstacleGroup = new Group();
}




function draw() {
background("lightblue");
  ground.x = ground.width /2;
  console.log(ground.x)
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+survivalTime,100,50);
  
  

 
  
  if(gameState===PLAY){
survivalTime=Math.ceil(frameCount/frameRate())
  
    monkey.collide(ground)
   //monkey.debug=true;
    monkey.setCollider("rectangle",-30,20,600,580);
  
    if(keyDown("space")&& monkey.y>=290){
monkey.velocityY=-13;
  }
  monkey.velocityY=monkey.velocityY+0.8
  
    spawnfood();
  spawnobstacle();
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
  gameState=END;
    
}
   }
  else if(gameState===END){
    monkey.visible=false;
    ground.velocityX=0;
    monkey.velocityY=0;
    foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
   foodGroup.destroyEach();
  obstacleGroup.destroyEach();
    text("click R  to restart the game",220,350);
}
  
    if (keyDown("R")){
      reset()
    }
    
  
 
  
  
  
  
  
  drawSprites();
  
}

function spawnfood(){

  if(frameCount % 80===0){
     banana = createSprite(600,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.2;
    banana.y = Math.round(random(120,200));
    foodGroup.add(banana);
    foodGroup.setVelocityXEach(-8);
    foodGroup.setLifetimeEach(70);
    //banana.debug=true;
  }
}

function spawnobstacle(){
  
  if(frameCount % 300===0){
    
    obstacle2 = createSprite(600,424,20,20);
   obstacle2.addImage("obstacle",obstacleImage);
    obstacle2.velocityX=-9;
    obstacle2.scale=0.2;
    obstacleGroup.add(obstacle2);
     //obstacle2.debug=true;
    obstacle2.setCollider("circle",0,0,250)
  }
}

function reset(){
gameState=PLAY;
  monkey.visible=true;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime=0;
  score=0;
}


