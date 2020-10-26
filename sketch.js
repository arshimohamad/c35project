//Create variables here
var dog;
var dogImg
var happyDog;
var happyDogImg;
var database;
var foodS;
var foodStock;
var fedTime, lastFed;
var feedPet, addFood;


function preload()
{
  //load images here
  dogImg=loadImage("images/Dog.png");
  happyDogImg=loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(1200, 500);
  database = firebase.database();

  dog=createSprite(800,250);
  dog.addImage(dogImg);
  dog.scale= 0.2;

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  drawSprites();
  fill("black");
  text("Note:Press UP_ARROW Key To Feed Dog Milk!",20,20);
  text("remaining food:"+foodS,20,40);
  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30)
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+ lastFed + "AM", 350,30);
  }
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  console.log(foodS);
}
function writeStock(x){
  if(x<= 0){
    x=x
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


