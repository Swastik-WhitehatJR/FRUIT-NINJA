//Game States
var PLAY = 1;
var ENDL = 0;
var ENDW = 2;
var gameState = PLAY;

var gameStateS = "sound";

var knife, apple, banana, carrot, watermelon, monster, kasakSound, oopsSound, bg, bottomEdge, ghost, blueLine, restarting;
var knifeImage, appleImg, bananaImg, carrotImg, watermelonImg, monsterImg, bgImg, ghostImg, blueLineImg, restartingImg;
var appleGroup, bananaGroup, carrotGroup, watermelonGroup, monsterGroup, ghostGroup;
var score = 0;
var lives = 5;


function preload() {
  
  knifeImage = loadImage("knife2.png");
  appleImage = loadImage("apple.png");
  bananaImg = loadImage("banana.png");
  carrotImg = loadImage("carrot.png");
  watermelonImg = loadImage("watermelon.png");
  monsterImg = loadImage("monster.png");
  kasakSound = loadSound("sliceEffect.wav");
  oopsSound = loadSound("oops.wav");
  bgSound = loadSound("bgSound.wav");
  bgImg = loadImage("bg.png");
  ghostImg = loadImage("ghost.png");
  blueLineImg = loadImage("line.png");
  restartingImg = loadImage("restart.png");
  
}

function setup() {
  
  createCanvas(600, 600);
  
  bottomEdge = createSprite(310, 600, 800, 3);
    
  //creating fruit ninja background
  bg = createSprite(325, 220);
  bg.addImage(bgImg);
  bg.scale = 2;

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.2;
  knife.setCollider("rectangle", 0, 0, 100, 40);
  
  blueLine = createSprite(0, 0, 20, 20);
  blueLine.addImage(blueLineImg);
  blueLine.visible = false;
  blueLine.scale = 0.3
  
  restarting = createSprite(300, 375);
  restarting.addImage(restartingImg);
  restarting.visible = false;
  restarting.scale = 0.2;

  //create fruit and monster Group variable here
  appleGroup = new Group();
  bananaGroup = new Group();
  carrotGroup = new Group();
  watermelonGroup = new Group();
  monsterGroup = new Group();
}

function draw() {
  background("lightblue");
  // knife.debug=true;

  if (gameState === PLAY) {

    //calling fruit and monster function

    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    
    randomFruitOrMonster();

    // Increase score if knife touching fruit
    if(knife.isTouching(watermelonGroup)) {
      score+=2;
      lives+=1;
      watermelonGroup.destroyEach();
      kasakSound.play();
      blueLine.visible = true;
      blueLine.x = knife.x;
      blueLine.y = knife.y;
      blueLine.lifetime = 30;
    } else if(knife.isTouching(appleGroup)) {
        score+=1;
        appleGroup.destroyEach();
        kasakSound.play();
        blueLine.visible = true;
        blueLine.x = knife.x;
        blueLine.y = knife.y;
        blueLine.lifetime = 30;
    } else if(knife.isTouching(bananaGroup)) {
        score+=1;
        bananaGroup.destroyEach();
        kasakSound.play();
        blueLine.visible = true;
        blueLine.x = knife.x;
        blueLine.y = knife.y;
        blueLine.lifetime = 30;
    } else if(knife.isTouching(carrotGroup)) {
        score+=1;
        carrotGroup.destroyEach();
        kasakSound.play();
        blueLine.visible = true;
        blueLine.x = knife.x;
        blueLine.y = knife.y;
        blueLine.lifetime = 30;
    }
    
    
    
    // Go to end state if knife touching enemy
    if(knife.isTouching(monsterGroup)) {
      lives-=2;
      monsterGroup.destroyEach();
      // ghostGroup.destroyEach();
      oopsSound.play();
    } else if(watermelonGroup.isTouching(bottomEdge) || appleGroup.isTouching(bottomEdge) || bananaGroup.isTouching(bottomEdge) || carrotGroup.isTouching(bottomEdge)) {
      lives-=1;
      appleGroup.destroyEach();
      watermelonGroup.destroyEach();
      bananaGroup.destroyEach();
      carrotGroup.destroyEach();
      oopsSound.play();
    }
    
    if(gameStateS == "sound") {
      bgSound.loop();
      gameStateS = "mute";
    }
    
    if(lives <= 0) {
      gameState = ENDL;
    }
    
    if(score >= 25) {
      gameState = ENDW;
    }
  }

  drawSprites();

  //Display score
  fill("white");
  textSize(25);
  text("Score: " + score, 250, 50);
  text("Lives: " + lives, 253, 78);
  
  if(gameState == ENDL) {
    restarting.visible = true;
    watermelonGroup.destroyEach();
    appleGroup.destroyEach();
    bananaGroup.destroyEach();
    carrotGroup.destroyEach();
    monsterGroup.destroyEach();
    fill("white");
    textSize(20);
    text("GAME OVER! Press the button to restart.", 150, 250);
    bgSound.stop();
    if (mousePressedOver(restarting)) {
      restart();
    }
  }
  
  if(gameState == ENDW) {
    restarting.visible = true;
    bgSound.stop();
    watermelonGroup.destroyEach();
    appleGroup.destroyEach();
    bananaGroup.destroyEach();
    carrotGroup.destroyEach();
    monsterGroup.destroyEach();
    fill("white");
    textSize(20);
    text("YOU WIN! Press the button to restart.", 150, 250);
    if (mousePressedOver(restarting)) {
      restart();
    }
  }
}

