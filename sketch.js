//Create variables here
var dog,dogImg,happyDogImg;
var database;
var foodS,foodStock;
var feedButton,addButton
var feedTime,lastFeed
var foodObj

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog=createSprite(200,250,20,20)
  dog.addImage(dogImg)
  dog.scale=0.2;
  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
  foodObj=new Food()
  feedButton=createButton("Feed the dog")
  feedButton.position(700,95)
  feedButton.mousePressed(feedDog)
  addButton=createButton("Add food")
  addButton.position(800,95)
  addButton.mousePressed(addFoods)

}


function draw() {  
  background(46,139,87)
  drawSprites();
  //add styles here
//  if(keyWentDown(UP_ARROW)){
//    writeStock(foodS);
//    dog.addImage(happyDogImg)
//  }
//  if(keyWentUp(UP_ARROW)){
  
//   dog.addImage(dogImg)
// }
feedTime=database.ref('feedTime')
feedTime.on("value",function(data){
  lastfeed=data.val();
})
 textSize(20)
 fill("red")
 text("food: "+foodStock,250,50)
 foodObj.display();
 fill(255,255,254)
 textSize(15)
 if(lastFeed>=12){
   text("Last feed: "+lastFeed%12+ "PM",350,30)
 } else if(lastFeed===0){
  text("Last feed: 12 AM",350,30)
 } else{
  text("Last feed: "+lastFeed+ "AM",350,30)
 }

}
function readStock(data){
  foodS=data.val();
 
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
database.ref('/').update({
  Food:x
  
})
}
function feedDog(){
  dog.addImage(happyDogImg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
   Food:getFoodStock(),
   feedTime:hour()
  })
}
function addFoods(){
  foods++
  database.ref('/').update({
  Food:foodS
  })
}



