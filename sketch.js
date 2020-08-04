var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacleImage;

var score;

var gameState="play";

var reset, resetImage, gameOver,gameOverImage;

function preload(){
 
  
  cloudImage = loadImage("cloud.png");
  
  obstacleImage= loadImage("obstacle.png");
  
  
  //resetImage=loadImage("restart.png");
  
  //gameOverImage=loadImage("gameOver.png");
  

  trexImage = loadImage("trex.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  //trex.addAnimation("running", trex_running);
  trex.addImage("trex",trexImage);
  trex.scale = 0.1;
  trex.velocityX=5;
  //trex.addAnimation("collided",trex_collided);
  
  ground = createSprite(200,180,2300,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,2000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  reset=createSprite(300,100);
  //reset.addImage("reset",resetImage);
  reset.visible=false;
  reset.scale=0.4;
  
  gameOver=createSprite(300,75);
  //gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible=false;
  
  score = 0;
}

function draw() {
  background(180);
  
  text("Score: "+ score, 500,50);
  
  if(gameState === "play"){
    //move the ground
    //ground.velocityX = -(6 + 3*score/100);
    //scoring
    score=score+1;
    
    if (score>0 && score%100 === 0){
      //playSound("checkPoint.mp3");
    }
    
    
    
     //jump when the space key is pressed
    if(keyDown("space")){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(trex.x>=1000){
      //playSound("jump.mp3");
      gameState = "end";
      //playSound("die.mp3");
    }

    camera.position.x = trex.x;
    camera.position.y = 100;
  } else if(gameState==="end"){
    gameOver.visible = true;
    reset.visible = true;
    



    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1); 
  }
  
//console.log(trex.velocityX)

  if(mousePressedOver(reset)) {
    restart();
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  for(var x1=0;x1<2300;x1=x1+1000){
    var cloud=createSprite(x1,random(50,200),5,2)
    cloud.lifetime=100;
    cloud.addImage(cloudImage);
    cloud.scale=0.1;
  }
  
}

function spawnObstacles() {
  /*if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    /*
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
      
    }
    
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
    //obstacle.lifetime = 300;
    //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
    */
    for(var x2=0;x2<2300;x2=x2+150){
      var obstacle=createSprite(x2,165,10,40)
      obstacle.lifetime=100;
      obstacle.addImage(obstacleImage)
      obstacle.scale=0.5
    }
  }

function restart(){
  gameState = "play";
  
  gameOver.visible = false;
  reset.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}