function apples() {
  apple = createSprite(random(30, 570), 0, 20, 20);
  apple.addImage(appleImage);
  apple.scale = 0.01;
  apple.velocityY = 7;
  apple.velocityY = 10+40*score/100;
  apple.lifetime = 100;
  appleGroup.add(apple);
}

function bananas() {
  banana = createSprite(random(30, 570), 0, 20, 20);
  banana.addImage(bananaImg);
  banana.scale = 0.06;
  banana.velocityY = 7;
  banana.velocityY = 10+40*score/100;
  banana.lifetime = 100;
  bananaGroup.add(banana);
}

function carrots() {
  carrot = createSprite(random(30, 570), 0, 20, 20);
  carrot.addImage(carrotImg);
  carrot.scale = 0.06;
  carrot.velocityY = 7;
  carrot.velocityY = 10+40*score/100;
  carrot.lifetime = 100;
  console.log(carrot.velocityY);
  carrotGroup.add(carrot);
}

function watermelons() {
  watermelon = createSprite(random(30, 570), 0, 20, 20);
  watermelon.addImage(watermelonImg);
  watermelon.scale = 0.06;
  watermelon.velocityY = 7;
  watermelon.velocityY = 10+40*score/100;
  watermelon.lifetime = 100;
  watermelonGroup.add(watermelon);
}

function monsters() {
  monster = createSprite(random(30, 570), 0, 20, 20);
  monster.addImage(monsterImg);
  monster.scale = 0.2;
  monster.velocityY = 5;
  monster.velocityY = 10+60*score/100;
  monsterGroup.add(monster);
}

function ghosts() {
  // ghost = createSprite(random(30, 570), 0, 20, 20);
  // ghost.addImage(ghostImg);
  // ghost.scale = 0.2;
  // ghost.velocityY = 5;
  // ghost.velocityY = 10+60*score/100;
  // ghostGroup.add(ghost);
}

function randomFruitOrMonster() {
  var rand = Math.round(random(1, 6));
  if(frameCount%50==0) {
    if(rand == 1) {
      apples();
    } else if(rand == 2) {
        bananas();
    } else if(rand == 3) {
        carrots();
    } else if(rand == 4) {
        monsters();
    } else if(rand == 5) {
        watermelons();
    } 
    // else if(rand == 6) {
    //     ghosts();
    // }
  }
}

function restart() {
  watermelonGroup.destroyEach();
  appleGroup.destroyEach();
  bananaGroup.destroyEach();
  carrotGroup.destroyEach();
  monsterGroup.destroyEach();
  restarting.visible = false;
  knife.x = 300;
  knife.y = 300;
  score = 0;
  lives = 5
  gameState = PLAY;
  bgSound.play();
}