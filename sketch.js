//Create variables here
var dog, happyDog;
var database;
var foods, foodsStock;
var dogImg, happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  console.log(database);

  dog = createSprite(250,250,10,10);
  
  dog.addImage(dogImg);
  //dog.addImage(happyDogImg);


  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  console.log(happyDog)
  dog.addImage(happyDogImg);
}

  drawSprites();
  //add styles here
fill("white");
textSize(30);
text("Press up arrow to feed the dog",60,100);

}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

